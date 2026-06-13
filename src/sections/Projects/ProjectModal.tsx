import { useCallback, memo, useState, useEffect, useEffectEvent } from "react";
import { m, AnimatePresence } from "motion/react";
import { X, Globe, Play } from "lucide-react";
import { GithubIcon } from "../../components/Icons";
import { useScrollLock } from "../../hooks/useScrollLock";
import { getYouTubeId, buildYouTubeEmbedUrl } from "../../utils/youtube";
import type { Project } from "../../types";

const BACKDROP_VARIANTS = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.15 } },
	exit: { opacity: 0, transition: { duration: 0.15 } },
};

const PANEL_VARIANTS = {
	hidden: { opacity: 0, y: 16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring" as const,
			damping: 30,
			stiffness: 400,
			mass: 0.8,
		},
	},
	exit: { opacity: 0, y: 16, transition: { duration: 0.15 } },
};

const SPINNER_VARIANTS = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
	exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

interface ProjectModalProps {
	isOpen: boolean;
	onClose: () => void;
	project: Project | null;
}

function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);
	const [isLoadingVideo, setIsLoadingVideo] = useState(false);
	const [iframeReady, setIframeReady] = useState(false);

	useScrollLock(isOpen);

	// stable escape handler
	const handleKeyDown = useEffectEvent((e: KeyboardEvent) => {
		if (e.key === "Escape") onClose();
	});

	useEffect(() => {
		if (!isOpen) return;
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen]);

	const stopPropagation = useCallback(
		(e: React.SyntheticEvent) => e.stopPropagation(),
		[],
	);

	if (!project) return null;

	const videoId = getYouTubeId(project.videoUrl);
	const hasVideo = !!videoId;
	const showSpinner = isLoadingVideo && !iframeReady;

	const handlePlayClick = () => {
		if (hasVideo) {
			setIsLoadingVideo(true);
			setIsVideoLoaded(true);
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<m.div
					variants={BACKDROP_VARIANTS}
					initial="hidden"
					animate="visible"
					exit="exit"
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 dark:bg-black/90 p-4"
					onClick={onClose}
					onWheel={stopPropagation}
				>
					<m.div
						variants={PANEL_VARIANTS}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={stopPropagation}
						onWheel={stopPropagation}
						style={{ willChange: "transform" }}
						className="relative w-full max-w-4xl max-h-[90vh] bg-white/95 dark:bg-zinc-900/95 rounded-3xl shadow-2xl overflow-hidden dark:border dark:border-zinc-800"
					>
						<button
							type="button"
							onClick={onClose}
							className="absolute top-4 right-4 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors p-2 rounded-full border border-zinc-300 dark:border-zinc-700 cursor-pointer"
							aria-label="Close modal"
						>
							<X className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
						</button>

						<div className="overflow-y-auto max-h-[90vh] scrollbar-thin">
							<div
								className="relative w-full aspect-video bg-black overflow-hidden block"
								style={{ lineHeight: 0, fontSize: 0 }}
							>
								{hasVideo && isVideoLoaded ? (
									<>
										<iframe
											src={buildYouTubeEmbedUrl(videoId)}
											title={`${project.title} demo video`}
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
											allowFullScreen
											sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
											onLoad={() => {
												setIframeReady(true);
												setIsLoadingVideo(false);
											}}
											className="absolute inset-0 w-full h-full"
											style={{ opacity: iframeReady ? 1 : 0 }}
										/>
										<AnimatePresence>
											{showSpinner && (
												<m.div
													variants={SPINNER_VARIANTS}
													initial="hidden"
													animate="visible"
													exit="exit"
													className="absolute inset-0 flex items-center justify-center bg-black z-20"
												>
													<div
														className="w-16 h-16 border-[5px] border-transparent rounded-full animate-spin"
														style={{
															borderTopColor: "#dddddd",
															borderRightColor: "#dddddd",
														}}
													/>
												</m.div>
											)}
										</AnimatePresence>
									</>
								) : (
									<div
										className={`relative w-full h-full ${hasVideo ? "cursor-pointer group" : ""}`}
										onClick={handlePlayClick}
										onKeyDown={
											hasVideo
												? (e) => {
														if (e.key === "Enter" || e.key === " ") {
															e.preventDefault();
															handlePlayClick();
														}
													}
												: undefined
										}
										role={hasVideo ? "button" : undefined}
										tabIndex={hasVideo ? 0 : undefined}
										aria-label={
											hasVideo ? `Play ${project.title} demo video` : undefined
										}
										style={{ display: "block", lineHeight: 0, fontSize: 0 }}
									>
										<div className="absolute inset-0 bg-linear-to-b from-transparent via-zinc-900/20 to-zinc-900 z-10 pointer-events-none" />
										<img
											src={project.imgSrc}
											alt={project.title}
											className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-200"
											style={{ display: "block", verticalAlign: "bottom" }}
										/>
										{hasVideo && (
											<div className="absolute inset-0 flex items-center justify-center z-20">
												<div className="accent-bg rounded-full p-4 group-hover:scale-110 transition-all duration-300">
													<Play className="w-10 h-10 text-white pl-1" />
												</div>
											</div>
										)}
									</div>
								)}
							</div>

							<div className="p-6 sm:p-8 space-y-6">
								<div>
									<h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
										{project.title}
									</h2>
									<p className="text-zinc-700 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
										{project.fullDescription || project.description}
									</p>
								</div>

								<div>
									<h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
										Built With
									</h3>
									<div className="flex flex-wrap items-center justify-between gap-4">
										<div className="flex flex-wrap gap-2">
											{project.tags.map((tag) => (
												<span
													key={tag.id}
													className="px-3 py-1.5 bg-zinc-200/60 dark:bg-zinc-800/60 border border-zinc-300/50 dark:border-zinc-700/50 text-zinc-800 dark:text-zinc-300 rounded-lg text-sm font-medium"
												>
													{tag.label}
												</span>
											))}
										</div>

										<div className="flex flex-wrap gap-3">
											{project.codeLink && (
												<a
													href={project.codeLink}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950 font-semibold hover:scale-105 transition-transform duration-150"
												>
													<GithubIcon className="w-5 h-5" />
													<span>Source Code</span>
												</a>
											)}
											{project.projectLink ? (
												<a
													href={project.projectLink}
													target="_blank"
													rel="noopener noreferrer"
													className="accent-bg flex items-center gap-2 px-5 py-2.5 rounded-xl text-zinc-50 font-semibold hover:scale-105 transition-transform duration-150"
												>
													<Globe className="w-5 h-5" />
													<span>Live Demo</span>
												</a>
											) : (
												<div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-300/50 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400 font-semibold">
													<span>In Development</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</m.div>
				</m.div>
			)}
		</AnimatePresence>
	);
}

export default memo(ProjectModal);