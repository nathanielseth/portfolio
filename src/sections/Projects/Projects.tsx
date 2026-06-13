import { useReducer, useEffect } from "react";
import { m, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import projects from "../../data/projects";
import type { Project } from "../../types";

const ITEMS_PER_PAGE = 3;
const MAX_INDEX = projects.length - ITEMS_PER_PAGE;

function getHeaderMargin(width: number): string {
	if (width >= 1024) return "mb-1";
	if (width >= 768) return "mb-8";
	return "mb-10";
}

// single reducer groups related state: modal, carousel, layout
type State = {
	selectedProject: Project | null;
	isModalOpen: boolean;
	currentIndex: number;
	showAll: boolean;
	isMobile: boolean;
	headerMargin: string;
};

type Action =
	| { type: "OPEN_MODAL"; project: Project }
	| { type: "CLOSE_MODAL" }
	| { type: "CLEAR_PROJECT" }
	| { type: "GO_PREV" }
	| { type: "GO_NEXT" }
	| { type: "GO_TO_INDEX"; index: number }
	| { type: "SHOW_ALL" }
	| { type: "LAYOUT_CHANGED"; width: number };

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "OPEN_MODAL":
			return { ...state, selectedProject: action.project, isModalOpen: true };

		case "CLOSE_MODAL":
			// keep project during close animation, cleared after 200ms
			return { ...state, isModalOpen: false };

		case "CLEAR_PROJECT":
			return { ...state, selectedProject: null };

		case "GO_PREV":
			return state.currentIndex > 0
				? { ...state, currentIndex: state.currentIndex - 1 }
				: state;

		case "GO_NEXT":
			return state.currentIndex < MAX_INDEX
				? { ...state, currentIndex: state.currentIndex + 1 }
				: state;

		case "GO_TO_INDEX":
			return { ...state, currentIndex: action.index };

		case "SHOW_ALL":
			return { ...state, showAll: true };

		case "LAYOUT_CHANGED": {
			const isMobile = action.width < 768;
			const headerMargin = getHeaderMargin(action.width);
			return { ...state, isMobile, headerMargin };
		}

		default:
			return state;
	}
}

// seed layout from window on init, skip mount effect
const initialState: State = {
	selectedProject: null,
	isModalOpen: false,
	currentIndex: 0,
	showAll: false,
	isMobile: window.innerWidth < 768,
	headerMargin: getHeaderMargin(window.innerWidth),
};

export default function Projects() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const {
		selectedProject,
		isModalOpen,
		currentIndex,
		showAll,
		isMobile,
		headerMargin,
	} = state;
	const prefersReduced = useReducedMotion();

	useEffect(() => {
		const updateLayout = () => {
			dispatch({ type: "LAYOUT_CHANGED", width: window.innerWidth });
		};
		window.addEventListener("resize", updateLayout);
		return () => window.removeEventListener("resize", updateLayout);
	}, []);

	const canGoPrev = currentIndex > 0;
	const canGoNext = currentIndex < MAX_INDEX;

	const handleProjectClick = (project: Project) => {
		dispatch({ type: "OPEN_MODAL", project });
	};

	const handleCloseModal = () => {
		dispatch({ type: "CLOSE_MODAL" });
		setTimeout(() => dispatch({ type: "CLEAR_PROJECT" }), 200);
	};

	const visibleMobileProjects = showAll
		? projects
		: projects.slice(0, isMobile ? 3 : 4);

	return (
		<>
			<div className="flex flex-col justify-center min-h-screen py-20 max-w-5xl mx-auto px-4">
				<div className={`flex items-center ${headerMargin}`}>
					<div className="hidden lg:block w-22" />
					<h2 className="text-center font-medium text-2xl md:text-3xl flex-1 text-zinc-900 dark:text-zinc-200">
						Personal Projects
					</h2>

					<div className="hidden lg:flex items-center gap-2">
						<m.button
							type="button"
							onClick={() => dispatch({ type: "GO_PREV" })}
							disabled={!canGoPrev}
							className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-50 border border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 disabled:opacity-30 disabled:hover:bg-zinc-200 dark:disabled:hover:bg-zinc-900"
							whileHover={canGoPrev && !prefersReduced ? { scale: 1.05 } : {}}
							whileTap={canGoPrev && !prefersReduced ? { scale: 0.95 } : {}}
							aria-label="Previous projects"
						>
							<ChevronLeft className="w-5 h-5" />
						</m.button>
						<m.button
							type="button"
							onClick={() => dispatch({ type: "GO_NEXT" })}
							disabled={!canGoNext}
							className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-50 border border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 disabled:opacity-30 disabled:hover:bg-zinc-200 dark:disabled:hover:bg-zinc-900"
							whileHover={canGoNext && !prefersReduced ? { scale: 1.05 } : {}}
							whileTap={canGoNext && !prefersReduced ? { scale: 0.95 } : {}}
							aria-label="Next projects"
						>
							<ChevronRight className="w-5 h-5" />
						</m.button>
					</div>
				</div>

				<div className="hidden lg:block relative">
					<div
						className="flex gap-4 overflow-hidden"
						style={{ margin: "0 -1rem", padding: "2rem 1rem" }}
					>
						<m.div
							className="flex gap-4 w-full"
							animate={{
								x: prefersReduced
									? 0
									: `-${currentIndex * (100 / ITEMS_PER_PAGE)}%`,
							}}
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
									<m.div
										key={project.id}
										className="shrink-0"
										style={{ width: "calc(33.333% - 11px)" }}
										animate={{ opacity: isVisible ? 1 : 0 }}
										transition={{
											opacity: { duration: 0.2, ease: "easeInOut" },
										}}
									>
										<ProjectCard
											project={project}
											index={idx}
											onCardClick={() => handleProjectClick(project)}
										/>
									</m.div>
								);
							})}
						</m.div>
					</div>

					<div className="flex justify-center gap-2 mt-6">
						{Array.from({ length: MAX_INDEX + 1 }).map((_, idx) => (
							<m.button
								key={idx}
								type="button"
								onClick={() => dispatch({ type: "GO_TO_INDEX", index: idx })}
								className="relative h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 cursor-pointer"
								animate={{ width: currentIndex === idx ? "32px" : "8px" }}
								transition={{
									type: "spring",
									stiffness: 500,
									damping: 30,
									mass: 0.5,
								}}
								whileHover={prefersReduced ? {} : { scale: 1.2 }}
								whileTap={prefersReduced ? {} : { scale: 0.9 }}
								aria-label={`Go to slide ${idx + 1}`}
							>
								{currentIndex === idx && (
									<m.div
										layoutId="activeIndicator"
										className="absolute inset-0 rounded-full bg-zinc-950 dark:bg-zinc-50"
										transition={{
											type: "spring",
											stiffness: 500,
											damping: 30,
											mass: 0.5,
										}}
									/>
								)}
							</m.button>
						))}
					</div>
				</div>

				<div className="lg:hidden mb-10 md:mb-8">
					<div className="grid gap-x-4 gap-y-6 grid-cols-1 md:grid-cols-2 justify-items-center w-full">
						{visibleMobileProjects.map((project, idx) => (
							<div key={project.id} className="w-full">
								<ProjectCard
									project={project}
									index={idx}
									onCardClick={() => handleProjectClick(project)}
								/>
							</div>
						))}
					</div>

					{!showAll &&
						((isMobile && projects.length > 3) ||
							(!isMobile && projects.length > 4)) && (
							<div className="flex justify-center mt-8">
								<m.button
									type="button"
									onClick={() => dispatch({ type: "SHOW_ALL" })}
									className="px-6 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-50 transition-colors border border-zinc-800 font-medium"
									whileHover={prefersReduced ? {} : { scale: 1.05 }}
									whileTap={prefersReduced ? {} : { scale: 0.95 }}
								>
									Show All Projects
								</m.button>
							</div>
						)}
				</div>
			</div>

			{/* reset modal video state on project change */}
			<ProjectModal
				key={selectedProject?.id ?? "empty"}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				project={selectedProject}
			/>
		</>
	);
}