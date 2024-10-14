import { RiJavascriptFill } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { BiLogoTypescript, BiLogoPostgresql } from "react-icons/bi";
import {
	SiDotnet,
	SiTailwindcss,
	SiNextdotjs,
	SiNodedotjs,
	SiCsharp,
} from "react-icons/si";

export const skills = [
	{ name: "JavaScript", icon: RiJavascriptFill, color: "#dfce3c" },
	{ name: "TypeScript", icon: BiLogoTypescript, color: "#037acc" },
	{ name: "React", icon: FaReact, color: "#017fa5" },
	{ name: "C#", icon: SiCsharp, color: "#9a4993" },
	{ name: ".NET", icon: SiDotnet, color: "#512bd4" },
	{ name: "PostgreSQL", icon: BiLogoPostgresql, color: "#316192" },
	{ name: "TailwindCSS", icon: SiTailwindcss, color: "#4eb1b4" },
	{ name: "Node.js", icon: SiNodedotjs, color: "#83cd29" },
	{ name: "Next.js", icon: SiNextdotjs, color: "#111111" },
];
