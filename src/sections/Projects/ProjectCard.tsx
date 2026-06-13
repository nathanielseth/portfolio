import { memo, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { GithubIcon, TagIcon } from "../../components/Icons";
import Tooltip from "../../components/Tooltip";
import type { Project } from "../../types";

interface ProjectCardProps {
	project: Project;
	index: number;
	onCardClick: () => void;
}

function ProjectCard({ project, index, onCardClick }: ProjectCardProps) {
	const prefersReduced = useReducedMotion();

	const [initialDelay] = useState(() => index * 0.15);
	const [hasAnimated, setHasAnimated] = useState(false);

	const { imgSrc, title, description, tags, codeLink } = project;

	return (
		<m.div
			initial={prefersReduced ? "visible" : "hidden"}
			whileInView="visible"
			viewport={{ once: true }}
			variants={{
				hidden: { opacity: 0, y: 30 },
				visible: {
					opacity: 1,
					y: 0,
					transition: {
						duration: 0.3,
						ease: "easeOut",
						delay: prefersReduced || hasAnimated ? 0 : initialDelay,
					},
				},
			}}
			onAnimationComplete={() => {
				if (!hasAnimated) setHasAnimated(true);
			}}
			whileHover={
				prefersReduced
					? {}
					: {
							y: -7,
							transition: {
								type: "spring",
								stiffness: 600,
								damping: 15,
								mass: 0.5,
							},
						}
			}
			className="relative flex flex-col p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 active:bg-zinc-300/60 dark:active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-300 dark:ring-zinc-800 hover:ring-1 dark:hover:ring-zinc-700 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto min-h-112.5 z-10"
		>
			<button
				type="button"
				className="img-box aspect-square rounded-lg mb-3 grow cursor-pointer overflow-hidden p-0 border-0 bg-transparent w-full"
				onClick={onCardClick}
				aria-label={`Open ${title} project details`}
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
			</button>

			<div className="grow flex flex-col justify-between">
				<div>
					<button
						type="button"
						className="title-1 text-lg font-semibold cursor-pointer text-zinc-900 dark:text-zinc-50 hover:accent-text mb-1 text-left bg-transparent border-0 p-0 w-full"
						onClick={onCardClick}
						tabIndex={-1}
						aria-hidden="true"
					>
						{title}
					</button>
					<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
						{description}
					</p>

					<div className="flex flex-wrap items-center gap-1">
						{tags.map((tag) => (
							<Tooltip key={tag.id} label={tag.label} position="top">
								<span
									className={`h-7 text-xs md:text-sm flex items-center gap-1.5 px-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 ${tag.color}`}
								>
									<TagIcon id={tag.id} className="w-4 h-4" />
								</span>
							</Tooltip>
						))}
					</div>
				</div>

				{codeLink && (
					<div className="absolute bottom-4 right-4 z-10">
						<Tooltip label="View Repository" position="bottom">
							<m.a
								href={codeLink}
								target="_blank"
								rel="noopener noreferrer"
								onClick={(e) => e.stopPropagation()}
								className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-950 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950"
								aria-label={`View code for project: ${title}`}
								whileHover={prefersReduced ? {} : { scale: 1.05 }}
							>
								<GithubIcon className="w-6 h-6" />
							</m.a>
						</Tooltip>
					</div>
				)}
			</div>
		</m.div>
	);
}

export default memo(ProjectCard);