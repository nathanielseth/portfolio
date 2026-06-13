import { createContext, use } from "react";
import type { Theme } from "../types";

export interface ThemeContextValue {
	theme: Theme;
	toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
	theme: "light",
	toggle: () => {},
});

export const useTheme = () => use(ThemeContext);