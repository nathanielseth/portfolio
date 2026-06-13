import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowDown, Box, Dices, CodeXml, FileText } from "lucide-react";
import ResumeViewer from "../../components/ResumeViewer";

const HEADING_WORDS = ["Hi,", "I'm", "Nathaniel", "Seth"] as const;

const TAGLINE_ITEMS = [
	{
		Icon: CodeXml,
		text: "I build websites that make me want to keep building.",
	},
	{
		Icon: Box,
		text: "I'm always planning, building, and exploring new stacks.",
	},
	{
		Icon: Dices,
		text: "I enjoy experimenting with mechanics and game logic.",
	},
] as const;

const RESUME_URL = "/portfolio/assets/NathanielSeth_DeLeon_Resume.pdf";
const CYCLE_INTERVAL_MS = 5000;

function scrollToProjects() {
	document
		.getElementById("projects")
		?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
	const prefersReduced = useReducedMotion();

	const [showArrow, setShowArrow] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [activeTagline, setActiveTagline] = useState(0);

	const headingDoneRef = useRef(false);

	useEffect(() => {
		const handler = () => {
			if (headingDoneRef.current) {
				setShowArrow(window.scrollY <= 50);
			}
		};
		window.addEventListener("scroll", handler, { passive: true });
		return () => window.removeEventListener("scroll", handler);
	}, []);

	useEffect(() => {
		if (prefersReduced) return;
		const id = setInterval(() => {
			setActiveTagline((i) => (i + 1) % TAGLINE_ITEMS.length);
		}, CYCLE_INTERVAL_MS);
		return () => clearInterval(id);
	}, [prefersReduced]);

	const handleHeadingComplete = () => {
		headingDoneRef.current = true;
		setShowArrow(true);
	};

	return (
		<>
			<div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
				{/* heading */}
				<h1
					id="hero-heading"
					className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:mb-8 sm:text-5xl md:text-6xl"
				>
					{HEADING_WORDS.map((word, i) => (
						<m.span
							key={word}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={
								prefersReduced
									? { duration: 0 }
									: { duration: 1, delay: i * 0.17 }
							}
							style={word === "Seth" ? { color: "var(--accent)" } : undefined}
							className={word === "Seth" ? undefined : "mr-2 md:mr-3"}
						>
							{word}
						</m.span>
					))}
				</h1>

				{/* taglines + CTA */}
				<m.div
					className="mx-auto flex w-full max-w-2xl flex-col items-center"
					initial="hidden"
					animate="show"
					variants={{
						hidden: {},
						show: {
							transition: {
								staggerChildren: prefersReduced ? 0 : 0.2,
								delayChildren: prefersReduced ? 0 : 0.7,
							},
						},
					}}
					role="region"
					aria-labelledby="hero-heading"
					onAnimationComplete={handleHeadingComplete}
				>
					{/* mobile */}
					<m.div
						variants={{
							hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
							show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
						}}
						className="mb-6 flex h-10 items-center justify-center sm:hidden"
					>
						<AnimatePresence mode="wait">
							<m.div
								key={activeTagline}
								initial={{ opacity: 0, y: 6 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -6 }}
								transition={
									prefersReduced ? { duration: 0 } : { duration: 0.4 }
								}
								className="flex flex-row items-center gap-2"
							>
								{(() => {
									const { Icon, text } = TAGLINE_ITEMS[activeTagline];
									return (
										<>
											<Icon className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
											<p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-400">
												{text}
											</p>
										</>
									);
								})()}
							</m.div>
						</AnimatePresence>
					</m.div>

					{/* desktop */}
					<div className="mb-10 hidden w-full grid-cols-3 gap-y-4 text-left sm:grid">
						{TAGLINE_ITEMS.map(({ Icon, text }) => (
							<m.div
								key={text}
								variants={{
									hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
									show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
								}}
								className="flex flex-row items-start gap-2"
							>
								<Icon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
								<p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-400 md:text-sm">
									{text}
								</p>
							</m.div>
						))}
					</div>

					{/* CTA */}
					<m.div
						variants={{
							hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
							show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
						}}
					>
						<m.button
							type="button"
							onClick={() => setShowModal(true)}
							whileTap={prefersReduced ? {} : { scale: 0.95 }}
							whileHover={prefersReduced ? {} : { scale: 1.05 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
							className="accent-bg inline-flex w-auto cursor-pointer items-center justify-center gap-1 rounded-full px-6 py-2.5 font-medium text-zinc-50 sm:px-7 md:py-3"
							aria-label="View resume"
						>
							<span className="text-sm sm:text-base">View Resume</span>
							<FileText className="w-3 sm:w-4" />
						</m.button>
					</m.div>
				</m.div>

				{/* scroll arrow */}
				<m.button
					type="button"
					className="group absolute bottom-20 cursor-pointer"
					initial={{ opacity: 0, y: 10 }}
					animate={showArrow ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
					transition={
						prefersReduced
							? { duration: 0 }
							: {
									opacity: { duration: 0.4 },
									y: {
										duration: 1.0,
										repeat: Infinity,
										repeatType: "reverse",
										ease: "easeInOut",
									},
								}
					}
					onClick={scrollToProjects}
					whileHover={prefersReduced ? {} : { scale: 1.1 }}
					whileTap={prefersReduced ? {} : { scale: 0.9 }}
					aria-label="Scroll to projects"
				>
					<ArrowDown className="text-xl text-zinc-500 transition-colors group-hover:text-zinc-700 dark:text-zinc-500 dark:group-hover:text-zinc-300 md:text-2xl" />
				</m.button>
			</div>

			<ResumeViewer
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				pdfUrl={RESUME_URL}
				title="Resume"
			/>
		</>
	);
}