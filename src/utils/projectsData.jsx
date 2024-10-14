import { SiGodotengine, SiSocketdotio, SiExpress } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import { FaReact, FaHtml5, FaNodeJs } from "react-icons/fa";
import { TfiCss3 } from "react-icons/tfi";

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
				"Godot Engine"
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
		projectLink: "",
		codeLink: "https://github.com/nathanielseth/vibechess",
		category: "WEB",
	},
	{
		imgSrc: "/portfolio/images/nt.webp",
		title: "Neti-Cents",
		description:
			"A simple, user-friendly tool for calculating income tax in the Philippines.",
		tags: [
			createTag(
				<IoLogoJavascript className={iconClassName} />,
				"bg-[#dfce3c] text-zinc-950",
				"JavaScript"
			),
			createTag(
				<FaHtml5 className="inline-block w-6 h-6" />,
				"bg-[#ef652a] text-zinc-50",
				"HTML5"
			),
			createTag(
				<TfiCss3 className={iconClassName} />,
				"bg-[#1c88c7] text-zinc-50",
				"CSS3"
			),
		],
		projectLink: "https://nathanielseth.github.io/income-tax-ph-calculator/",
		codeLink: "https://github.com/nathanielseth/income-tax-ph-calculator",
		category: "WEB",
	},
];

export default projects;
