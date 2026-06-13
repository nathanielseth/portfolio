import { useReducedMotion } from "motion/react";
import { m, AnimatePresence } from "motion/react";
import { X, Bot, SendHorizontal } from "lucide-react";
import ChatMessage from "./ChatMessage";
import {
	STATUS_CONFIG,
	QUICK_ACTIONS,
	type State,
	type Action,
} from "./chat.constants";

const DOTS = [0, 0.1, 0.2] as const;

function LoadingDots() {
	return (
		<div className="flex justify-start">
			<div className="flex space-x-1.5 rounded-2xl bg-zinc-200 dark:bg-zinc-800 px-4 py-3">
				{DOTS.map((delay) => (
					<m.div
						key={delay}
						className="h-1.5 w-1.5 rounded-full bg-zinc-500"
						animate={{ y: [0, -4, 0] }}
						transition={{ duration: 0.6, repeat: Infinity, delay }}
					/>
				))}
			</div>
		</div>
	);
}

interface ChatPanelProps {
	state: State;
	dispatch: React.Dispatch<Action>;
	inputRef: React.RefObject<HTMLInputElement | null>;
	containerRef: React.RefObject<HTMLDivElement | null>;
	endRef: React.RefObject<HTMLDivElement | null>;
	onSend: (content?: string) => void;
}

export default function ChatPanel({
	state,
	dispatch,
	inputRef,
	containerRef,
	endRef,
	onSend,
}: ChatPanelProps) {
	const { isOpen, messages, input, isLoading, status } = state;

	const prefersReduced = useReducedMotion();

	const showQuickActions = messages.length === 1;
	const isOffline = status === "offline";
	const isRateLimited = status === "rateLimited";

	const panelVariants = prefersReduced
		? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
		: {
				initial: { opacity: 0, y: 20, scale: 0.95 },
				animate: { opacity: 1, y: 0, scale: 1 },
				exit: { opacity: 0, y: 20, scale: 0.95 },
			};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSend();
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<m.div
					id="seth-chat-panel"
					role="dialog"
					aria-modal="false"
					aria-label="Chat with Seth's AI assistant"
					{...panelVariants}
					transition={{ type: "spring", stiffness: 500, damping: 30 }}
					className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-5 z-20 flex flex-col overflow-hidden rounded-2xl border border-zinc-300 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 shadow-2xl w-[calc(100vw-2rem)] sm:w-96 h-[75vh] sm:h-128"
				>
					<div className="flex items-center justify-between gap-2 border-b border-zinc-300 dark:border-zinc-700/50 bg-zinc-100 dark:bg-zinc-800 px-4 py-3">
						<div className="flex items-center gap-2.5">
							<div className="relative flex h-8 w-8 items-center justify-center rounded-full accent-bg">
								<Bot className="h-4 w-4 text-zinc-50" />
								<span
									className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-zinc-100 dark:border-zinc-800 ${STATUS_CONFIG[status].color}`}
								/>
							</div>
							<div className="flex flex-col leading-tight">
								<h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
									deleb.ai
								</h3>
								<span className="text-[11px] text-zinc-500 dark:text-zinc-400">
									{STATUS_CONFIG[status].label}
								</span>
							</div>
						</div>
						<button
							type="button"
							onClick={() => dispatch({ type: "CLOSE" })}
							className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
							aria-label="Close chat"
						>
							<X size={18} />
						</button>
					</div>

					<div
						ref={containerRef}
						className="flex-1 space-y-3 overflow-y-scroll px-4 py-4 scroll-smooth overflow-x-hidden"
						style={{
							scrollbarColor: "rgb(161 161 170) transparent",
							scrollbarWidth: "thin",
						}}
					>
						{messages.map((msg) => (
							<ChatMessage key={msg.id} message={msg} />
						))}

						{isLoading && <LoadingDots />}

						{showQuickActions && !isLoading && (
							<m.div
								className="flex flex-col gap-2 pt-2 items-end"
								initial={{ opacity: 0, y: prefersReduced ? 0 : -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
							>
								{QUICK_ACTIONS.map((action, i) => (
									<m.button
										key={action}
										type="button"
										onClick={() => onSend(action)}
										className="px-3 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-pointer"
										initial={{ opacity: 0, x: prefersReduced ? 0 : 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: prefersReduced ? 0 : i * 0.08 }}
										whileHover={prefersReduced ? {} : { scale: 1.02 }}
										whileTap={prefersReduced ? {} : { scale: 0.98 }}
									>
										{action}
									</m.button>
								))}
							</m.div>
						)}

						<div ref={endRef} />
					</div>

					<div className="border-t border-zinc-300 dark:border-zinc-700/50 p-3">
						{isOffline && (
							<p className="mb-2 text-center text-[11px] text-zinc-500 dark:text-zinc-400">
								The assistant is currently offline. You can still leave a
								message, or check back later.
							</p>
						)}
						{isRateLimited && (
							<p className="mb-2 text-center text-[11px] text-amber-600 dark:text-amber-400">
								You're sending messages too fast. Wait a moment before trying
								again.
							</p>
						)}
						<div className="relative">
							<input
								ref={inputRef}
								type="text"
								value={input}
								onChange={(e) =>
									dispatch({ type: "SET_INPUT", payload: e.target.value })
								}
								onKeyDown={handleKeyDown}
								placeholder="Ask something..."
								disabled={isLoading}
								maxLength={500}
								className="w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 py-2.5 pl-4 pr-11 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700 disabled:opacity-60 transition-shadow"
								aria-label="Message input"
							/>
							<m.button
								type="button"
								onClick={() => onSend()}
								disabled={isLoading || !input.trim()}
								className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 dark:text-zinc-400 enabled:hover:text-zinc-50 enabled:hover:accent-bg disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-default"
								whileTap={prefersReduced || isLoading ? {} : { scale: 0.9 }}
								aria-label="Send message"
							>
								<SendHorizontal size={18} />
							</m.button>
						</div>
					</div>
				</m.div>
			)}
		</AnimatePresence>
	);
}