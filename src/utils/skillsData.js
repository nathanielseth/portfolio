import { FaReact, FaGitAlt } from "react-icons/fa";
import { BiLogoTypescript, BiLogoPostgresql } from "react-icons/bi";
import {
	SiDotnet,
	SiTailwindcss,
	SiNextdotjs,
	SiNodedotjs,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

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
		description: "React-based framework",
	},

	{
		name: "Node.js",
		icon: SiNodedotjs,
		color: "#83cd29",
		description: "JavaScript runtime",
	},
	{
		name: "C#",
		icon: TbBrandCSharp,
		color: "#9a4993",
		description: "Object-oriented language",
	},
	{
		name: "ASP.NET",
		icon: SiDotnet,
		color: "#512bd4",
		description: "Server-side web framework",
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
