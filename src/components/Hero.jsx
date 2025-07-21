import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const typingVariants = {
	hidden: { opacity: 0 },
	visible: (i) => ({
		opacity: 1,
		transition: {
			duration: 1,
			delay: i * 0.17,
		},
	}),
};

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.4,
			delayChildren: 0.9,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const arrowVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			opacity: { duration: 0.4 },
			y: {
				duration: 1.0,
				repeat: Infinity,
				repeatType: "reverse",
				ease: "easeInOut",
			},
		},
	},
};

const Hero = () => {
	const [showArrow, setShowArrow] = useState(false);
	const [isInitialAnimationComplete, setInitialAnimationComplete] =
		useState(false);

	const heading = "Hi, I'm Nathaniel Seth".split(" ");

	useEffect(() => {
		const handleScroll = () => {
			const shouldBeVisible =
				isInitialAnimationComplete && window.scrollY <= 50;
			setShowArrow(shouldBeVisible);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isInitialAnimationComplete]);

	const scrollToProjects = () => {
		document.getElementById("projects")?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	return (
		<main className="relative flex min-h-screen flex-col items-center justify-center text-center">
			<motion.h1
				id="hero-heading"
				className="mb-3 text-3xl font-semibold text-zinc-50 sm:text-4xl md:text-5xl"
			>
				{heading.map((word, i) => (
					<motion.span
						key={`word-${i}`}
						custom={i}
						variants={typingVariants}
						initial="hidden"
						animate="visible"
						style={word === "Seth" ? { color: "#7f2ffa" } : {}}
						className="mr-1 md:mr-2"
					>
						{word}
					</motion.span>
				))}
			</motion.h1>

			<motion.div
				className="mx-auto max-w-2xl text-center"
				variants={containerVariants}
				initial="hidden"
				animate="show"
				role="region"
				aria-labelledby="hero-heading"
				onAnimationComplete={() => {
					setInitialAnimationComplete(true);
					if (window.scrollY <= 50) {
						setShowArrow(true);
					}
				}}
			>
				<motion.p
					className="mx-auto mb-9 mt-4 max-w-lg px-4 text-xs text-zinc-400 md:px-0 md:text-base"
					variants={itemVariants}
				>
					I build intuitive and responsive web applications. My passion lies in
					crafting innovative ideas into seamless, user-focused digital
					experiences.
				</motion.p>

				<motion.a
					whileTap={{ scale: 0.95 }}
					whileHover={{ scale: 1.05 }}
					transformTemplate={(props, transform) =>
						transform.replace(" translateZ(0)", "")
					}
					variants={itemVariants}
					layout="position"
					href="/portfolio/assets/NathanielSeth_DeLeon_Resume.pdf"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex h-9 items-center gap-1 rounded-full bg-[#7f2ffa] px-4 text-zinc-50 sm:h-10 md:h-12 md:px-5"
					aria-label="Download resume"
				>
					<span className="text-sm font-semibold leading-none sm:text-base">
						Get Resume
					</span>
					<span className="material-symbols-rounded flex items-center text-sm leading-none sm:text-base md:text-lg">
						download
					</span>
				</motion.a>
			</motion.div>

			<motion.button
				className="group absolute bottom-20 cursor-pointer"
				variants={arrowVariants}
				initial="hidden"
				animate={showArrow ? "visible" : "hidden"}
				onClick={scrollToProjects}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				aria-label="Scroll to projects section"
			>
				<span className="material-symbols-rounded text-xl text-zinc-400 transition-colors duration-200 group-hover:text-zinc-300 md:text-2xl">
					arrow_downward
				</span>
			</motion.button>
		</main>
	);
};

export default Hero;
