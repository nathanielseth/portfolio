import { useState, useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import projects from "../utils/projectsData.jsx";

const preloadImages = (imageUrls) => {
	imageUrls.forEach((url) => {
		const img = new Image();
		img.src = url;
	});
};

const Projects = () => {
	const [visibleCards, setVisibleCards] = useState(0);
	const imagesLoaded = useRef(false);

	useEffect(() => {
		if (!imagesLoaded.current) {
			const imageUrls = projects.map((project) => project.imgSrc);
			preloadImages(imageUrls);
			imagesLoaded.current = true;
		}
	}, []);

	const handleAnimationComplete = () => {
		setVisibleCards((prev) => prev + 1);
	};

	return (
		<div className="flex flex-col justify-center md:h-screen max-w-5xl mx-auto">
			<h2 className="text-center text-2xl md:text-3xl mb-10">
				Personal Projects
			</h2>

			<div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] justify-items-center">
				{projects
					.slice(0, visibleCards + 1)
					.map(
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
									onAnimationComplete={handleAnimationComplete}
								/>
							</div>
						)
					)}
			</div>
		</div>
	);
};

export default Projects;
