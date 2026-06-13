import { useEffect, useState, useCallback } from "react";
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

export default function Navbar({ navOpen, onClose }: NavbarProps) {
	const [activeHref, setActiveHref] = useState<NavHref>("#about");
	const lenis = useLenis();

	const isDesktop = useMediaQuery("(min-width: 768px)");
	const threshold = isDesktop ? 0.5 : 0.2;

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

		const observedEls = new Set<Element>();
		const tryObserve = () => {
			NAV_ITEMS.forEach(({ href }) => {
				const el = document.querySelector(href);
				if (el && !observedEls.has(el)) {
					observer.observe(el);
					observedEls.add(el);
				}
			});
			if (observedEls.size === NAV_ITEMS.length) {
				mutationObserver.disconnect();
			}
		};

		const mutationObserver = new MutationObserver(tryObserve);
		mutationObserver.observe(document.body, {
			childList: true,
			subtree: true,
		});
		tryObserve();

		return () => {
			observer.disconnect();
			mutationObserver.disconnect();
		};
	}, [threshold]);

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
		<nav className={`navbar${navOpen ? " active" : ""}`}>
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
					{activeHref === href && (
						<m.div
							layoutId="active-box"
							className="active-box"
							transition={{ type: "spring", stiffness: 500, damping: 35 }}
						/>
					)}
					{label}
				</a>
			))}
		</nav>
	);
}