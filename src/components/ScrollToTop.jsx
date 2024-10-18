import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [shouldAnimateExit, setShouldAnimateExit] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);
	const lenis = useLenis();

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.pageYOffset;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			const isAtBottom = windowHeight + currentScrollY >= documentHeight - 1;

			if (isAtBottom) {
				setTimeout(() => {
					setIsVisible(true);
					setShouldAnimateExit(false);
				}, 230);
			} else if (currentScrollY < 280) {
				setIsVisible(false);
				setShouldAnimateExit(false);
			} else if (currentScrollY < lastScrollY && currentScrollY > 300) {
				setIsVisible(true);
				setShouldAnimateExit(false);
			} else if (currentScrollY >= lastScrollY) {
				setShouldAnimateExit(true);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	const scrollToTop = () => {
		lenis.scrollTo(0, { duration: 1 });
	};

	return (
		<motion.button
			onClick={scrollToTop}
			className="fixed bottom-7 right-5 z-50 w-13 h-13 rounded-full bg-[#7f2ffa] text-zinc-50 transition-colors duration-300 flex items-center justify-center"
			initial={{ opacity: 0, y: 30 }}
			animate={
				shouldAnimateExit
					? { opacity: 0, y: 30 }
					: isVisible
					? { opacity: 1, y: 0 }
					: { opacity: 0, y: 30 }
			}
			onAnimationComplete={() => {
				if (shouldAnimateExit) {
					setIsVisible(false);
					setShouldAnimateExit(false);
				}
			}}
			transition={{ type: "spring", stiffness: 300, damping: 20 }}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
		>
			<span className="font-normal text-5xl material-symbols-rounded">
				keyboard_arrow_up
			</span>
		</motion.button>
	);
};

export default ScrollToTop;
