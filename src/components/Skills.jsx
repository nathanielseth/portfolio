import { motion } from "framer-motion";

import { RiJavascriptFill } from "react-icons/ri";
import { SiCsharp } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa6";
import { FaReact } from "react-icons/fa6";
import { SiGnubash } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiGodotengine } from "react-icons/si";

const iconVariants = {
	initial: { y: -10 },
	animate: {
		y: 0,
		transition: {
			duration: 1,
		},
	},
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
				className="flex flex-wrap items-center justify-center gap-4"
			>
				<motion.div
					className="p-3"
					variants={iconVariants}
					initial="initial"
					animate="animate"
				>
					<RiJavascriptFill className="text-5xl text-yellow-400" />
				</motion.div>
				<motion.div
					className="p-3"
					variants={iconVariants}
					initial="initial"
					animate="animate"
				>
					<FaReact className="text-5xl text-cyan-400" />
				</motion.div>
				<motion.div
					className="p-3"
					variants={iconVariants}
					initial="initial"
					animate="animate"
				>
					<SiGnubash className="text-5xl text-orange-500" />
				</motion.div>
				<motion.div
					className="p-3"
					variants={iconVariants}
					initial="initial"
					animate="animate"
				>
					<BiLogoPostgresql className="text-5xl text-blue-700" />
				</motion.div>

				<motion.div
					className="p-3"
					variants={iconVariants}
					initial="initial"
					animate="animate"
				>
					<SiCsharp className="text-5xl text-purple-600" />
				</motion.div>
				<motion.div
					className="p-3"
					variants={iconVariants}
					initial="initial"
					animate="animate"
				>
					<FaNodeJs className="text-5xl text-green-600" />
				</motion.div>
			</motion.div>
		</div>
	);
};

export default Skills;
