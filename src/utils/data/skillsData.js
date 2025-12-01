import { FaReact, FaGitAlt } from "react-icons/fa";
import { BiLogoJavascript, BiLogoPython } from "react-icons/bi";
import {
	SiSocketdotio,
	SiTailwindcss,
	SiGodotengine,
	SiNodedotjs,
	SiExpress,
} from "react-icons/si";

export const skills = [
	{
		name: "React",
		icon: FaReact,
		color: "#017fa5",
		description: "JavaScript frontend library",
	},
	{
		name: "JavaScript",
		icon: BiLogoJavascript,
		color: "#f7df1e",
		description: "Frontend scripting language",
	},
	{
		name: "TailwindCSS",
		icon: SiTailwindcss,
		color: "#4eb1b4",
		description: "CSS framework",
	},
	{
		name: "Python",
		icon: BiLogoPython,
		color: "#3776ab",
		description: "Backend scripting language",
	},
	{
		name: "Node.js",
		icon: SiNodedotjs,
		color: "#83cd29",
		description: "JavaScript runtime",
	},
	{
		name: "Express.js",
		icon: SiExpress,
		color: "#323232",
		description: "Node.js web framework",
	},
	{
		name: "Godot",
		icon: SiGodotengine,
		color: "#478cbf",
		description: "Open-source game engine",
	},
	{
		name: "Socket.IO",
		icon: SiSocketdotio,
		color: "#010101",
		description: "Realtime application library",
	},
	{
		name: "Git",
		icon: FaGitAlt,
		color: "#DD6E42",
		description: "Version control",
	},
];

export const resumeMetadata = {
	lastModified: "Jul 2025",
};
