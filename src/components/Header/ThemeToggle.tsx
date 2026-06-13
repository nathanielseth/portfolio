import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
	const { theme, toggle } = useTheme();

	return (
		<button
			type="button"
			onClick={toggle}
			className="flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-2xl hover:bg-zinc-200/50 dark:hover:bg-zinc-50/15 transition-colors cursor-pointer"
			aria-label={
				theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
			}
		>
			{theme === "dark" ? (
				<Sun className="w-4 h-4" />
			) : (
				<Moon className="w-4 h-4" />
			)}
		</button>
	);
}