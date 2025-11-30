import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from "react";

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
	show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.4 } },
};

const tooltipVariants = {
	visible: { opacity: 1, y: 2 },
	hidden: { opacity: 0, y: -5, transition: { duration: 0.1 } },
};

const Contact = () => {
	const [tooltip, setTooltip] = useState("Click to copy");
	const [showTooltip, setShowTooltip] = useState(false);
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async () => {
		try {
			if (navigator.clipboard) {
				await navigator.clipboard.writeText("nathanielseth.dev@gmail.com");
			} else {
				const textArea = document.createElement("textarea");
				textArea.value = "nathanielseth.dev@gmail.com";
				document.body.appendChild(textArea);
				textArea.select();
				document.execCommand("copy");
				document.body.removeChild(textArea);
			}
			setTooltip("Copied to clipboard!");
			setCopied(true);
			setShowTooltip(true);

			setTimeout(() => {
				setShowTooltip(false);
				setTimeout(() => {
					setTooltip("Click to copy");
					setCopied(false);
				}, 200);
			}, 1900);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	return (
		<motion.div
			className="flex flex-col justify-between items-center h-screen"
			variants={containerVariants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: false }}
		>
			<div className="flex-grow flex flex-col justify-center items-center">
				<motion.div
					className="font-normal text-center text-l md:text-xl"
					variants={itemVariants}
					initial="hidden"
					whileInView="show"
				>
					Please feel free to reach out at
					<br />
					<span
						className="relative group inline-block cursor-pointer"
						onClick={copyToClipboard}
						onMouseEnter={() => setShowTooltip(true)}
						onMouseLeave={() => !copied && setShowTooltip(false)}
					>
						<span className="text-[var(--accent)] font-semibold text-xl md:text-2xl">
							nathanielseth.dev@gmail.com
						</span>
						<motion.div
							className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1"
							animate={showTooltip ? "visible" : "hidden"}
							initial={{ y: 0, x: "-50%" }}
							variants={tooltipVariants}
						>
							<div className="relative z-10 p-2 text-sm leading-none text-zinc-50 whitespace-no-wrap bg-zinc-900 rounded-md shadow-lg">
								<span className="whitespace-nowrap">{tooltip}</span>
							</div>
							<div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-3 h-3 bg-zinc-900 rotate-45"></div>
						</motion.div>
					</span>
				</motion.div>

				<motion.div
					className="flex mt-11 space-x-5"
					variants={iconVariants}
					initial="hidden"
					whileInView="show"
				>
					<motion.a
						href="https://github.com/nathanielseth"
						target="_blank"
						rel="noopener noreferrer"
						className="text-2xl md:text-3xl text-zinc-500 hover:text-zinc-50"
						whileHover={{ y: -2 }}
					>
						<FaGithub />
					</motion.a>

					<motion.a
						href="https://www.linkedin.com/in/nathanielseth"
						target="_blank"
						rel="noopener noreferrer"
						className="text-2xl md:text-3xl text-zinc-500 hover:text-zinc-50"
						whileHover={{ y: -2 }}
					>
						<FaLinkedin />
					</motion.a>

					<motion.a
						href="mailto:nathanielseth.dev@gmail.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-2xl md:text-3xl text-zinc-500 hover:text-zinc-50"
						whileHover={{ y: -2 }}
					>
						<MdEmail />
					</motion.a>
				</motion.div>
			</div>

			<motion.div
				variants={itemVariants}
				initial="hidden"
				whileInView="show"
				className="text-sm font-light md:text-base mb-5 text-center text-zinc-500"
			>
				© nathanielseth.dev
			</motion.div>
		</motion.div>
	);
};

export default Contact;
