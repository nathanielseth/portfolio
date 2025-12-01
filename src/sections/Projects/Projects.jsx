import { useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import ProjectModal from "./ProjectModal.jsx";
import projects from "../../utils/data/projectsData.jsx";

const Projects = () => {
	const [selectedProject, setSelectedProject] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

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
			<div className="flex flex-col justify-center md:h-screen max-w-5xl mx-auto">
				<h2 className="text-center font-medium text-2xl md:text-3xl mb-10">
					Personal Projects
				</h2>

				<div className="grid gap-x-3 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] justify-items-center">
					{projects.map((project, key) => (
						<div key={key}>
							<ProjectCard
								imgSrc={project.imgSrc}
								title={project.title}
								description={project.description}
								tags={project.tags}
								projectLink={project.projectLink}
								codeLink={project.codeLink}
								index={key}
								onCardClick={() => handleProjectClick(project)}
							/>
						</div>
					))}
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
