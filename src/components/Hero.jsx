import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const typingVariants = {
	hidden: { opacity: 0 },
	visible: (i) => ({
		opacity: 1,
		transition: {
			duration: 1,
			delay: i * 0.16,
		},
	}),
};

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.4,
			delayChildren: 0.7,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const arrowVariants = {
	visible: {
		opacity: 1,
		y: [0, 11, 0],
		transition: {
			y: {
				duration: 1,
				repeat: Infinity,
				ease: "easeInOut",
			},
			opacity: { duration: 0.5 },
		},
	},
	hidden: {
		opacity: 0,
		y: 20,
		transition: {
			opacity: { duration: 0.4 },
			y: { duration: 0.5 },
		},
	},
};

const Hero = () => {
	const [showArrow, setShowArrow] = useState(false);
	const heading = "Hi, I'm Nathaniel Seth".split(" ");

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowArrow(true);
		}, 4000);

		const handleScroll = () => {
			setShowArrow(window.scrollY <= 50);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			clearTimeout(timer);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const scrollToProjects = () => {
		const projectsSection = document.getElementById("projects");
		if (projectsSection) {
			projectsSection.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	return (
		<main className="flex flex-col items-center justify-center min-h-screen relative text-center">
			<motion.h1
				id="hero-heading"
				className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 text-zinc-50"
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
				className="max-w-2xl mx-auto text-center"
				variants={containerVariants}
				initial="hidden"
				animate="show"
				role="region"
				aria-labelledby="hero-heading"
			>
				<motion.p
					className="mt-4 text-xs text-zinc-400 md:text-base mb-9 md:max-w-lg mx-auto px-4 md:px-0"
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
					className="inline-flex items-center gap-1 bg-[#7f2ffa] text-zinc-50 px-4 md:px-5 h-9 sm:h-10 md:h-12 rounded-full"
					aria-label="Download resume"
				>
					<span className="font-semibold text-sm sm:text-base leading-none">
						Get Resume
					</span>
					<span className="material-symbols-rounded text-sm sm:text-base md:text-lg leading-none flex items-center">
						download
					</span>
				</motion.a>
			</motion.div>

			<motion.button
				className="absolute bottom-20 cursor-pointer group hover:scale-110 transition-transform duration-200"
				variants={arrowVariants}
				initial="hidden"
				animate={showArrow ? "visible" : "hidden"}
				onClick={scrollToProjects}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				aria-label="Scroll to projects section"
			>
				<span className="material-symbols-rounded md:text-2xl text-xl text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200">
					arrow_downward
				</span>
			</motion.button>
		</main>
	);
};

export default Hero;
