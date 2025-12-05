import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ChatMessage = ({ message }) => {
	const formatContent = (text) => {
		const emailRegex = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;
		const targetUrlRegex =
			/\b(?:https?:\/\/|www\.)?(?:github\.com|linkedin\.com)(?:\/[^\s,.)!?;]*)?/gi;
		const matches = [];
		let match;

		while ((match = emailRegex.exec(text)) !== null) {
			matches.push({
				start: match.index,
				end: match.index + match[0].length,
				text: match[0],
				type: "email",
			});
		}

		emailRegex.lastIndex = 0;

		while ((match = targetUrlRegex.exec(text)) !== null) {
			const isPartOfEmail = matches.some(
				(m) => match.index >= m.start && match.index < m.end
			);
			if (!isPartOfEmail && !match[0].includes("@")) {
				matches.push({
					start: match.index,
					end: match.index + match[0].length,
					text: match[0],
					type: "url",
				});
			}
		}

		matches.sort((a, b) => a.start - b.start);

		const result = [];
		let lastIndex = 0;

		matches.forEach((match, index) => {
			if (match.start > lastIndex) {
				result.push(text.slice(lastIndex, match.start));
			}

			if (match.type === "email") {
				result.push(
					<a
						key={index}
						href={`mailto:${match.text}`}
						className="accent-text font-semibold hover:underline transition-all"
					>
						{match.text}
					</a>
				);
			} else {
				const href = match.text.match(/^https?:\/\//)
					? match.text
					: `https://${match.text}`;
				result.push(
					<a
						key={index}
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className="accent-text font-semibold hover:underline transition-all"
					>
						{match.text}
					</a>
				);
			}

			lastIndex = match.end;
		});

		if (lastIndex < text.length) {
			result.push(text.slice(lastIndex));
		}

		return result.length > 0 ? result : text;
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 10, scale: 0.98 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.2 }}
			className={`flex ${
				message.role === "user" ? "justify-end" : "justify-start"
			}`}
		>
			<div
				className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
					message.role === "user"
						? "accent-bg text-zinc-50"
						: "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
				}`}
			>
				{formatContent(message.content)}
			</div>
		</motion.div>
	);
};

ChatMessage.propTypes = {
	message: PropTypes.shape({
		role: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
	}).isRequired,
};

export default ChatMessage;
