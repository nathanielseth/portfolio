import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ProjectCard from "./ProjectCard.jsx";
import ProjectModal from "./ProjectModal.jsx";
import projects from "../../utils/data/projectsData.jsx";

const ITEMS_PER_PAGE = 3;

const Projects = () => {
	const [selectedProject, setSelectedProject] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showAll, setShowAll] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [headerMargin, setHeaderMargin] = useState("mb-1");

	useEffect(() => {
		const updateLayout = () => {
			setIsMobile(window.innerWidth < 768);

			const screenWidth = window.innerWidth;
			if (screenWidth >= 1024) setHeaderMargin("mb-1"); // Desktop - 3 cards
			else if (screenWidth >= 768) setHeaderMargin("mb-8"); // Tablet - 2 cards
			else setHeaderMargin("mb-10"); // Mobile - 1 card
		};

		updateLayout();
		window.addEventListener("resize", updateLayout);
		return () => window.removeEventListener("resize", updateLayout);
	}, []);

	const maxIndex = projects.length - ITEMS_PER_PAGE;
	const canGoPrev = currentIndex > 0;
	const canGoNext = currentIndex < maxIndex;

	const handleNext = () => canGoNext && setCurrentIndex((prev) => prev + 1);
	const handlePrev = () => canGoPrev && setCurrentIndex((prev) => prev - 1);

	const handleProjectClick = (project) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setTimeout(() => setSelectedProject(null), 200);
	};

	return (
		<>
			<div className="flex flex-col justify-center min-h-screen py-20 max-w-5xl mx-auto px-4">
				{/* Header Section */}
				<div className={`flex items-center ${headerMargin}`}>
					<div className="hidden lg:block w-[88px]" />
					<h2 className="text-center font-medium text-2xl md:text-3xl flex-1 text-zinc-200">
						Personal Projects
					</h2>

					{/* Navigation Controls - Desktop only */}
					<div className="hidden lg:flex items-center gap-2">
						<motion.button
							onClick={handlePrev}
							disabled={!canGoPrev}
							className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-50 transition-colors border border-zinc-800 disabled:opacity-30 disabled:hover:bg-zinc-900"
							whileHover={canGoPrev ? { scale: 1.05 } : {}}
							whileTap={canGoPrev ? { scale: 0.95 } : {}}
							aria-label="Previous Project"
						>
							<HiChevronLeft className="text-xl" />
						</motion.button>
						<motion.button
							onClick={handleNext}
							disabled={!canGoNext}
							className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-50 transition-colors border border-zinc-800 disabled:opacity-30 disabled:hover:bg-zinc-900"
							whileHover={canGoNext ? { scale: 1.05 } : {}}
							whileTap={canGoNext ? { scale: 0.95 } : {}}
							aria-label="Next Project"
						>
							<HiChevronRight className="text-xl" />
						</motion.button>
					</div>
				</div>

				{/* Desktop Carousel */}
				<div className="hidden lg:block relative">
					<div
						className="flex gap-4 overflow-hidden"
						style={{ margin: "0 -1rem", padding: "2rem 1rem" }}
					>
						<motion.div
							className="flex gap-4 w-full"
							animate={{ x: `-${currentIndex * (100 / ITEMS_PER_PAGE)}%` }}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 30,
								mass: 0.8,
							}}
						>
							{projects.map((project, idx) => {
								const isVisible =
									idx >= currentIndex && idx < currentIndex + ITEMS_PER_PAGE;

								return (
									<motion.div
										key={idx}
										className="flex-shrink-0"
										style={{ width: "calc(33.333% - 11px)" }}
										animate={{ opacity: isVisible ? 1 : 0 }}
										transition={{
											opacity: {
												duration: 0.2,
												ease: "easeInOut",
											},
										}}
									>
										<ProjectCard
											imgSrc={project.imgSrc}
											title={project.title}
											description={project.description}
											tags={project.tags}
											projectLink={project.projectLink}
											codeLink={project.codeLink}
											index={idx}
											onCardClick={() => handleProjectClick(project)}
											disableInitialAnimation={false}
										/>
									</motion.div>
								);
							})}
						</motion.div>
					</div>

					{/* Carousel Indicators */}
					<div className="flex justify-center gap-2 mt-6">
						{Array.from({ length: maxIndex + 1 }).map((_, idx) => (
							<motion.button
								key={idx}
								onClick={() => setCurrentIndex(idx)}
								className="relative h-1.5 rounded-full bg-zinc-800 cursor-pointer"
								style={{ width: currentIndex === idx ? "32px" : "8px" }}
								animate={{ width: currentIndex === idx ? "32px" : "8px" }}
								transition={{
									type: "spring",
									stiffness: 500,
									damping: 30,
									mass: 0.5,
								}}
								whileHover={{ scale: 1.2 }}
								whileTap={{ scale: 0.9 }}
								aria-label={`Go to slide ${idx + 1}`}
							>
								{currentIndex === idx && (
									<motion.div
										layoutId="activeIndicator"
										className="absolute inset-0 rounded-full bg-zinc-50"
										transition={{
											type: "spring",
											stiffness: 500,
											damping: 30,
											mass: 0.5,
										}}
									/>
								)}
							</motion.button>
						))}
					</div>
				</div>

				{/* Mobile/Tablet Grid */}
				<div className="lg:hidden mb-10 md:mb-8">
					<div className="grid gap-x-4 gap-y-6 grid-cols-1 md:grid-cols-2 justify-items-center w-full">
						{(showAll ? projects : projects.slice(0, isMobile ? 3 : 4)).map(
							(project, idx) => (
								<div key={idx} className="w-full">
									<ProjectCard
										imgSrc={project.imgSrc}
										title={project.title}
										description={project.description}
										tags={project.tags}
										projectLink={project.projectLink}
										codeLink={project.codeLink}
										index={idx}
										onCardClick={() => handleProjectClick(project)}
										disableInitialAnimation={false}
									/>
								</div>
							)
						)}
					</div>

					{/* Show All Button */}
					{!showAll &&
						((isMobile && projects.length > 3) ||
							(!isMobile && projects.length > 4)) && (
							<div className="flex justify-center mt-8">
								<motion.button
									onClick={() => setShowAll(true)}
									className="px-6 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-50 transition-colors border border-zinc-800 font-medium"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Show All Projects
								</motion.button>
							</div>
						)}
				</div>
			</div>

			<ProjectModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				project={selectedProject}
			/>
		</>
	);
};

export default Projects;
