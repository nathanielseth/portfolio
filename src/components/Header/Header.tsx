import { useState } from "react";
import { m } from "motion/react";
import { useLenis } from "lenis/react";
import { LogoIcon } from "../Icons";
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";

function MenuLine(props: React.ComponentProps<typeof m.path>) {
	return (
		<m.path
			fill="transparent"
			strokeWidth="3"
			stroke="currentColor"
			strokeLinecap="round"
			className="stroke-zinc-900 dark:stroke-zinc-100"
			{...props}
		/>
	);
}

interface MenuToggleProps {
	isOpen: boolean;
	onToggle: () => void;
}

function MenuToggle({ isOpen, onToggle }: MenuToggleProps) {
	return (
		<button
			type="button"
			onClick={onToggle}
			className="menu-btn max-md:grid md:hidden cursor-pointer"
			aria-label={isOpen ? "Close menu" : "Open menu"}
			aria-expanded={isOpen}
		>
			<svg width="24" height="24" viewBox="0 0 19 19">
				<MenuLine
					variants={{
						closed: { d: "M 2 2.5 L 20 2.5" },
						open: { d: "M 3 16.5 L 17 2.5" },
					}}
					initial={isOpen ? "open" : "closed"}
					animate={isOpen ? "open" : "closed"}
				/>
				<MenuLine
					d="M 2 9.423 L 20 9.423"
					variants={{
						closed: { opacity: 1 },
						open: { opacity: 0 },
					}}
					initial="closed"
					animate={isOpen ? "open" : "closed"}
					transition={{ duration: 0.1 }}
				/>
				<MenuLine
					variants={{
						closed: { d: "M 2 16.346 L 20 16.346" },
						open: { d: "M 3 2.5 L 17 16.346" },
					}}
					initial={isOpen ? "open" : "closed"}
					animate={isOpen ? "open" : "closed"}
				/>
			</svg>
		</button>
	);
}

export default function Header() {
	const [navOpen, setNavOpen] = useState(false);
	const lenis = useLenis();

	const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const about = document.querySelector<HTMLElement>("#about");
		if (about && lenis) lenis.scrollTo(about.offsetTop, { duration: 1.2 });
	};

	return (
		<header className="fixed top-0 left-0 w-full h-20 flex items-center z-40">
			<div className="max-w-5xl w-full mx-auto px-5 flex justify-between items-center md:px-14 md:grid md:grid-cols-[1fr_3fr_1fr]">
				<h1>
					<a
						href="/"
						onClick={handleLogoClick}
						className="logo menu-btn text-zinc-900 dark:text-zinc-100"
						aria-label="nathanielseth icon"
					>
						<LogoIcon />
					</a>
				</h1>

				<div className="relative md:justify-self-center">
					<MenuToggle isOpen={navOpen} onToggle={() => setNavOpen((v) => !v)} />
					<Navbar navOpen={navOpen} onClose={() => setNavOpen(false)} />
				</div>

				<m.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.9 }}
					className="max-md:hidden md:justify-self-end"
				>
					<ThemeToggle />
				</m.div>
			</div>
		</header>
	);
}