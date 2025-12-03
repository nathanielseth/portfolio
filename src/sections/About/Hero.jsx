import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	HiTerminal,
	HiCube,
	HiPuzzle,
	HiDocumentText,
	HiArrowDown,
} from "react-icons/hi";
import PDFModal from "../../components/ResumeViewer";

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
			delayChildren: 0.7,
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

const Hero = () => {
	const [showArrow, setShowArrow] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const headingLine1 = ["Hi,", "I'm", "Nathaniel", "Seth"];

	const taglineItems = [
		{
			icon: HiTerminal,
			text: "I create clean, user-focused web apps with practical code.",
		},
		{
			icon: HiCube,
			text: "I'm always planning, building, and exploring new stacks.",
		},
		{
			icon: HiPuzzle,
			text: "I enjoy experimenting with mechanics and game logic.",
		},
	];

	const handleAnimationComplete = () => {
		setShowArrow(true);
	};

	const handleScroll = () => {
		setShowArrow(window.scrollY <= 50);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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
					className="mb-4 text-3xl font-bold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl sm:mb-10"
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
					onAnimationComplete={handleAnimationComplete}
				>
					<div className="mb-6 grid grid-cols-1 justify-items-center gap-y-4 text-left sm:grid-cols-3 sm:justify-center sm:px-0 sm:mb-10">
						{taglineItems.map((item, index) => {
							const IconComponent = item.icon;
							return (
								<motion.div
									key={index}
									variants={itemVariants}
									className={`flex flex-row gap-2 ${
										index > 0 ? "hidden sm:flex" : ""
									}`}
								>
									<IconComponent className="shrink-0 text-lg leading-none text-zinc-400 hidden sm:inline" />
									<p className="text-xs leading-relaxed text-zinc-400 md:text-sm">
										{item.text}
									</p>
								</motion.div>
							);
						})}
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
							<HiDocumentText className="flex items-center text-sm sm:text-base md:text-lg" />
						</motion.button>
					</motion.div>
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
					<HiArrowDown className="text-xl text-zinc-500 transition-colors duration-200 group-hover:text-zinc-300 md:text-2xl" />
				</motion.button>
			</main>

			<PDFModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				pdfUrl="/portfolio/assets/NathanielSeth_DeLeon_Resume.pdf"
				title="Resume"
			/>
		</>
	);
};

export default Hero;
