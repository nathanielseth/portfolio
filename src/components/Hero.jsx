import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
			staggerChildren: 0.2,
			delayChildren: 0.8,
		},
	},
};

const buttonVariants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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

const modalVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.2 },
	},
	exit: {
		opacity: 0,
		transition: { duration: 0.2 },
	},
};

const modalContentVariants = {
	hidden: { opacity: 0, scale: 0.95, y: 20 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			type: "spring",
			damping: 25,
			stiffness: 300,
		},
	},
	exit: {
		opacity: 0,
		scale: 0.95,
		y: 20,
		transition: { duration: 0.2 },
	},
};

const Hero = () => {
	const [showArrow, setShowArrow] = useState(false);
	const [isInitialAnimationComplete, setInitialAnimationComplete] =
		useState(false);
	const [showModal, setShowModal] = useState(false);
	const [lastModified, setLastModified] = useState("");

	const headingLine1 = ["Hi,", "I'm", "Nathaniel", "Seth"];

	const taglineItems = [
		{
			icon: "terminal",
			text: "I create reliable, user-focused web apps with practical code.",
		},
		{
			icon: "architecture",
			text: "I'm always planning, building, and exploring new stacks.",
		},
		{
			icon: "sports_esports",
			text: "I enjoy experimenting with mechanics and game logic.",
		},
	];

	useEffect(() => {
		const handleScroll = () => {
			const shouldBeVisible =
				isInitialAnimationComplete && window.scrollY <= 50;
			setShowArrow(shouldBeVisible);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isInitialAnimationComplete]);

	useEffect(() => {
		if (showModal) {
			document.body.style.overflow = "hidden";

			fetch("/portfolio/assets/NathanielSeth_DeLeon_Resume.pdf", {
				method: "HEAD",
			})
				.then((response) => {
					const lastMod = response.headers.get("Last-Modified");
					if (lastMod) {
						const date = new Date(lastMod);
						const months = [
							"Jan",
							"Feb",
							"Mar",
							"Apr",
							"May",
							"Jun",
							"Jul",
							"Aug",
							"Sep",
							"Oct",
							"Nov",
							"Dec",
						];
						const formatted = `${
							months[date.getMonth()]
						} ${date.getFullYear()}`;
						setLastModified(formatted);
					}
				})
				.catch(() => setLastModified(""));
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [showModal]);

	const scrollToProjects = () => {
		document.getElementById("projects")?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	return (
		<>
			<main className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
				<motion.h1
					id="hero-heading"
					className="mb-8 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl sm:mb-12"
				>
					{headingLine1.map((word, i) => (
						<motion.span
							key={`line1-word-${i}`}
							custom={i}
							variants={typingVariants}
							initial="hidden"
							animate="visible"
							style={word === "Seth" ? { color: "var(--accent)" } : {}}
							className={word === "Seth" ? "" : "mr-2 md:mr-3"}
						>
							{word}
						</motion.span>
					))}
					<motion.span
						custom={headingLine1.length}
						variants={typingVariants}
						initial="hidden"
						animate="visible"
						className="text-zinc-50"
					>
						.
					</motion.span>
				</motion.h1>

				<motion.div
					className="mx-auto flex w-full max-w-2xl flex-col items-center"
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
					<div className="mb-10 grid grid-cols-1 justify-items-center gap-y-4 text-left sm:grid-cols-3 sm:justify-center sm:px-0 sm:mb-12">
						{taglineItems.map((item, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								className="flex flex-row gap-2"
							>
								<span className="material-symbols-rounded shrink-0 text-lg leading-none text-zinc-400">
									{item.icon}
								</span>
								<p className="text-xs leading-relaxed text-zinc-400 sm:text-sm">
									{item.text}
								</p>
							</motion.div>
						))}
					</div>

					<motion.div variants={buttonVariants}>
						<motion.button
							onClick={() => setShowModal(true)}
							whileTap={{ scale: 0.95 }}
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
							transformTemplate={(_, generated) => `translateZ(0) ${generated}`}
							style={{ willChange: "transform" }}
							className="accent-bg inline-flex w-auto items-center justify-center gap-1 rounded-full px-6 py-2.5 text-zinc-50 sm:px-7 sm:py-2.5 md:px-7 md:py-3"
							aria-label="View resume"
						>
							<span className="text-sm font-semibold sm:text-base">
								View Resume
							</span>
							<span className="material-symbols-rounded flex items-center text-sm sm:text-base md:text-lg">
								description
							</span>
						</motion.button>
					</motion.div>
				</motion.div>

				<motion.button
					className="group absolute bottom-10 cursor-pointer"
					variants={arrowVariants}
					initial="hidden"
					animate={showArrow ? "visible" : "hidden"}
					onClick={scrollToProjects}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					aria-label="Scroll to projects section"
				>
					<span className="material-symbols-rounded text-xl text-zinc-500 transition-colors duration-200 group-hover:text-zinc-300 md:text-2xl">
						arrow_downward
					</span>
				</motion.button>
			</main>

			{/* PDF Modal */}
			<AnimatePresence>
				{showModal && (
					<motion.div
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4"
						onClick={() => setShowModal(false)}
					>
						<motion.div
							variants={modalContentVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							onClick={(e) => e.stopPropagation()}
							className="relative w-full max-w-6xl h-[85vh] sm:h-[90vh] bg-zinc-900 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
						>
							<div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-zinc-800/50 border-b border-zinc-700">
								<div className="flex items-center gap-2 sm:gap-3">
									<span className="material-symbols-rounded text-zinc-400 text-xl sm:text-2xl flex items-center">
										description
									</span>
									<div className="flex flex-col items-start">
										<h2 className="text-base sm:text-lg font-semibold text-zinc-50">
											Resume
										</h2>
										{lastModified && (
											<p className="text-xs text-zinc-500">
												Updated {lastModified}
											</p>
										)}
									</div>
								</div>
								<button
									onClick={() => setShowModal(false)}
									className="text-zinc-400 hover:text-zinc-50 transition-colors p-1.5 sm:p-2 hover:bg-zinc-700 rounded-lg"
									aria-label="Close modal"
								>
									<span className="material-symbols-rounded text-xl sm:text-2xl">
										close
									</span>
								</button>
							</div>

							<div className="flex-1 overflow-auto bg-zinc-800/50">
								<iframe
									src="/portfolio/assets/NathanielSeth_DeLeon_Resume.pdf#view=FitH"
									className="w-full h-full min-h-[500px] sm:min-h-[600px]"
									title="Resume PDF"
								/>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Hero;
