import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { resumeMetadata } from "../utils/data/skillsData";

const modalVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.2 },
	},
	exit: {
		opacity: 0,
		transition: { duration: 0.2 },
	},
};

const modalContentVariants = {
	hidden: { opacity: 0, scale: 0.95, y: 20 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			type: "spring",
			damping: 25,
			stiffness: 300,
		},
	},
	exit: {
		opacity: 0,
		scale: 0.95,
		y: 20,
		transition: { duration: 0.2 },
	},
};

const PDFModal = ({ isOpen, onClose, pdfUrl, title = "Resume" }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					variants={modalVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
					onClick={onClose}
					onWheel={(e) => e.stopPropagation()}
				>
					<motion.div
						variants={modalContentVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={(e) => e.stopPropagation()}
						onWheel={(e) => e.stopPropagation()}
						className="relative w-full max-w-4xl h-[85vh] sm:h-[90vh] bg-zinc-900/95 rounded-2xl shadow-2xl overflow-hidden border border-zinc-800 flex flex-col"
					>
						{/* Close Button */}
						<button
							onClick={onClose}
							className="absolute top-4 right-4 z-50 text-zinc-400 hover:text-zinc-50 transition-colors p-2 hover:bg-zinc-800/80 rounded-full backdrop-blur-sm"
							aria-label="Close modal"
						>
							<IoClose className="w-6 h-6" />
						</button>

						{/* Header */}
						<div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-800">
							<span className="material-symbols-rounded text-zinc-400 text-2xl flex items-center">
								description
							</span>
							<div className="flex flex-col items-start">
								<h2 className="text-lg font-semibold text-zinc-50">{title}</h2>
								<p className="text-xs text-zinc-500">
									Updated {resumeMetadata.lastModified}
								</p>
							</div>
						</div>

						{/* PDF Viewer */}
						<div className="flex-1 overflow-auto bg-zinc-800/50">
							<iframe
								src={`${pdfUrl}#view=FitH`}
								className="w-full h-full min-h-[500px]"
								title={`${title} PDF`}
							/>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

PDFModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	pdfUrl: PropTypes.string.isRequired,
	title: PropTypes.string,
};

export default PDFModal;
