import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

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
			className="flex flex-col justify-between items-center h-screen"
			variants={containerVariants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: false }}
		>
			<div className="flex-grow flex flex-col justify-center items-center">
				<motion.p
					className="font-normal text-center text-l md:text-xl"
					variants={itemVariants}
					initial="hidden"
					whileInView="show"
				>
					Please feel free to reach out at
					<br />{" "}
					<a
						href="mailto:nathanielseth.dev@gmail.com"
						className="text-[#f9364d] font-medium text-xl md:text-2xl"
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
						className="text-3xl text-zinc-500 hover:text-zinc-50"
					>
						<FaGithub />
					</a>

					<a
						href="https://www.linkedin.com/in/nathanielseth"
						target="_blank"
						rel="noopener noreferrer"
						className="text-3xl text-zinc-500 hover:text-zinc-50"
					>
						<FaLinkedin />
					</a>

					<a
						href="mailto:nathanielseth.dev@gmail.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-3xl text-zinc-500 hover:text-zinc-50"
					>
						<MdEmail />
					</a>
				</motion.div>
			</div>

			<motion.div
				variants={itemVariants}
				initial="hidden"
				whileInView="show"
				className="text-sm font-light md:text-base mb-5 text-center text-zinc-500 "
			>
				made by nathanielseth.dev
			</motion.div>
		</motion.div>
	);
};

export default Contact;
