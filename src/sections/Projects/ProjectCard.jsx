import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { IoGlobeOutline, IoLogoGithub } from "react-icons/io5";
import { useState } from "react";

const defaultTagColor = "bg-zinc-800 text-zinc-50";
const getTagColor = () => defaultTagColor;

const tooltipVariants = {
	visible: { opacity: 1, y: 0 },
	hidden: { opacity: 0, y: -5, transition: { duration: 0.3 } },
};

const ProjectCard = ({
	imgSrc,
	title,
	description,
	tags,
	projectLink,
	codeLink,
	index,
	classes,
	onCardClick,
	disableInitialAnimation = false,
	onAnimationComplete,
}) => {
	const [hoveredTagIndex, setHoveredTagIndex] = useState(null);
	const [hoveredLive, setHoveredLive] = useState(false);
	const [hoveredCode, setHoveredCode] = useState(false);
	const [animationDelay, setAnimationDelay] = useState(
		disableInitialAnimation ? 0 : index * 0.15
	);

	const handleMouseEnter = (tagIndex) => {
		setHoveredTagIndex(tagIndex);
	};

	const handleMouseLeave = () => {
		setHoveredTagIndex(null);
		setHoveredLive(false);
		setHoveredCode(false);
	};

	const variants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
				ease: "easeOut",
				delay: animationDelay,
			},
		},
	};

	const handleAnimationComplete = () => {
		setAnimationDelay(0);
		onAnimationComplete?.();
	};

	return (
		<motion.div
			initial={disableInitialAnimation ? "visible" : "hidden"}
			whileInView="visible"
			viewport={{ once: true }}
			variants={variants}
			onAnimationComplete={handleAnimationComplete}
			whileHover={{
				y: -7,
				transition: {
					type: "spring",
					stiffness: 600,
					damping: 15,
					mass: 0.5,
				},
			}}
			className={`relative flex flex-col p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-900 hover:ring-1 hover:ring-zinc-700 transition-colors ${classes} max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto min-h-[450px] z-10`}
		>
			<figure
				className="img-box aspect-square rounded-lg mb-3 flex-grow cursor-pointer"
				onClick={onCardClick}
			>
				<img
					src={imgSrc}
					alt={title}
					loading="lazy"
					decoding="async"
					width="600"
					height="400"
					className="w-full h-full object-cover rounded-lg"
				/>
			</figure>

			<div className="flex-grow flex flex-col justify-between">
				<div>
					<h3
						className="title-1 cursor-pointer hover:text-accent transition-colors"
						onClick={onCardClick}
					>
						{title}
					</h3>
					<p className="text-sm text-zinc-400 mb-4">{description}</p>
					<div className="flex flex-wrap items-center gap-1">
						{tags &&
							tags.length > 0 &&
							tags.map((tag, tagIndex) => (
								<div
									key={tagIndex}
									className="relative group"
									onMouseEnter={() => handleMouseEnter(tagIndex)}
									onMouseLeave={handleMouseLeave}
								>
									<span
										className={`h-8 w-8 text-xs md:text-sm flex items-center gap-1 px-1.5 rounded-lg border border-zinc-700 ${getTagColor(
											tag
										)}`}
									>
										{tag.label}
									</span>
									<motion.div
										className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-[100] pointer-events-none"
										animate={
											hoveredTagIndex === tagIndex ? "visible" : "hidden"
										}
										initial="hidden"
										variants={tooltipVariants}
										style={{ translateX: "-50%" }}
									>
										<div className="relative p-2 text-sm leading-none text-zinc-50 whitespace-no-wrap bg-zinc-900 rounded-md shadow-lg">
											{tag.tagName}
										</div>
										<div className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-3 h-3 bg-zinc-900 rotate-45"></div>
									</motion.div>
								</div>
							))}
					</div>
				</div>

				<div className="absolute bottom-4 right-4 flex space-x-2 z-10">
					{codeLink && (
						<div className="relative group">
							<motion.a
								href={codeLink}
								target="_blank"
								rel="noopener noreferrer"
								onClick={(e) => e.stopPropagation()}
								className="flex items-center justify-center w-11 h-11 rounded-lg bg-zinc-50 text-zinc-950"
								aria-label={`View code for project: ${title}`}
								whileHover={{ scale: 1.05 }}
								onMouseEnter={() => setHoveredCode(true)}
								onMouseLeave={() => setHoveredCode(false)}
							>
								<IoLogoGithub className="w-8 h-8" aria-hidden="true" />
							</motion.a>
							<motion.div
								className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-[100] pointer-events-none"
								animate={hoveredCode ? "visible" : "hidden"}
								initial="hidden"
								variants={tooltipVariants}
								style={{ translateX: "-50%" }}
							>
								<div className="relative p-2 text-sm leading-none text-zinc-50 whitespace-no-wrap bg-zinc-900 rounded-md shadow-lg">
									<span className="whitespace-nowrap">View Code</span>
								</div>
								<div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-3 h-3 bg-zinc-900 rotate-45"></div>
							</motion.div>
						</div>
					)}
					{projectLink && (
						<div className="relative group">
							<motion.a
								href={projectLink}
								target="_blank"
								rel="noopener noreferrer"
								onClick={(e) => e.stopPropagation()}
								className="flex items-center justify-center w-11 h-11 rounded-lg accent-bg text-zinc-50"
								aria-label={`View live project: ${title}`}
								whileHover={{ scale: 1.1 }}
								onMouseEnter={() => setHoveredLive(true)}
								onMouseLeave={() => setHoveredLive(false)}
							>
								<IoGlobeOutline className="w-8 h-8" aria-hidden="true" />
							</motion.a>
							<motion.div
								className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-[100] pointer-events-none"
								animate={hoveredLive ? "visible" : "hidden"}
								initial="hidden"
								variants={tooltipVariants}
								style={{ translateX: "-50%" }}
							>
								<div className="relative p-2 text-sm leading-none text-zinc-50 whitespace-no-wrap bg-zinc-900 rounded-md shadow-lg">
									<span className="whitespace-nowrap">Live Demo</span>
								</div>
								<div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-3 h-3 bg-zinc-900 rotate-45"></div>
							</motion.div>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
};

ProjectCard.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	tags: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			tagName: PropTypes.string.isRequired,
		})
	).isRequired,
	projectLink: PropTypes.string,
	codeLink: PropTypes.string,
	classes: PropTypes.string,
	index: PropTypes.number.isRequired,
	onCardClick: PropTypes.func.isRequired,
	disableInitialAnimation: PropTypes.bool,
	onAnimationComplete: PropTypes.func,
};

export default ProjectCard;
