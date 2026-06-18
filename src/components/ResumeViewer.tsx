import {
	useCallback,
	memo,
	useEffect,
	useRef,
	useEffectEvent,
} from "react";
import { m, AnimatePresence } from "motion/react";
import { X, FileText } from "lucide-react";
import { useScrollLock } from "../hooks/useScrollLock";

const MODAL_VARIANTS = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.15 } },
	exit: { opacity: 0, transition: { duration: 0.15 } },
};

const CONTENT_VARIANTS = {
	hidden: { opacity: 0, y: 16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring" as const,
			damping: 30,
			stiffness: 400,
			mass: 0.8,
		},
	},
	exit: { opacity: 0, y: 16, transition: { duration: 0.15 } },
};

interface ResumeViewerProps {
	isOpen: boolean;
	onClose: () => void;
	pdfUrl: string;
	title?: string;
}

function ResumeViewer({
	isOpen,
	onClose,
	pdfUrl,
	title = "Resume",
}: ResumeViewerProps) {
	const panelRef = useRef<HTMLDivElement>(null);

	useScrollLock(isOpen);

	const handleKeyDown = useEffectEvent((e: KeyboardEvent) => {
		if (e.key === "Escape") onClose();
	});

	useEffect(() => {
		if (!isOpen) return;
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen]);

	const stopPropagation = useCallback(
		(e: React.SyntheticEvent) => e.stopPropagation(),
		[],
	);

	const handleAnimationStart = useCallback(() => {
		if (panelRef.current) panelRef.current.style.willChange = "transform";
	}, []);

	const handleAnimationComplete = useCallback(() => {
		if (panelRef.current) panelRef.current.style.willChange = "auto";
	}, []);

	return (
		<AnimatePresence>
			{isOpen && (
				<m.div
					variants={MODAL_VARIANTS}
					initial="hidden"
					animate="visible"
					exit="exit"
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 dark:bg-black/90 p-4"
					onClick={onClose}
					onWheel={stopPropagation}
				>
					<m.div
						ref={panelRef}
						variants={CONTENT_VARIANTS}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={stopPropagation}
						onWheel={stopPropagation}
						onAnimationStart={handleAnimationStart}
						onAnimationComplete={handleAnimationComplete}
						className="relative w-full max-w-4xl h-[85vh] sm:h-[90vh] bg-white/95 dark:bg-zinc-900/95 rounded-2xl shadow-2xl overflow-hidden dark:border dark:border-zinc-800 flex flex-col"
					>
						<button
							type="button"
							onClick={onClose}
							className="absolute top-4 right-4 z-50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors p-2 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 rounded-full cursor-pointer"
							aria-label="Close resume"
						>
							<X className="w-6 h-6" />
						</button>
						<div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-300 dark:border-zinc-800">
							<FileText className="text-zinc-600 dark:text-zinc-400" />
							<h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
								{title}
							</h2>
						</div>
						<div className="flex-1 overflow-auto bg-zinc-100/50 dark:bg-zinc-800/50">
							<iframe
								src={`${pdfUrl}#view=FitH`}
								title={`${title} PDF viewer`}
								sandbox="allow-scripts allow-forms allow-popups"
								className="w-full h-full min-h-125"
							/>
						</div>
					</m.div>
				</m.div>
			)}
		</AnimatePresence>
	);
}

export default memo(ResumeViewer);