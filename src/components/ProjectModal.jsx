import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { IoGlobeOutline, IoLogoGithub, IoClose, IoPlay } from "react-icons/io5";
import { useEffect, useState } from "react";

const modalVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.2 } },
	exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalContentVariants = {
	hidden: { opacity: 0, scale: 0.95, y: 20 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { type: "spring", damping: 25, stiffness: 300 },
	},
	exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

const spinnerVariants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
	exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

const getYouTubeId = (url) => {
	if (!url) return null;
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);
	return match && match[2].length === 11 ? match[2] : null;
};

const ProjectModal = ({ isOpen, onClose, project }) => {
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);
	const [isLoadingVideo, setIsLoadingVideo] = useState(false);
	const [iframeReady, setIframeReady] = useState(false);

	useEffect(() => {
		if (!isOpen) {
			setIsVideoLoaded(false);
			setIsLoadingVideo(false);
			setIframeReady(false);
		}
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	const handlePlayClick = () => {
		if (hasVideo) {
			setIsLoadingVideo(true);
			setIsVideoLoaded(true);
		}
	};

	const handleIframeLoad = () => {
		setIframeReady(true);
		setIsLoadingVideo(false);
	};

	if (!project) return null;

	const videoId = getYouTubeId(project.videoUrl);
	const hasVideo = !!videoId;
	const showSpinner = isLoadingVideo && !iframeReady;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					variants={modalVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
					onClick={onClose}
					onWheel={(e) => e.stopPropagation()}
				>
					<motion.div
						variants={modalContentVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={(e) => e.stopPropagation()}
						onWheel={(e) => e.stopPropagation()}
						className="relative w-full max-w-5xl max-h-[90vh] bg-zinc-900/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-zinc-800"
					>
						<button
							onClick={onClose}
							className="absolute top-4 right-4 z-50 bg-zinc-900/90 backdrop-blur-md hover:bg-zinc-800 transition-colors p-2 rounded-full border border-zinc-700"
							aria-label="Close modal"
						>
							<IoClose className="w-6 h-6 text-zinc-50" />
						</button>

						<div className="overflow-y-auto max-h-[90vh] scrollbar-thin">
							<div className="relative w-full aspect-video bg-black overflow-hidden">
								{hasVideo && isVideoLoaded ? (
									<>
										<iframe
											src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
											title={`${project.title} demo video`}
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
											allowFullScreen
											onLoad={handleIframeLoad}
											className="absolute inset-0 w-full h-full"
											style={{ opacity: iframeReady ? 1 : 0 }}
										/>
										<AnimatePresence>
											{showSpinner && (
												<motion.div
													variants={spinnerVariants}
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
												</motion.div>
											)}
										</AnimatePresence>
									</>
								) : (
									<div
										className={`relative w-full h-full ${
											hasVideo ? "cursor-pointer group" : ""
										}`}
										onClick={handlePlayClick}
									>
										<div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/20 to-zinc-900 z-10 pointer-events-none" />

										<img
											src={project.imgSrc}
											alt={project.title}
											className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-200"
										/>

										{hasVideo && (
											<div className="absolute inset-0 flex items-center justify-center z-20">
												<div className="accent-bg rounded-full p-4 group-hover:scale-110 transition-all duration-300">
													<IoPlay className="w-10 h-10 text-white pl-1" />
												</div>
											</div>
										)}
									</div>
								)}
							</div>

							<div className="p-6 sm:p-8 space-y-6">
								<div>
									<h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 mb-3">
										{project.title}
									</h2>
									<p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
										{project.fullDescription || project.description}
									</p>
								</div>

								<div>
									<h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
										Built With
									</h3>
									<div className="flex flex-wrap items-center justify-between gap-4">
										<div className="flex flex-wrap gap-2">
											{project.tags.map((tag, index) => (
												<span
													key={index}
													className="px-3 py-1.5 bg-zinc-800/60 border border-zinc-700/50 text-zinc-300 rounded-lg text-sm font-medium"
												>
													{tag.tagName}
												</span>
											))}
										</div>

										<div className="flex flex-wrap gap-3">
											{project.projectLink ? (
												<a
													href={project.projectLink}
													target="_blank"
													rel="noopener noreferrer"
													className="accent-bg flex items-center gap-2 px-5 py-2.5 rounded-xl text-zinc-50 font-semibold hover:scale-105 transition-transform duration-150"
												>
													<IoGlobeOutline className="w-5 h-5" />
													<span>Live Demo</span>
												</a>
											) : (
												<div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 font-semibold">
													<span>In Development</span>
												</div>
											)}
											{project.codeLink && (
												<a
													href={project.codeLink}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-50 text-zinc-950 font-semibold hover:scale-105 transition-transform duration-150"
												>
													<IoLogoGithub className="w-5 h-5" />
													<span>Source Code</span>
												</a>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

ProjectModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	project: PropTypes.shape({
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		fullDescription: PropTypes.string,
		tags: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.object,
					PropTypes.element,
				]),
				tagName: PropTypes.string,
			})
		).isRequired,
		projectLink: PropTypes.string,
		codeLink: PropTypes.string,
		videoUrl: PropTypes.string,
	}),
};

export default ProjectModal;
