const YOUTUBE_RE =
	/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

export function getYouTubeId(url?: string): string | null {
	if (!url) return null;
	const match = url.match(YOUTUBE_RE);
	return match?.[2]?.length === 11 ? match[2] : null;
}

// use youtube-nocookie for privacy, autoplay, and same-channel related videos
export function buildYouTubeEmbedUrl(videoId: string): string {
	return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
}