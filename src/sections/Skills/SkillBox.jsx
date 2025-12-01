import PropTypes from "prop-types";
import { motion } from "framer-motion";

const SkillBox = ({ Icon, label, description, color, classes = "" }) => {
	const variants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			variants={variants}
			transition={{ duration: 0.5, ease: "easeInOut" }}
			className={
				"flex items-center gap-3 md:gap-4 ring-1 ring-inset bg-zinc-900 ring-zinc-950 rounded-xl p-3 md:p-3 " +
				"hover:bg-zinc-800 hover:ring-zinc-700 transition-colors " +
				"w-full sm:max-w-xs md:max-w-sm lg:min-w-80 " +
				classes
			}
		>
			<div
				className="rounded-xl w-12 h-12 flex justify-center items-center"
				style={{ backgroundColor: color }}
			>
				<Icon className="text-zinc-50" size={32} />
			</div>

			<div>
				<h3 className="text-sm md:text-lg">{label}</h3>
				<p className="hidden md:block text-sm text-zinc-400">{description}</p>
			</div>
		</motion.div>
	);
};

SkillBox.propTypes = {
	Icon: PropTypes.elementType.isRequired,
	label: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	color: PropTypes.string,
	classes: PropTypes.string,
};

export default SkillBox;
