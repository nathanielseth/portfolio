import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdChatBubble, MdSend } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";
import ChatMessage from "./ChatMessage";

const ChatButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([
		{
			role: "assistant",
			content: "Hey there! Here to answer questions about Seth's work.",
		},
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [resumeText, setResumeText] = useState("");

	const endRef = useRef(null);
	const inputRef = useRef(null);
	const messagesRef = useRef(null);

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	useEffect(() => {
		if (isOpen && !isLoading) {
			inputRef.current?.focus();
		}
	}, [isOpen, isLoading]);

	useEffect(() => {
		if (!isOpen) return;
		const chatEl = document.querySelector("[data-chat-container]");
		if (!chatEl) return;

		const preventScroll = (e) => {
			const container = messagesRef.current;
			if (container) {
				const isScrollable = container.scrollHeight > container.clientHeight;
				if (isScrollable) {
					e.stopPropagation();
					const atTop = container.scrollTop === 0;
					const atBottom =
						container.scrollTop + container.clientHeight >=
						container.scrollHeight - 1;

					if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
						e.preventDefault();
					}
				}
			}
		};

		chatEl.addEventListener("wheel", preventScroll, { passive: false });
		return () => chatEl.removeEventListener("wheel", preventScroll);
	}, [isOpen]);

	useEffect(() => {
		const loadPDF = async () => {
			try {
				const res = await fetch(
					"/portfolio/assets/NathanielSeth_DeLeon_Resume.pdf"
				);
				const buf = await res.arrayBuffer();
				const pdf = await pdfjsLib.getDocument({ data: buf }).promise;

				let text = "";
				for (let i = 1; i <= pdf.numPages; i++) {
					const page = await pdf.getPage(i);
					const content = await page.getTextContent();
					text += content.items.map((item) => item.str).join(" ") + "\n";
				}
				setResumeText(text);
			} catch (err) {
				console.error("Resume Load Error:", err);
				setResumeText("RESUME_LOAD_FAILED");
			}
		};
		loadPDF();
	}, []);

	const sendMessage = useCallback(async () => {
		if (!input.trim() || isLoading) return;

		const userMsg = { role: "user", content: input };
		setMessages((prev) => [...prev, userMsg]);
		setInput("");
		setIsLoading(true);

		try {
			const res = await fetch(
				"https://lucky-night-09d6.nathanielseth-dev.workers.dev",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						messages: [...messages, userMsg],
						resumeText: resumeText || "RESUME_LOAD_FAILED",
					}),
				}
			);

			if (!res.ok) throw new Error("API Error");

			const data = await res.json();
			const aiMsg = {
				role: "assistant",
				content:
					data.choices?.[0]?.message?.content ||
					"Sorry, couldn't process that.",
			};
			setMessages((prev) => [...prev, aiMsg]);
		} catch (err) {
			console.error(err);
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: "Connection issue. Try again?" },
			]);
		} finally {
			setIsLoading(false);
		}
	}, [input, isLoading, messages, resumeText]);

	const handleKeyPress = useCallback(
		(e) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				sendMessage();
			}
		},
		[sendMessage]
	);

	return (
		<>
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className="fixed bottom-7 right-5 z-20 accent-bg rounded-full text-zinc-50 shadow-lg flex items-center justify-center cursor-pointer"
				style={{ width: "3rem", height: "3rem" }}
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: isOpen ? 1 : 1, opacity: 1 }}
				transition={{ type: "spring", stiffness: 400, damping: 17 }}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				aria-label="Toggle chat"
			>
				<motion.div
					animate={{ rotate: isOpen ? 90 : 0 }}
					transition={{ type: "spring", stiffness: 500, damping: 25 }}
				>
					{isOpen ? <IoClose size={36} /> : <MdChatBubble size={24} />}
				</motion.div>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						data-chat-container
						layout
						initial={{ opacity: 0, y: 30, scale: 0.9 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 30, scale: 0.9 }}
						transition={{ type: "spring", stiffness: 650, damping: 25 }}
						className="fixed bottom-24 right-5 z-20 w-[24rem] sm:w-96 bg-zinc-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-zinc-700/50"
						style={{ height: "32rem" }}
					>
						<div className="bg-zinc-800 px-5 py-2 border-b border-zinc-700/50 flex items-center gap-1">
							<HiSparkles className="text-zinc-300 text-lg" />
							<h3 className="font-semibold text-base text-zinc-50">deleb.ai</h3>
						</div>

						<div
							ref={messagesRef}
							className="flex-1 px-4 py-4 space-y-3 overflow-y-auto"
							style={{
								scrollbarColor: "rgb(63 63 70) transparent",
								scrollbarWidth: "thin",
								overscrollBehavior: "contain",
								WebkitOverflowScrolling: "touch",
							}}
						>
							{messages.map((msg, i) => (
								<ChatMessage key={i} message={msg} />
							))}

							{isLoading && (
								<div className="flex justify-start">
									<div className="bg-zinc-800 rounded-2xl px-4 py-3 flex space-x-1.5">
										{[0, 0.1, 0.2].map((delay) => (
											<motion.div
												key={delay}
												className="w-1.5 h-1.5 bg-zinc-500 rounded-full"
												animate={{ y: [0, -4, 0] }}
												transition={{ duration: 0.6, repeat: Infinity, delay }}
											/>
										))}
									</div>
								</div>
							)}
							<div ref={endRef} />
						</div>

						<div className="p-4 border-t border-zinc-700/50">
							<div className="relative">
								<input
									ref={inputRef}
									type="text"
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyPress={handleKeyPress}
									placeholder="Ask something..."
									className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-zinc-800 text-zinc-100 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
									disabled={isLoading}
								/>
								<button
									onClick={sendMessage}
									disabled={isLoading || !input.trim()}
									className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-100 disabled:opacity-30 transition-all hover:scale-110 active:scale-90 p-1"
									aria-label="Send message"
								>
									<MdSend size={20} />
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default ChatButton;
