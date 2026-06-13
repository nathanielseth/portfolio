import {
	useRef,
	useEffect,
	useState,
	useCallback,
	useLayoutEffect,
} from "react";
import { m } from "motion/react";
import { useLenis } from "lenis/react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const NAV_ITEMS = [
	{ label: "About", href: "#about" },
	{ label: "Projects", href: "#projects" },
	{ label: "Contact", href: "#contact" },
] as const;

type NavHref = (typeof NAV_ITEMS)[number]["href"];

interface NavbarProps {
	navOpen: boolean;
	onClose: () => void;
}

interface PillStyle {
	top: number;
	left: number;
	width: number;
	height: number;
}

function getPillStyle(
	href: string,
	navEl: HTMLElement | null,
): PillStyle | null {
	const anchor = navEl?.querySelector<HTMLAnchorElement>(`a[href='${href}']`);
	if (!anchor) return null;
	const isMobile = window.innerWidth < 768;
	const pad = isMobile ? 5 : 0;
	return {
		top: anchor.offsetTop - pad,
		left: anchor.offsetLeft,
		width: anchor.offsetWidth,
		height: anchor.offsetHeight + pad * 2,
	};
}

export default function Navbar({ navOpen, onClose }: NavbarProps) {
	const [activeHref, setActiveHref] = useState<NavHref>("#about");
	const [pillStyle, setPillStyle] = useState<PillStyle | null>(null);
	const [isInitial, setIsInitial] = useState(true);
	const navRef = useRef<HTMLElement>(null);
	const lenis = useLenis();

	const isDesktop = useMediaQuery("(min-width: 768px)");
	const threshold = isDesktop ? 0.5 : 0.2;

	// prevent flash on initial render
	useLayoutEffect(() => {
		const style = getPillStyle(activeHref, navRef.current);
		if (style) setPillStyle(style);
	}, [activeHref, navOpen]);

	// enable spring transitions after initial placement
	useEffect(() => {
		if (pillStyle && isInitial) {
			const id = setTimeout(() => setIsInitial(false), 50);
			return () => clearTimeout(id);
		}
	}, [pillStyle, isInitial]);

	// sync active state with visible section
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveHref(`#${entry.target.id}` as NavHref);
					}
				}
			},
			{ threshold, rootMargin: "0px 0px -10% 0px" },
		);

		NAV_ITEMS.forEach(({ href }) => {
			const el = document.querySelector(href);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [threshold]);

	// re-measure pill position on resize
	useEffect(() => {
		const onResize = () => {
			const style = getPillStyle(activeHref, navRef.current);
			if (style) setPillStyle(style);
		};
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [activeHref]);

	const handleLinkClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, href: NavHref) => {
			e.preventDefault();
			setActiveHref(href);
			const target = document.querySelector<HTMLElement>(href);
			if (target && lenis) {
				lenis.scrollTo(target, {
					offset: href === "#projects" && !isDesktop ? -80 : 0,
					duration: 0.5,
				});
			}
			onClose();
		},
		[onClose, lenis, isDesktop],
	);

	return (
		<nav ref={navRef} className={`navbar${navOpen ? " active" : ""}`}>
			{NAV_ITEMS.map(({ label, href }) => (
				<a
					key={href}
					href={href}
					onClick={(e) => handleLinkClick(e, href)}
					className={[
						"nav-link relative z-30 md:my-0 my-2",
						activeHref === href
							? "text-zinc-50 dark:text-zinc-900"
							: "text-zinc-800 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50",
					].join(" ")}
				>
					{label}
				</a>
			))}
			{pillStyle && (
				<m.div
					className="active-box"
					animate={{
						top: pillStyle.top,
						left: pillStyle.left,
						width: pillStyle.width,
						height: pillStyle.height,
					}}
					transition={
						isInitial
							? { duration: 0 }
							: { type: "spring", stiffness: 500, damping: 35 }
					}
				/>
			)}
		</nav>
	);
}