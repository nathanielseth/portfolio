import { GodotIcon, SocketIoIcon, ExpressIcon, TailwindIcon, JavascriptIcon, ReactIcon, NodeJsIcon, HtmlIcon, SupabaseIcon } from "../../components/Icons/SvgIcons";

const createTag = (icon, color, tagName) => ({ label: icon, color, tagName });

const iconClassName = "inline-block w-11 h-11";

const projects = [
	// PROJECT 1
	{
		imgSrc: "/portfolio/images/vc.webp",
		title: "Classly",
		description:
			"An AI-Powered LMS and virtual classroom platform built for Computer Science thesis.",
		tags: [
			createTag(
				<ReactIcon className={iconClassName} />,
				"bg-[#009FB7] text-zinc-50",
				"React"
			),
			createTag(
				<TailwindIcon className={iconClassName} />,
				"bg-[#6457A6] text-zinc-50",
				"TailwindCSS"
			),
			createTag(
				<NodeJsIcon className={iconClassName} />,
				"bg-[#52AA5E] text-zinc-50",
				"Node.js"
			),
			createTag(
				<SupabaseIcon className={iconClassName} />,
				"bg-[#3fcf8e] text-zinc-50",
				"Supabase"
			),
			createTag(
				<ExpressIcon className={iconClassName} />,
				"bg-[#353535] text-zinc-50",
				"Express.js"
			),
		],
		projectLink: "",
		codeLink: "",
		category: "WEB",
		fullDescription:
			"I'm making an AI-Powered virtual classroom platform for lessons, assignments, interactive sessions, and real-time class activity. The system keeps students and instructors in sync with live updates, announcements, etc.",
		videoUrl: null,
	},
	// PROJECT 2
	{
		imgSrc: "/portfolio/images/vc.webp",
		title: "VibeChess",
		description:
			"A real-time multiplayer chess web application with Stockfish integration.",
		tags: [
			createTag(
				<ReactIcon className={iconClassName} />,
				"bg-[#009FB7] text-zinc-50",
				"React"
			),
			createTag(
				<NodeJsIcon className={iconClassName} />,
				"bg-[#52AA5E] text-zinc-50",
				"Node.js"
			),
			createTag(
				<SocketIoIcon className={iconClassName} />,
				"bg-zinc-50 text-zinc-950",
				"Socket.io"
			),
			createTag(
				<ExpressIcon className={iconClassName} />,
				"bg-[#353535] text-zinc-50",
				"Express.js"
			),
		],
		projectLink: "https://nathanielseth.github.io/vibechess/",
		codeLink: "https://github.com/nathanielseth/vibechess",
		category: "WEB",
		fullDescription:
			"I built a real-time chess platform where you can play quick matches with friends or random opponents. It includes Stockfish integration for practice games and live chat during games.",
		videoUrl: null,
	},
	// PROJECT 3
	{
		imgSrc: "/portfolio/images/nt.webp",
		title: "NetiCents",
		description:
			"A simple, user-friendly tool for calculating income tax in the Philippines.",
		tags: [
			createTag(
				<ReactIcon className={iconClassName} />,
				"bg-[#009FB7] text-zinc-50",
				"React"
			),
			createTag(
				<JavascriptIcon className={iconClassName} />,
				"bg-[#F4D35E] text-zinc-50",
				"JavaScript"
			),
			createTag(
				<TailwindIcon className={iconClassName} />,
				"bg-[#6457A6] text-zinc-50",
				"TailwindCSS"
			),
		],
		fullDescription:
			"I created a calculator to help estimate take-home pay based on Philippine tax laws. It handles withholding tax, mandatory contributions like SSS and PhilHealth, and premium pay calculations for overtime and night shifts.",
		projectLink: "https://nathanielseth.github.io/neticents/",
		codeLink: "https://github.com/nathanielseth/neticents",
		videoUrl: null,
		category: "WEB",
	},
	// PROJECT 4
	{
		imgSrc: "/portfolio/images/pk.webp",
		title: "ETIBARK",
		description:
			"A fun multi-platform roguelike currently in progress using Godot and GDScript.",
		tags: [
			createTag(
				<GodotIcon className={iconClassName} />,
				"bg-[#458dc0] text-zinc-50",
				"Godot"
			),
			createTag(
				<HtmlIcon className={iconClassName} />,
				"bg-[#017fa5] text-zinc-50",
				"HTML5"
			),
		],
		projectLink: "",
		codeLink: "",
		category: "GAME",
		fullDescription:
			"I'm building a satirical roguelike in a Filipino urban setting. You explore the kalyes, capturing creatures to upgrade your companion. How you play shifts the vibe of the run and changes what kind of wackiness the game throws back at you.",
		videoUrl: null,
	},
];

export default projects;
