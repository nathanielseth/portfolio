import { Sun, Moon } from "lucide-react";
import { m } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

interface ThemeToggleProps {
	variant?: "icon" | "switch";
}

export default function ThemeToggle({ variant = "icon" }: ThemeToggleProps) {
	const { theme, toggle } = useTheme();
	const isDark = theme === "dark";
	const label = isDark ? "Switch to light mode" : "Switch to dark mode";

	if (variant === "switch") {
		return (
			<button
				type="button"
				role="switch"
				aria-checked={isDark}
				onClick={toggle}
				aria-label={label}
				className="relative flex items-center w-12 h-7 rounded-full px-1 cursor-pointer
					bg-zinc-300/70 dark:bg-zinc-50/15
					transition-colors"
			>
				<m.span
					layout
					transition={{ type: "spring", stiffness: 500, damping: 35 }}
					className="flex items-center justify-center w-5 h-5 rounded-full
						bg-white dark:bg-zinc-900 shadow-sm"
					style={{ marginLeft: isDark ? "auto" : 0 }}
				>
					{isDark ? (
						<Moon className="w-3 h-3 text-zinc-100" />
					) : (
						<Sun className="w-3 h-3 text-zinc-700" />
					)}
				</m.span>
			</button>
		);
	}

	return (
		<button
			type="button"
			onClick={toggle}
			className="flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-2xl hover:bg-zinc-200/50 dark:hover:bg-zinc-50/15 transition-colors cursor-pointer"
			aria-label={label}
		>
			{isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
		</button>
	);
}