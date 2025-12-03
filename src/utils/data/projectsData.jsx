import {
	SiGodotengine,
	SiSocketdotio,
	SiExpress,
	SiTailwindcss,
} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { RiHtml5Fill } from "react-icons/ri";

const createTag = (icon, color, tagName) => ({ label: icon, color, tagName });

const iconClassName = "inline-block w-11 h-11";

const projects = [
	// PROJECT 1
	{
		imgSrc: "/portfolio/images/pk.webp",
		title: "ETIBARK",
		description:
			"A fun multi-platform roguelike currently in progress using Godot and GDScript.",
		tags: [
			createTag(
				<SiGodotengine className={iconClassName} />,
				"bg-[#458dc0] text-zinc-50",
				"Godot"
			),
			createTag(
				<RiHtml5Fill className={iconClassName} />,
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
	// PROJECT 2
	{
		imgSrc: "/portfolio/images/vc.webp",
		title: "VibeChess",
		description:
			"A real-time multiplayer chess web app with Stockfish integration.",
		tags: [
			createTag(
				<FaReact className={iconClassName} />,
				"bg-[#017fa5] text-zinc-50",
				"React"
			),
			createTag(
				<FaNodeJs className={iconClassName} />,
				"bg-[#23b45d] text-zinc-50",
				"Node.js"
			),
			createTag(
				<SiSocketdotio className={iconClassName} />,
				"bg-zinc-50 text-zinc-950",
				"Socket.io"
			),
			createTag(
				<SiExpress className={iconClassName} />,
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
				<FaReact className={iconClassName} />,
				"bg-[#017fa5] text-zinc-50",
				"React"
			),
			createTag(
				<IoLogoJavascript className={iconClassName} />,
				"bg-[#dfce3c] text-zinc-950",
				"JavaScript"
			),
			createTag(
				<SiTailwindcss className={iconClassName} />,
				"bg-[#38b2ac] text-zinc-50",
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
	// PROJECT 4 CLASSLY
	{
		imgSrc: "/portfolio/images/vc.webp",
		title: "Classly",
		description:
			"A modern LMS and virtual classroom platform built for our Computer Science thesis.",
		tags: [
			createTag(
				<FaReact className={iconClassName} />,
				"bg-[#017fa5] text-zinc-50",
				"React"
			),
			createTag(
				<SiTailwindcss className={iconClassName} />,
				"bg-[#38b2ac] text-zinc-50",
				"TailwindCSS"
			),
			createTag(
				<FaNodeJs className={iconClassName} />,
				"bg-[#23b45d] text-zinc-50",
				"Node.js"
			),
			createTag(
				<SiExpress className={iconClassName} />,
				"bg-[#353535] text-zinc-50",
				"Express.js"
			),
			// Supabase icon isn't in your imports, so no icon here — tag only
			createTag(
				<span
					className={
						iconClassName +
						" flex items-center justify-center font-bold text-xl"
					}
				>
					S
				</span>,
				"bg-[#3fcf8e] text-zinc-950",
				"Supabase"
			),
		],
		projectLink: "", // if you will deploy it later, add here
		codeLink: "", // private? leave empty
		category: "WEB",
		fullDescription:
			"Classly is our thesis project — a full-featured LMS and virtual classroom platform for managing lessons, assignments, interactive sessions, and real-time class activities. Built with React for the UI, Tailwind for layouts, and Supabase for authentication, storage, and database. The system streamlines communication between students and instructors with live updates, announcements, submissions, and grading tools.",
		videoUrl: null,
	},
];

export default projects;
