import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, SendHorizonal, Bot } from "lucide-react";
import ChatMessage from "./ChatMessage";

const INITIAL_MESSAGE = {
	role: "assistant",
	content: "Hey there! Here to answer questions about Seth's work.",
};

const API_ENDPOINT = "https://lucky-night-09d6.nathanielseth-dev.workers.dev";
const RESUME_PATH = "/portfolio/assets/NathanielSeth_DeLeon_Resume.pdf";

let resumeTextCache = null;
let resumeLoadPromise = null;

const loadPDFText = async () => {
	if (resumeTextCache) return resumeTextCache;
	if (resumeLoadPromise) return resumeLoadPromise;

	resumeLoadPromise = (async () => {
		try {
			const pdfjsLib = await import("pdfjs-dist");
			await import("pdfjs-dist/build/pdf.worker.mjs");

			const response = await fetch(RESUME_PATH);
			const arrayBuffer = await response.arrayBuffer();
			const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

			const textPromises = Array.from({ length: pdf.numPages }, (_, i) =>
				pdf
					.getPage(i + 1)
					.then((page) =>
						page
							.getTextContent()
							.then((content) =>
								content.items.map((item) => item.str).join(" ")
							)
					)
			);

			const texts = await Promise.all(textPromises);
			resumeTextCache = texts.join("\n");
			return resumeTextCache;
		} catch (error) {
			console.error("Resume load error:", error);
			resumeTextCache = "RESUME_LOAD_FAILED";
			return resumeTextCache;
		}
	})();

	return resumeLoadPromise;
};

const ChatButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([INITIAL_MESSAGE]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [resumeText, setResumeText] = useState("");
	const [isLoadingResume, setIsLoadingResume] = useState(false);

	const endRef = useRef(null);
	const messagesContainerRef = useRef(null);

	useEffect(() => {
		if (messages.length > 1) {
			endRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages.length]);

	useEffect(() => {
		if (isOpen && !resumeText && !isLoadingResume) {
			setIsLoadingResume(true);
			loadPDFText().then((text) => {
				setResumeText(text);
				setIsLoadingResume(false);
			});
		}
	}, [isOpen, resumeText, isLoadingResume]);

	const sendMessage = useCallback(async () => {
		const trimmedInput = input.trim();
		if (!trimmedInput || isLoading) return;

		const userMessage = { role: "user", content: trimmedInput };
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
		if (!isOpen || !messagesContainerRef.current) return;

		const handleWheel = (e) => {
			const container = messagesContainerRef.current;
			const isScrollable = container.scrollHeight > container.clientHeight;

			if (isScrollable) {
				const isAtTop = container.scrollTop === 0;
				const isAtBottom =
					container.scrollTop + container.clientHeight >=
					container.scrollHeight - 1;

				const scrollingUp = e.deltaY < 0;
				const scrollingDown = e.deltaY > 0;

				if ((isAtTop && scrollingUp) || (isAtBottom && scrollingDown)) {
					e.preventDefault();
				}

				e.stopPropagation();
			}
		};

		const container = messagesContainerRef.current;
		container.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			container.removeEventListener("wheel", handleWheel);
		};
	}, [isOpen, messages]);

	const loadingDots = useMemo(
		() =>
			[0, 0.1, 0.2].map((delay) => (
				<motion.div
					key={delay}
					className="h-1.5 w-1.5 rounded-full bg-zinc-500"
					animate={{ y: [0, -4, 0] }}
					transition={{ duration: 0.6, repeat: Infinity, delay }}
				/>
			)),
		[]
	);

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
					{isOpen ? <X size={34} /> : <MessageCircle size={24} />}
				</motion.div>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						layout
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						transition={{ type: "spring", stiffness: 500, damping: 30 }}
						className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-5 z-20 flex flex-col overflow-hidden rounded-2xl border border-zinc-300 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 shadow-2xl w-[calc(100vw-2rem)] sm:w-96 h-[75vh] sm:h-[32rem]"
					>
						<div className="flex items-center gap-1 border-b border-zinc-300 dark:border-zinc-700/50 bg-zinc-100 dark:bg-zinc-800 px-5 py-2">
							<Bot className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
							<h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
								deleb.ai
							</h3>
						</div>

						<div
							ref={messagesContainerRef}
							className="flex-1 space-y-3 overflow-y-scroll px-4 py-4 scroll-smooth"
							style={{
								scrollbarColor: "rgb(161 161 170) transparent",
								scrollbarWidth: "thin",
							}}
						>
							{messages.map((msg, i) => (
								<ChatMessage key={i} message={msg} />
							))}

							{isLoading && (
								<div className="flex justify-start">
									<div className="flex space-x-1.5 rounded-2xl bg-zinc-200 dark:bg-zinc-800 px-4 py-3">
										{loadingDots}
									</div>
								</div>
							)}
							<div ref={endRef} />
						</div>

						<div className="border-t border-zinc-300 dark:border-zinc-700/50 p-4">
							<div className="relative">
								<input
									type="text"
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyDown={handleKeyPress}
									placeholder="Ask something..."
									disabled={isLoading}
									className="w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 py-2.5 pl-4 pr-11 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 dark:placeholder-zinc-500 dark:focus:outline-none focus:ring-zinc-300 dark:focus:ring-zinc-700"
								/>
								<button
									onClick={sendMessage}
									disabled={isLoading || !input.trim()}
									className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-500 dark:text-zinc-400 transition-all hover:scale-110 hover:text-zinc-900 dark:hover:text-zinc-100 active:scale-90 disabled:opacity-30"
									aria-label="Send message"
								>
									<SendHorizonal size={20} />
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
