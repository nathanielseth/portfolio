import { motion } from "framer-motion";

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
	hidden: { opacity: 0, y: 30 },
	show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Hero = () => {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<motion.div
				className="max-w-2xl mx-auto text-center"
				variants={containerVariants}
				initial="hidden"
				animate="show"
			>
				<motion.h1
					className="text-4xl md:text-5xl font-semibold mb-12"
					variants={itemVariants}
				>
					My name is <span className="text-[#f9364d]">Nathaniel Seth</span>,
					<br />
					I&apos;m a Full-Stack developer.
				</motion.h1>

				<motion.p
					className="mt-4 text-sm text-zinc-400 md:text-base mb-12 max-w-sm mx-auto md:max-w-lg"
					variants={itemVariants}
				>
					I am a Computer Science student who is wholeheartedly dedicated to the
					concept and principles of continuous, lifelong learning.
				</motion.p>

				<motion.div
					whileTap={{ scale: 0.85 }}
					whileHover={{ scale: 1.1 }}
					transformTemplate={(props, transform) =>
						transform.replace(" translateZ(0)", "")
					}
					variants={itemVariants}
					layout="position"
					className="mt-8 flex justify-center items-center"
				>
					<a
						href="/assets/seth_cv.pdf"
						download
						className="inline-flex items-center gap-1 bg-[#f9364d] text-white px-6 h-12 rounded-full"
					>
						<span className="font-semibold text-base leading-none">
							Download CV
						</span>
						<span className="material-symbols-rounded text-lg leading-none align-middle">
							download
						</span>
					</a>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default Hero;
