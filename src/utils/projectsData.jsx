import { SiGodotengine, SiSocketdotio, SiExpress } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { RiHtml5Fill, RiCss3Fill } from "react-icons/ri";

const createTag = (icon, color, tagName) => ({ label: icon, color, tagName });

const iconClassName = "inline-block w-11 h-11";

const projects = [
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
	},
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
	},
	{
		imgSrc: "/portfolio/images/nt.webp",
		title: "NetiCents",
		description:
			"A simple, user-friendly tool for calculating income tax in the Philippines.",
		tags: [
			createTag(
				<IoLogoJavascript className={iconClassName} />,
				"bg-[#dfce3c] text-zinc-950",
				"JavaScript"
			),
			createTag(
				<RiHtml5Fill className={iconClassName} />,
				"bg-[#e34f26] text-zinc-50",
				"HTML"
			),
			createTag(
				<RiCss3Fill className={iconClassName} />,
				"bg-[#264de4] text-zinc-50",
				"CSS"
			),
		],
		projectLink: "https://nathanielseth.github.io/neticents/",
		codeLink: "https://github.com/nathanielseth/neticents",
		category: "WEB",
	},
];

export default projects;
