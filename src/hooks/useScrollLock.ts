import { useEffect } from "react";

export function useScrollLock(active: boolean): void {
	useEffect(() => {
		if (!active) return;

		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth;

		document.body.style.overflow = "hidden";
		document.body.style.paddingRight = `${scrollbarWidth}px`;

		return () => {
			document.body.style.overflow = "";
			document.body.style.paddingRight = "";
		};
	}, [active]);
}