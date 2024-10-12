import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ProjectCard = ({ imgSrc, title, tags, projectLink, classes }) => {
	return (
		<motion.div
			whileHover={{ y: -6 }}
			className={
				"relative p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-50/5 transition-colors " +
				classes +
				" max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto"
			}
		>
			<figure className="img-box aspect-square rounded-lg mb-4">
				<img
					src={imgSrc}
					alt={title}
					loading="lazy"
					className="w-full h-full object-cover rounded-lg"
				/>
			</figure>

			<div className="flex items-center justify-between gap-4">
				<div>
					<h3 className="title-1 mb-3">{title}</h3>

					<div className="flex flex-wrap items-center gap-1">
						{tags &&
							tags.length > 0 &&
							tags.map((label, key) => (
								<span
									key={key}
									className="h-8 text-sm text-zinc-400 bg-zinc-50/5 grid items-center px-3 rounded-lg"
								>
									{label}
								</span>
							))}
					</div>
				</div>

				<div className="w-11 h-11 rounded-lg grid place-items-center bg-zinc-50 text-zinc-950 shrink-0">
					<span className="material-symbols-rounded" aria-hidden="true">
						arrow_outward
					</span>
				</div>
			</div>

			<a href={projectLink} target="_blank" className="absolute inset-0"></a>
		</motion.div>
	);
};

ProjectCard.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	tags: PropTypes.array.isRequired,
	projectLink: PropTypes.string,
	classes: PropTypes.string,
};

export default ProjectCard;
