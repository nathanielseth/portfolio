import { FaReact, FaGitAlt } from "react-icons/fa";
import { BiLogoTypescript, BiLogoPostgresql } from "react-icons/bi";
import {
	SiSocketdotio,
	SiTailwindcss,
	SiNextdotjs,
	SiNodedotjs,
	SiExpress,
} from "react-icons/si";

export const skills = [
	// Frontend
	{
		name: "React",
		icon: FaReact,
		color: "#017fa5",
		description: "JavaScript frontend library",
	},
	{
		name: "TypeScript",
		icon: BiLogoTypescript,
		color: "#037acc",
		description: "Typed JavaScript superset",
	},
	{
		name: "TailwindCSS",
		icon: SiTailwindcss,
		color: "#4eb1b4",
		description: "CSS framework",
	},
	{
		name: "Next.js",
		icon: SiNextdotjs,
		color: "#111111",
		description: "React framework",
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
	{
		name: "PostgreSQL",
		icon: BiLogoPostgresql,
		color: "#316192",
		description: "Relational database",
	},
];
