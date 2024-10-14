import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { IoGlobeOutline, IoLogoGithub } from "react-icons/io5";

const defaultTagColor = "bg-zinc-50/5 text-zinc-400";

const getTagColor = (tag) => tag.color || defaultTagColor;

const ProjectCard = ({
	imgSrc,
	title,
	description,
	tags,
	projectLink,
	codeLink,
	classes,
	onAnimationComplete,
}) => {
	const variants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	const imageLink = projectLink || codeLink;

	return (
		<motion.div
			whileHover={{
				y: -8,
				transition: {
					type: "spring",
					stiffness: 600,
					mass: 0.5,
				},
			}}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			variants={variants}
			transition={{
				duration: 0.25,
				ease: "easeIn",
			}}
			onAnimationComplete={onAnimationComplete}
			className={`relative flex flex-col p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-50/5 transition-colors ${classes} max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto min-h-[450px]`}
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
						loading="lazy"
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
							tags.map((tag, key) => (
								<span
									key={key}
									className={` h-8 w-8 mr-1 text-xs md:text-sm flex items-center gap-1 px-2 rounded-lg ${getTagColor(
										tag
									)}`}
								>
									{tag.label}
								</span>
							))}
					</div>
				</div>

				<div className="absolute bottom-4 right-4 flex space-x-2 z-10">
					{projectLink && (
						<a
							href={projectLink}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#7f2ffa] text-zinc-50 transition-colors"
							aria-label={`View live project: ${title}`}
						>
							<IoGlobeOutline className="w-8 h-8" aria-hidden="true" />
						</a>
					)}
					{codeLink && (
						<a
							href={codeLink}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center w-11 h-11 rounded-lg bg-zinc-50 text-zinc-950 transition-colors"
							aria-label={`View code for project: ${title}`}
						>
							<IoLogoGithub className="w-8 h-8" aria-hidden="true" />{" "}
						</a>
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
	codeLink: PropTypes.string.isRequired,
	classes: PropTypes.string,
	onAnimationComplete: PropTypes.func.isRequired,
};

export default ProjectCard;
