import {
	createContext,
	useContext,
	useEffect,
	useState,
	useMemo,
	useCallback,
} from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		const stored = localStorage.getItem("theme");
		if (stored === "light" || stored === "dark") return stored;

		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return "dark";
		}

		return "dark";
	});

	useEffect(() => {
		const root = document.documentElement;

		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}

		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = useCallback(() => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	}, []);

	const value = useMemo(
		() => ({
			theme,
			toggleTheme,
			isDark: theme === "dark",
		}),
		[theme, toggleTheme]
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

ThemeProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error();
	}
	return context;
};
