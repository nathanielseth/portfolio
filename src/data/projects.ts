import type { Project } from "../types";

const projects: Project[] = [
	{
		id: "vibechess",
		imgSrc: "/portfolio/images/projects/vc.webp",
		title: "VibeChess",
		description:
			"A real-time multiplayer chess web app with Stockfish integration.",
		fullDescription:
			"I built a real-time chess platform where you can play quick matches with friends or random opponents. It includes Stockfish integration for practice games and live chat during matches.",
		tags: [
			{ id: "react", label: "React", color: "bg-[#009FB7] text-zinc-50" },
			{ id: "nodejs", label: "Node.js", color: "bg-[#52AA5E] text-zinc-50" },
			{ id: "socketio", label: "Socket.io", color: "bg-zinc-800 text-zinc-50" },
			{
				id: "express",
				label: "Express.js",
				color: "bg-[#353535] text-zinc-50",
			},
		],
		projectLink: "https://nathanielseth.github.io/vibechess/",
		codeLink: "https://github.com/nathanielseth/vibechess",
		videoUrl: undefined,
		category: "WEB",
	},
	{
		id: "neticents",
		imgSrc: "/portfolio/images/projects/nt.webp",
		title: "NetiCents",
		description:
			"A simple, user-friendly tool for calculating income tax in the Philippines.",
		fullDescription:
			"I created a calculator to help estimate take-home pay based on Philippine tax laws. It handles withholding tax, mandatory contributions like SSS and PhilHealth, and premium pay calculations for overtime and night shifts.",
		tags: [
			{ id: "react", label: "React", color: "bg-[#009FB7] text-zinc-50" },
			{ id: "typescript", label: "TypeScript", color: "bg-[#3178C6] text-white" },
			{
				id: "tailwind",
				label: "TailwindCSS",
				color: "bg-[#6457A6] text-zinc-50",
			},
		],
		projectLink: "https://nathanielseth.github.io/neticents/",
		codeLink: "https://github.com/nathanielseth/neticents",
		videoUrl: undefined,
		category: "WEB",
	},
	{
		id: "etibark",
		imgSrc: "/portfolio/images/projects/pk.webp",
		title: "ETIBARK",
		description:
			"A fun multi-platform roguelike currently in progress using Godot and GDScript.",
		fullDescription:
			"I'm building a satirical roguelike in a Filipino urban setting. You explore the kalyes, capturing creatures to upgrade your companion. How you play shifts the vibe of the run and changes what kind of wackiness the game throws back at you.",
		tags: [
			{ id: "godot", label: "Godot", color: "bg-[#458dc0] text-zinc-50" },
			{ id: "html", label: "HTML5", color: "bg-[#017fa5] text-zinc-50" },
		],
		projectLink: undefined,
		codeLink: undefined,
		videoUrl: undefined,
		category: "GAME",
	},
];

export default projects;