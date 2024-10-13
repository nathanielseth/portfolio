import { motion } from "framer-motion";
import { RiJavascriptFill, RiReactjsLine } from "react-icons/ri";
import { BiLogoTypescript, BiLogoPostgresql } from "react-icons/bi";
import { SiDotnet, SiTailwindcss } from "react-icons/si";
import skills from "../skillsData";

const iconVariants = {
	initial: { y: -15 },
	animate: {
		y: 0,
		transition: {
			duration: 1,
		},
	},
};

const iconComponents = {
	RiJavascriptFill,
	BiLogoTypescript,
	RiReactjsLine,
	BiLogoPostgresql,
	SiDotnet,
	SiTailwindcss,
};

const Skills = () => {
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<motion.h2
				whileInView={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: -100 }}
				transition={{ duration: 1 }}
				viewport={{ once: true }}
				className="text-center text-2xl md:text-3xl mb-8"
			>
				Skills & Technologies
			</motion.h2>

			<motion.div
				whileInView={{ opacity: 1, x: 0 }}
				initial={{ opacity: 0, x: -100 }}
				transition={{ duration: 1 }}
				viewport={{ once: true }}
				className="flex flex-wrap items-center justify-center gap-3"
			>
				{skills.map(({ icon, color }, key) => {
					const IconComponent = iconComponents[icon];

					return (
						<motion.div key={key} className="p-3" variants={iconVariants}>
							<IconComponent
								className="text-5xl md:text-6xl"
								style={{ color }}
							/>
						</motion.div>
					);
				})}
			</motion.div>

			<motion.p
				whileInView={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: 30 }}
				transition={{ duration: 1, delay: 0.8 }}
				viewport={{ once: true }}
				className="mt-7 text-xs text-zinc-400 md:text-base mb-12 max-w-sm mx-auto md:max-w-lg text-center"
			>
				I&apos;m committed to continuous learning and improving my skills to
				deliver effective user experiences and dynamic applications.
			</motion.p>
		</div>
	);
};

export default Skills;
