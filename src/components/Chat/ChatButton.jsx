import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdChatBubble, MdSend } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";
import ChatMessage from "./ChatMessage";

const INITIAL_MESSAGE = {
	role: "assistant",
	content: "Hey there! Here to answer questions about Seth's work.",
};

const API_ENDPOINT = "https://lucky-night-09d6.nathanielseth-dev.workers.dev";
const RESUME_PATH = "/portfolio/assets/NathanielSeth_DeLeon_Resume.pdf";

const ChatButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([INITIAL_MESSAGE]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [resumeText, setResumeText] = useState("");

	const endRef = useRef(null);
	const messagesRef = useRef(null);
	const chatContainerRef = useRef(null);

	useEffect(() => {
		if (messages.length > 1) {
			endRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages.length]);

	useEffect(() => {
		const loadPDF = async () => {
			try {
				const response = await fetch(RESUME_PATH);
				const arrayBuffer = await response.arrayBuffer();
				const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

				let extractedText = "";
				for (let i = 1; i <= pdf.numPages; i++) {
					const page = await pdf.getPage(i);
					const content = await page.getTextContent();
					extractedText +=
						content.items.map((item) => item.str).join(" ") + "\n";
				}
				setResumeText(extractedText);
			} catch (error) {
				console.error("Resume load error:", error);
				setResumeText("RESUME_LOAD_FAILED");
			}
		};
		loadPDF();
	}, []);

	const sendMessage = useCallback(async () => {
		if (!input.trim() || isLoading) return;

		const userMessage = { role: "user", content: input };
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);

		try {
			const response = await fetch(API_ENDPOINT, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					messages: [...messages, userMessage],
					resumeText: resumeText || "RESUME_LOAD_FAILED",
				}),
			});

			if (!response.ok) throw new Error("API request failed");

			const data = await response.json();
			const assistantMessage = {
				role: "assistant",
				content:
					data.choices?.[0]?.message?.content ||
					"Sorry, couldn't process that.",
			};
			setMessages((prev) => [...prev, assistantMessage]);
		} catch (error) {
			console.error("Chat error:", error);
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

	const toggleChat = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	useEffect(() => {
		if (!isOpen || !chatContainerRef.current) return;

		const handleWheel = (e) => {
			e.stopPropagation();
		};

		const container = chatContainerRef.current;
		container.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			container.removeEventListener("wheel", handleWheel);
		};
	}, [isOpen]);

	return (
		<>
			<motion.button
				onClick={toggleChat}
				className="fixed bottom-8 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full accent-bg text-zinc-50 shadow-lg cursor-pointer md:right-7"
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
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
						ref={chatContainerRef}
						layout
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						transition={{ type: "spring", stiffness: 500, damping: 30 }}
						className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-5 z-20 flex flex-col overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-900 shadow-2xl w-[calc(100vw-2rem)] sm:w-96 h-[75vh] sm:h-[32rem]"
					>
						<div className="flex items-center gap-1 border-b border-zinc-700/50 bg-zinc-800 px-5 py-2">
							<HiSparkles className="text-base text-zinc-300" />
							<h3 className="text-base font-semibold text-zinc-50">deleb.ai</h3>
						</div>

						<div
							ref={messagesRef}
							className="flex-1 space-y-3 overflow-y-scroll px-4 py-4 scroll-smooth"
							style={{
								scrollbarColor: "rgb(63 63 70) transparent",
								scrollbarWidth: "thin",
							}}
						>
							{messages.map((msg, i) => (
								<ChatMessage key={i} message={msg} />
							))}

							{isLoading && (
								<div className="flex justify-start">
									<div className="flex space-x-1.5 rounded-2xl bg-zinc-800 px-4 py-3">
										{[0, 0.1, 0.2].map((delay) => (
											<motion.div
												key={delay}
												className="h-1.5 w-1.5 rounded-full bg-zinc-500"
												animate={{ y: [0, -4, 0] }}
												transition={{ duration: 0.6, repeat: Infinity, delay }}
											/>
										))}
									</div>
								</div>
							)}
							<div ref={endRef} />
						</div>

						<div className="border-t border-zinc-700/50 p-4">
							<div className="relative">
								<input
									type="text"
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyDown={handleKeyPress}
									placeholder="Ask something..."
									disabled={isLoading}
									className="w-full rounded-xl bg-zinc-800 py-2.5 pl-4 pr-11 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
								/>
								<button
									onClick={sendMessage}
									disabled={isLoading || !input.trim()}
									className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-400 transition-all hover:scale-110 hover:text-zinc-100 active:scale-90 disabled:opacity-30"
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
