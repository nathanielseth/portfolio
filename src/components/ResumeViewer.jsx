import { useEffect, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { X, FileText } from "lucide-react";

const modalVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.2 } },
	exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalContentVariants = {
	hidden: { opacity: 0, scale: 0.95, y: 20 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { type: "spring", damping: 25, stiffness: 300 },
	},
	exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

const formatDate = (date) => {
	const month = date.toLocaleString("en-US", { month: "short" });
	const year = date.getFullYear();
	return `${month} ${year}`;
};

const extractPDFMetadata = async (url) => {
	try {
		const response = await fetch(url, { method: "HEAD" });
		const lastModified = response.headers.get("Last-Modified");
		return lastModified
			? formatDate(new Date(lastModified))
			: formatDate(new Date());
	} catch (err) {
		console.error("Failed to fetch PDF metadata:", err);
		return formatDate(new Date());
	}
};

const usePDFMetadata = (pdfUrl, isOpen) => {
	const [lastModified, setLastModified] = useState(null);

	useEffect(() => {
		if (!isOpen) return;
		let isMounted = true;
		extractPDFMetadata(pdfUrl).then((date) => {
			if (isMounted) setLastModified(date);
		});
		return () => {
			isMounted = false;
		};
	}, [pdfUrl, isOpen]);

	return lastModified;
};

const useBodyScrollLock = (isLocked) => {
	useEffect(() => {
		if (isLocked) {
			const scrollbarWidth =
				window.innerWidth - document.documentElement.clientWidth;
			document.body.style.overflow = "hidden";
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		}
		return () => {
			document.body.style.overflow = "unset";
			document.body.style.paddingRight = "0px";
		};
	}, [isLocked]);
};

const PDFModal = ({ isOpen, onClose, pdfUrl, title = "Resume" }) => {
	const lastModified = usePDFMetadata(pdfUrl, isOpen);
	useBodyScrollLock(isOpen);

	const stopPropagation = useCallback((e) => e.stopPropagation(), []);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					variants={modalVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 dark:bg-black/90 backdrop-blur-md p-4"
					onClick={onClose}
					onWheel={stopPropagation}
				>
					<motion.div
						variants={modalContentVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={stopPropagation}
						onWheel={stopPropagation}
						className="relative w-full max-w-4xl h-[85vh] sm:h-[90vh] bg-white/95 dark:bg-zinc-900/95 rounded-2xl shadow-2xl overflow-hidden dark:border dark:border-zinc-800 flex flex-col"
					>
						<button
							onClick={onClose}
							className="absolute top-4 right-4 z-50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors p-2 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 rounded-full backdrop-blur-sm"
							aria-label="Close modal"
						>
							<X className="w-6 h-6" />
						</button>
						<div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-300 dark:border-zinc-800">
							<FileText className="text-zinc-600 dark:text-zinc-400 text-2xl" />
							<div className="flex flex-col items-start">
								<h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
									{title}
								</h2>
								<p className="text-xs text-zinc-500">
									{lastModified ? `Updated ${lastModified}` : "Loading..."}
								</p>
							</div>
						</div>
						<div className="flex-1 overflow-auto bg-zinc-100/50 dark:bg-zinc-800/50">
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

export default memo(PDFModal);
