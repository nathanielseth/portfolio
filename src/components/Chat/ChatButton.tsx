import { m, useReducedMotion } from "motion/react";
import { MessageCircle, X } from "lucide-react";
import ChatPanel from "./ChatPanel";
import { useChatEngine } from "../../hooks/useChatEngine";

export default function ChatButton() {
	const { state, dispatch, inputRef, containerRef, endRef, sendMessage } =
		useChatEngine();

	const prefersReduced = useReducedMotion();
	const { isOpen } = state;

	return (
		<>
			<m.button
				type="button"
				onClick={() => dispatch({ type: "TOGGLE" })}
				className="fixed bottom-8 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full accent-bg text-zinc-50 shadow-lg cursor-pointer md:right-7"
				initial={{ scale: prefersReduced ? 1 : 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: "spring", stiffness: 400, damping: 17 }}
				whileHover={prefersReduced ? {} : { scale: 1.05 }}
				whileTap={prefersReduced ? {} : { scale: 0.95 }}
				aria-label={
					isOpen ? "Close chat" : "Open chat with Seth's AI assistant"
				}
				aria-expanded={isOpen}
				aria-controls="seth-chat-panel"
			>
				<m.div
					animate={{ rotate: isOpen ? 90 : 0 }}
					transition={{ type: "spring", stiffness: 500, damping: 25 }}
				>
					{isOpen ? <X size={24} /> : <MessageCircle size={24} />}
				</m.div>
			</m.button>

			<ChatPanel
				state={state}
				dispatch={dispatch}
				inputRef={inputRef}
				containerRef={containerRef}
				endRef={endRef}
				onSend={sendMessage}
			/>
		</>
	);
}