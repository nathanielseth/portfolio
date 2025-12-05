import PropTypes from "prop-types";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = ({ className = "" }) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className={`flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-2xl hover:bg-zinc-200/50 dark:hover:bg-zinc-50/15 transition-[transform,background-color] ${className}`}
			aria-label="Toggle theme"
		>
			{theme === "dark" ? (
				<Sun className="w-4 h-4" />
			) : (
				<Moon className="w-4 h-4" />
			)}
		</button>
	);
};

ThemeToggle.propTypes = {
	className: PropTypes.string,
};

export default ThemeToggle;
