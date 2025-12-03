import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import Navbar from "./Navbar";
import { useTheme } from "../hooks/useTheme";

const Path = (props) => (
	<motion.path
		fill="transparent"
		strokeWidth="3"
		stroke="currentColor"
		strokeLinecap="round"
		{...props}
	/>
);

const MenuToggle = ({ toggle, isOpen }) => (
	<button onClick={toggle} className="menu-btn md:hidden">
		<svg
			width="24"
			height="24"
			viewBox="0 0 19 19"
			className="text-zinc-900 dark:text-zinc-50"
		>
			<Path
				variants={{
					closed: { d: "M 2 2.5 L 20 2.5" },
					open: { d: "M 3 16.5 L 17 2.5" },
				}}
				initial={isOpen ? "open" : "closed"}
				animate={isOpen ? "open" : "closed"}
			/>
			<Path
				d="M 2 9.423 L 20 9.423"
				variants={{
					closed: { opacity: 1 },
					open: { opacity: 0 },
				}}
				initial="closed"
				transition={{ duration: 0.1 }}
				animate={isOpen ? "open" : "closed"}
			/>
			<Path
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

MenuToggle.propTypes = {
	toggle: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
};

const Header = () => {
	const [navOpen, setNavOpen] = useState(false);
	const { theme, toggleTheme } = useTheme(); // Use the hook
	const lenis = useLenis();

	const handleLogoClick = (event) => {
		event.preventDefault();
		const aboutSection = document.querySelector("#about");
		if (aboutSection) {
			lenis.scrollTo(aboutSection.offsetTop, { duration: 1.2 });
		}
	};

	return (
		<header className="fixed top-0 left-0 w-full h-20 flex items-center z-40">
			<div className="max-w-screen-lg w-full mx-auto px-5 flex justify-between items-center md:px-14 md:grid md:grid-cols-[1fr,3fr,1fr]">
				<h1>
					<a href="/" className="logo menu-btn" onClick={handleLogoClick}>
						<img
							src="/portfolio/images/logo.svg"
							width={35}
							height={35}
							alt="Nathaniel-Seth"
							loading="eager"
						/>
					</a>
				</h1>

				<div className="relative md:justify-self-center">
					<MenuToggle toggle={() => setNavOpen(!navOpen)} isOpen={navOpen} />
					<Navbar navOpen={navOpen} toggleNav={setNavOpen} />
				</div>

				<div className="flex items-center gap-3 md:justify-self-end">
					{/* Theme toggle - visible on mobile */}
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.9 }}
						onClick={toggleTheme}
						className="menu-btn"
						aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
					>
						{theme === "dark" ? (
							// Sun icon for light mode
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								className="text-zinc-900 dark:text-zinc-50"
							>
								<circle cx="12" cy="12" r="5" />
								<line x1="12" y1="1" x2="12" y2="3" />
								<line x1="12" y1="21" x2="12" y2="23" />
								<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
								<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
								<line x1="1" y1="12" x2="3" y2="12" />
								<line x1="21" y1="12" x2="23" y2="12" />
								<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
								<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
							</svg>
						) : (
							// Moon icon for dark mode
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								className="text-zinc-900 dark:text-zinc-50"
							>
								<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
							</svg>
						)}
					</motion.button>
				</div>
			</div>
		</header>
	);
};

export default Header;
