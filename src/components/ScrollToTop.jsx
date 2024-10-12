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

			if (currentScrollY < 280) {
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
			className="fixed bottom-7 right-6 z-50 w-12 h-12 rounded-full bg-white text-black transition-colors duration-300 flex items-center justify-center"
			initial={{ opacity: 0, y: 20 }}
			animate={
				shouldAnimateExit
					? { opacity: 0, y: 20 }
					: isVisible
					? { opacity: 1, y: 0 }
					: { opacity: 0, y: 20 }
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
			<span className="font-semibold material-symbols-rounded">
				arrow_upward
			</span>
		</motion.button>
	);
};

export default ScrollToTop;
