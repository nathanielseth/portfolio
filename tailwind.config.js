/** @type {import('tailwindcss').Config} */

import tailwindScrollbar from "tailwind-scrollbar";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Gabarito", "sans-serif"],
			},
			keyframes: {
				pulseGrow: {
					"0%": {
						boxShadow: "0 0 0 0 rgba(249, 54, 77, 1)",
						transform: "translateY(0)",
					},
					"50%": {
						boxShadow: "0 0 0 0.5em rgba(249, 54, 77, 0.2)",
						transform: "translateY(-1px)",
					},
					"100%": {
						boxShadow: "0 0 0 1em rgba(249, 54, 77, 0)",
						transform: "translateY(-3px)",
					},
				},
				pulseShrink: {
					"0%": {
						boxShadow: "0 0 0 1em rgba(249, 54, 77, 0)",
						transform: "translateY(-3px)",
					},
					"50%": {
						boxShadow: "0 0 0 0.5em rgba(249, 54, 77, 0.4)",
						transform: "translateY(-1px)",
					},
					"100%": {
						boxShadow: "0 0 0 0 rgba(249, 54, 77, 1)",
						transform: "translateY(0)",
					},
				},
			},
			animation: {
				pulseGrow: "pulseGrow 0.25s ease-out forwards",
				pulseShrink: "pulseShrink 0.2s ease-in forwards",
			},
		},
	},
	plugins: [tailwindScrollbar],
};
