import { SiGodotengine, SiSocketdotio, SiExpress } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import { FaReact, FaHtml5 } from "react-icons/fa";
import { TfiCss3 } from "react-icons/tfi";

const createTag = (icon, color) => ({ label: icon, color });

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
				"bg-[#458dc0] text-zinc-50"
			),
		],
		projectLink: "",
		codeLink: "",
	},
	{
		imgSrc: "/portfolio/images/vc.webp",
		title: "VibeChess",
		description:
			"A real-time multiplayer chess web app with Stockfish integration.",
		tags: [
			createTag(
				<FaReact className={iconClassName} />,
				"bg-[#017fa5] text-zinc-50"
			),
			createTag(
				<SiSocketdotio className={iconClassName} />,
				"bg-zinc-50 text-zinc-950"
			),
			createTag(
				<SiExpress className={iconClassName} />,
				"bg-[#353535] text-zinc-50"
			),
		],
		projectLink: "",
		codeLink: "https://github.com/nathanielseth/vibechess",
	},
	{
		imgSrc: "/portfolio/images/nt.webp",
		title: "Neti-Cents",
		description:
			"A simple, user-friendly tool for calculating income tax in the Philippines.",
		tags: [
			createTag(
				<IoLogoJavascript className={iconClassName} />,
				"bg-[#dfce3c] text-zinc-950"
			),
			createTag(
				<FaHtml5 className="inline-block w-6 h-6" />,
				"bg-[#ef652a] text-zinc-50"
			),
			createTag(
				<TfiCss3 className={iconClassName} />,
				"bg-[#1c88c7] text-zinc-50"
			),
		],
		projectLink: "https://nathanielseth.github.io/income-tax-ph-calculator/",
		codeLink: "https://github.com/nathanielseth/income-tax-ph-calculator",
	},
];

export default projects;
