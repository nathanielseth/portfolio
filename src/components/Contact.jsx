import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.6,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const iconVariants = {
	hidden: { opacity: 0, y: 30 },
	show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5 } },
};

const Contact = () => {
	return (
		<motion.div
			className="flex flex-col justify-center items-center h-screen"
			variants={containerVariants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: false }}
		>
			<motion.p
				className="font-light text-center text-xl md:text-xl"
				variants={itemVariants}
				initial="hidden"
				whileInView="show"
			>
				Please feel free to reach out,
				<br />
				email me at{" "}
				<a
					href="mailto:nathanielseth.dev@gmail.com"
					className="text-[#f9364d] font-semibold text-2xl"
				>
					nathanielseth.dev@gmail.com
				</a>
				.
			</motion.p>

			<motion.div
				className="flex mt-10 space-x-4"
				variants={iconVariants}
				initial="hidden"
				whileInView="show"
			>
				<a
					href="https://github.com/nathanielseth"
					target="_blank"
					rel="noopener noreferrer"
					className="text-3xl text-white hover:text-[#f9364d]"
				>
					<FaGithub />
				</a>

				<a
					href="https://www.linkedin.com/in/nathanielseth"
					target="_blank"
					rel="noopener noreferrer"
					className="text-3xl text-white hover:text-[#f9364d]"
				>
					<FaLinkedin />
				</a>
			</motion.div>
		</motion.div>
	);
};

export default Contact;
