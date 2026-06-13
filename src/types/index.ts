export interface Tag {
	id: string;
	label: string;
	color: string; // tailwind bg+text classes
}

export interface Project {
	id: string;
	imgSrc: string;
	title: string;
	description: string;
	fullDescription: string;
	tags: Tag[];
	projectLink?: string;
	codeLink?: string;
	videoUrl?: string;
	category: "WEB" | "GAME" | "MOBILE";
}

export interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
}

export type Theme = "light" | "dark";