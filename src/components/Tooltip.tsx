import { useState } from "react";
import { m, useReducedMotion } from "motion/react";

const TOOLTIP_VARIANTS = {
	visible: { opacity: 1, y: 0 },
	hidden: { opacity: 0, y: -5, transition: { duration: 0.3 } },
};

type TooltipPosition = "top" | "bottom";

interface TooltipProps {
	label: string;
	position?: TooltipPosition;
	children: React.ReactNode;
}

export default function Tooltip({
	label,
	position = "top",
	children,
}: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);
	const prefersReduced = useReducedMotion();

	const isTop = position === "top";

	const positionStyles = isTop
		? { bottom: "100%", marginBottom: "0.5rem" }
		: { top: "100%", marginTop: "0.5rem" };

	const arrowStyles = isTop
		? { bottom: "-4px", borderTop: "none", borderLeft: "none" }
		: { top: "-4px", borderBottom: "none", borderRight: "none" };

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
		>
			{children}

			<m.div
				className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
				style={positionStyles}
				animate={isVisible && !prefersReduced ? "visible" : "hidden"}
				initial="hidden"
				variants={TOOLTIP_VARIANTS}
			>
				{/* arrow */}
				<div
					className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900 rotate-45 z-0"
					style={arrowStyles}
				/>
				<div className="relative z-10 px-2 py-1.5 text-sm leading-none text-zinc-50 whitespace-nowrap bg-zinc-900 rounded-md shadow-lg">
					{label}
				</div>
			</m.div>
		</div>
	);
}