export interface Segment {
	key: string;
	type: "text" | "email" | "url";
	text: string;
	href?: string;
}

// share regex instances across calls, reset lastIndex to avoid stale matches
const EMAIL_RE = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;
const URL_RE =
	/\b(?:https?:\/\/|www\.)?(?:github\.com|linkedin\.com)(?:\/[^\s,.)!?;]*)?/gi;

type RawMatch = {
	start: number;
	end: number;
	raw: string;
	type: "email" | "url";
};

// render emails and urls as clickable links in chat messages
export function parseContent(text: string): Segment[] {
	const matches: RawMatch[] = [];
	let m: RegExpExecArray | null;

	EMAIL_RE.lastIndex = 0;
	while ((m = EMAIL_RE.exec(text)) !== null) {
		matches.push({
			start: m.index,
			end: m.index + m[0].length,
			raw: m[0],
			type: "email",
		});
	}

	URL_RE.lastIndex = 0;
	while ((m = URL_RE.exec(text)) !== null) {
		const overlapsEmail = matches.some(
			(e) => m!.index >= e.start && m!.index < e.end,
		);
		if (!overlapsEmail && !m[0].includes("@")) {
			matches.push({
				start: m.index,
				end: m.index + m[0].length,
				raw: m[0],
				type: "url",
			});
		}
	}

	matches.sort((a, b) => a.start - b.start);

	const segments: Segment[] = [];
	let cursor = 0;

	for (const match of matches) {
		if (match.start > cursor) {
			segments.push({
				key: `t${cursor}`,
				type: "text",
				text: text.slice(cursor, match.start),
			});
		}

		if (match.type === "email") {
			segments.push({
				key: `e${match.start}`,
				type: "email",
				text: match.raw,
				href: `mailto:${match.raw}`,
			});
		} else {
			const href = /^https?:\/\//.test(match.raw)
				? match.raw
				: `https://${match.raw}`;
			segments.push({
				key: `u${match.start}`,
				type: "url",
				text: match.raw,
				href,
			});
		}

		cursor = match.end;
	}

	if (cursor < text.length) {
		segments.push({
			key: `t${cursor}`,
			type: "text",
			text: text.slice(cursor),
		});
	}

	return segments.length > 0 ? segments : [{ key: "t0", type: "text", text }];
}