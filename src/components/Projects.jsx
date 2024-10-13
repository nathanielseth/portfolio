import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import projects from "../projectsData";

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 35 },
	show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Projects = () => {
	return (
		<div className="flex flex-col justify-center md:h-screen max-w-5xl mx-auto">
			<h2 className="text-center text-2xl md:text-3xl mb-8">
				Personal Projects
			</h2>

			<motion.div
				className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] justify-items-center"
				variants={containerVariants}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
			>
				{projects.map(({ imgSrc, title, tags, projectLink }, key) => (
					<motion.div key={key} variants={itemVariants}>
						<ProjectCard
							imgSrc={imgSrc}
							title={title}
							tags={tags}
							projectLink={projectLink}
							ariaLabel={`View project: ${title}`}
						/>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};

export default Projects;
