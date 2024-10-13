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
			staggerChildren: 0.8,
			delayChildren: 2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	show: { opacity: 1, y: 0, transition: { duration: 1 } },
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
			opacity: { duration: 1.5 },
		},
	},
	hidden: {
		opacity: 0,
		y: 20,
		transition: {
			opacity: { duration: 0.5 },
			y: { duration: 0.5 },
		},
	},
};

const Hero = () => {
	const [showArrow, setShowArrow] = useState(false);

	const firstLine = "My name is Nathaniel Seth,".split(" ");
	const secondLine = "I'm a Full-Stack developer.".split(" ");

	useEffect(() => {
		setTimeout(() => {
			setShowArrow(true);
		}, 4500);

		const handleScroll = () => {
			const threshold = 50;

			setShowArrow(window.scrollY <= threshold);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<main className="flex flex-col items-center justify-center min-h-screen relative text-center">
			<motion.h1
				id="hero-heading"
				className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-3"
			>
				{firstLine.map((word, i) => {
					const key = `first-line-word-${i}`;

					if (word === "Nathaniel") {
						return (
							<motion.span
								key={key}
								custom={i}
								variants={typingVariants}
								initial="hidden"
								animate="visible"
								className="mr-1 md:mr-2 text-zinc-50"
							>
								{word}
							</motion.span>
						);
					}
					if (word === "Seth,") {
						return (
							<span key={key}>
								<motion.span
									key={`seth-word`}
									custom={i}
									variants={typingVariants}
									initial="hidden"
									animate="visible"
									className="text-[#f9364d]"
								>
									Seth
								</motion.span>
								<motion.span
									key={`seth-comma`}
									custom={i}
									variants={typingVariants}
									initial="hidden"
									animate="visible"
									className="text-zinc-50"
								>
									,
								</motion.span>
							</span>
						);
					}
					return (
						<motion.span
							key={key}
							custom={i}
							variants={typingVariants}
							initial="hidden"
							animate="visible"
							className="mr-1 md:mr-2"
						>
							{word}
						</motion.span>
					);
				})}

				<br />
				{secondLine.map((word, i) => (
					<motion.span
						key={`second-line-word-${i}`}
						custom={i + firstLine.length}
						variants={typingVariants}
						initial="hidden"
						animate="visible"
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
					className="mt-4 text-xs text-zinc-400 md:text-base mb-12 max-w-sm mx-auto md:max-w-lg"
					variants={itemVariants}
				>
					I&apos;m a Computer Science student based in the Philippines,
					specializing in React for web development. I&apos;m also a proud cat
					owner.
				</motion.p>

				<div className="mt-8 flex justify-center items-center">
					<motion.a
						whileTap={{ scale: 0.85 }}
						whileHover={{ scale: 1.1 }}
						transformTemplate={(props, transform) =>
							transform.replace(" translateZ(0)", "")
						}
						variants={itemVariants}
						layout="position"
						href="/portfolio/assets/seth_cv.pdf"
						download
						className="inline-flex items-center gap-1 bg-[#f9364d] text-zinc-50 px-6 h-12 rounded-full"
						aria-label="Download resume"
					>
						<span className="font-semibold text-base leading-none">
							Get Resume
						</span>
						<span className="material-symbols-rounded text-lg leading-none align-middle">
							download
						</span>
					</motion.a>
				</div>
			</motion.div>

			<motion.div
				className="absolute bottom-20"
				variants={arrowVariants}
				initial="hidden"
				animate={showArrow ? "visible" : "hidden"}
				role="img"
				aria-label="Scroll down indicator"
			>
				<span className="material-symbols-rounded md:text-3xl text-2xl text-zinc-400">
					arrow_downward
				</span>
			</motion.div>
		</main>
	);
};

export default Hero;
