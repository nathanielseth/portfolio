import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { IoGlobeOutline, IoLogoGithub } from "react-icons/io5";
import { useState } from "react";

const defaultTagColor = "bg-zinc-700 text-zinc-50";

const getTagColor = (tag) => defaultTagColor;

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
}) => {
	const [hoveredTagIndex, setHoveredTagIndex] = useState(null);
	const [hoveredLive, setHoveredLive] = useState(false);
	const [hoveredCode, setHoveredCode] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = (index) => {
		setHoveredTagIndex(index);
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setHoveredTagIndex(null);
		setIsHovered(false);
	};

	const variants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
				ease: "easeIn",
				delay: isHovered ? 0 : index * 0.3,
			},
		},
	};

	const imageLink = projectLink || codeLink;

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			variants={variants}
			whileHover={{
				y: -8,
				transition: {
					type: "spring",
					stiffness: 600,
					mass: 0.5,
					duration: 0.1,
				},
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={`relative flex flex-col p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-50/5 hover:ring-2 hover:ring-zinc-700 transition-colors ${classes} max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto min-h-[450px]`}
		>
			<figure className="img-box aspect-square rounded-lg mb-3 flex-grow">
				{imageLink ? (
					<a
						href={imageLink}
						target="_blank"
						rel="noopener noreferrer"
						className="block"
						aria-label={`View project: ${title}`}
					>
						<img
							src={imgSrc}
							alt={title}
							className="w-full h-full object-cover rounded-lg"
						/>
					</a>
				) : (
					<img
						src={imgSrc}
						alt={title}
						className="w-full h-full object-cover rounded-lg"
					/>
				)}
			</figure>

			<div className="flex-grow flex flex-col justify-between">
				<div>
					<h3 className="title-1">{title}</h3>
					<p className="text-sm text-zinc-400 mb-4">{description}</p>
					<div className="flex flex-wrap items-center gap-1">
						{tags &&
							tags.length > 0 &&
							tags.map((tag, index) => (
								<div
									key={index}
									className="relative group"
									onMouseEnter={() => handleMouseEnter(index)}
									onMouseLeave={handleMouseLeave}
								>
									<span
										className={`h-8 w-8 mr-1 text-xs md:text-sm flex items-center gap-1 px-1.5 rounded-lg ${getTagColor(
											tag
										)}`}
									>
										{tag.label}
									</span>
									<motion.div
										className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2"
										animate={hoveredTagIndex === index ? "visible" : "hidden"}
										initial={{ y: 0, x: "-50%" }}
										variants={tooltipVariants}
									>
										<div className="relative z-10 p-2 text-sm leading-none text-zinc-50 whitespace-no-wrap bg-zinc-900 rounded-md shadow-lg">
											{tag.tagName}
										</div>
										<div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-3 h-3 bg-zinc-900 rotate-45"></div>
									</motion.div>
								</div>
							))}
					</div>
				</div>

				<div className="absolute bottom-4 right-4 flex space-x-2 z-10">
					{projectLink && (
						<div className="relative group">
							<motion.a
								href={projectLink}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#7f2ffa] text-zinc-50 transition-colors"
								aria-label={`View live project: ${title}`}
								whileHover={{ scale: 1.1 }}
								onMouseEnter={() => setHoveredLive(true)}
								onMouseLeave={() => setHoveredLive(false)}
							>
								<IoGlobeOutline className="w-8 h-8" aria-hidden="true" />
							</motion.a>
							<motion.div
								className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3"
								animate={hoveredLive ? "visible" : "hidden"}
								initial={{ y: 0, x: "-50%" }}
								variants={tooltipVariants}
							>
								<div className="relative z-10 p-2 text-sm leading-none text-zinc-50 whitespace-no-wrap bg-zinc-900 rounded-md shadow-lg">
									<span className="whitespace-nowrap">Live Demo</span>
								</div>
								<div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-3 h-3 bg-zinc-900 rotate-45"></div>
							</motion.div>
						</div>
					)}
					{codeLink && (
						<div className="relative group">
							<motion.a
								href={codeLink}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center w-11 h-11 rounded-lg bg-zinc-50 text-zinc-950 transition-colors"
								aria-label={`View code for project: ${title}`}
								whileHover={{ scale: 1.05 }}
								onMouseEnter={() => setHoveredCode(true)}
								onMouseLeave={() => setHoveredCode(false)}
							>
								<IoLogoGithub className="w-8 h-8" aria-hidden="true" />
							</motion.a>
							<motion.div
								className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3"
								animate={hoveredCode ? "visible" : "hidden"}
								initial={{ y: 0, x: "-50%" }}
								variants={tooltipVariants}
							>
								<div className="relative z-10 p-2 text-sm leading-none text-zinc-50 whitespace-no-wrap bg-zinc-900 rounded-md shadow-lg">
									<span className="whitespace-nowrap">View Code</span>
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
	tags: PropTypes.array.isRequired,
	projectLink: PropTypes.string,
	codeLink: PropTypes.string,
	classes: PropTypes.string,
	index: PropTypes.number.isRequired,
};

export default ProjectCard;
