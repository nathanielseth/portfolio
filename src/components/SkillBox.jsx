import PropTypes from "prop-types";
import { motion } from "framer-motion";

const SkillBox = ({ Icon, label, color = "#fafafa", classes = "" }) => {
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
				"flex items-center gap-3 ring-2 ring-inset ring-zinc-50/10 rounded-2xl p-2 md:p-3 hover:bg-zinc-800 transition-colors max-w-xs " +
				classes
			}
		>
			<div
				className="rounded-xl w-12 h-12 p-2 flex justify-center items-center"
				style={{ backgroundColor: color }}
			>
				<Icon className="text-[#fafafa]" size={32} />
			</div>

			<div>
				<h3 className="text-sm md:text-base">{label}</h3>
			</div>
		</motion.div>
	);
};

SkillBox.propTypes = {
	Icon: PropTypes.elementType.isRequired,
	label: PropTypes.string.isRequired,
	color: PropTypes.string,
	classes: PropTypes.string,
};

export default SkillBox;
