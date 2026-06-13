import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import type { Theme } from "../types";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window === "undefined") return "light";
		return (
			(localStorage.getItem("theme") as Theme) ??
			(window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light")
		);
	});

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggle = useCallback(
		() => setTheme((t) => (t === "dark" ? "light" : "dark")),
		[],
	);

	const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}