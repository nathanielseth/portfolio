import { RiJavascriptFill, RiReactjsLine } from "react-icons/ri";
import { BiLogoTypescript, BiLogoPostgresql } from "react-icons/bi";
import {
	SiDotnet,
	SiTailwindcss,
	SiNextdotjs,
	SiNodedotjs,
	SiCsharp,
} from "react-icons/si";

export const skills = [
	{ name: "JavaScript", icon: RiJavascriptFill, color: "#e6ce02" },
	{ name: "TypeScript", icon: BiLogoTypescript, color: "#037acc" },
	{ name: "React", icon: RiReactjsLine, color: "#58c4dc" },
	{ name: "C#", icon: SiCsharp, color: "#f15029" },
	{ name: ".NET", icon: SiDotnet, color: "#512bd4" },
	{ name: "PostgreSQL", icon: BiLogoPostgresql, color: "#316192" },
	{ name: "TailwindCSS", icon: SiTailwindcss, color: "#4eb1b4" },
	{ name: "Node.js", icon: SiNodedotjs, color: "#83cd29" },
	{ name: "Next.js", icon: SiNextdotjs, color: "#111111" },
];
