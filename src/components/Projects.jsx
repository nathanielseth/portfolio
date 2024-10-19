import ProjectCard from "./ProjectCard";
import projects from "../utils/projectsData.jsx";

const Projects = () => {
	return (
		<div className="flex flex-col justify-center md:h-screen max-w-5xl mx-auto">
			<h2 className="text-center font-medium text-2xl md:text-3xl mb-10">
				Personal Projects
			</h2>

			<div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] justify-items-center">
				{projects.map(
					(
						{ imgSrc, title, description, tags, projectLink, codeLink },
						key
					) => (
						<div key={key}>
							<ProjectCard
								imgSrc={imgSrc}
								title={title}
								description={description}
								tags={tags}
								projectLink={projectLink}
								codeLink={codeLink}
								index={key}
							/>
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default Projects;
