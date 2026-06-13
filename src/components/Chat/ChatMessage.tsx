import { memo, useMemo } from "react";
import { m } from "motion/react";
import { parseContent } from "../../utils/parseContent";
import type { ChatMessage as ChatMessageType } from "../../types";

interface Props {
	message: ChatMessageType;
}

function ChatMessage({ message }: Props) {
	const segments = useMemo(
		() => parseContent(message.content),
		[message.content],
	);

	const isUser = message.role === "user";

	return (
		<m.div
			initial={{ opacity: 0, y: 10, scale: 0.98 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.2 }}
			className={`flex ${isUser ? "justify-end" : "justify-start"}`}
		>
			<div
				className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
					isUser
						? "accent-bg text-zinc-50"
						: "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
				}`}
			>
				{segments.map((seg) => {
					if (seg.type === "text") return seg.text;
					return (
						<a
							key={seg.key}
							href={seg.href}
							target={seg.type === "url" ? "_blank" : undefined}
							rel={seg.type === "url" ? "noopener noreferrer" : undefined}
							className="accent-text font-semibold hover:underline"
						>
							{seg.text}
						</a>
					);
				})}
			</div>
		</m.div>
	);
}

export default memo(ChatMessage);