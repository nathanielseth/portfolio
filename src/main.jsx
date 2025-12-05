import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";

import App from "./App.jsx";
import "./index.css";
import "lenis/dist/lenis.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</StrictMode>
);
