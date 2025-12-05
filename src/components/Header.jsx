import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import ThemeToggle from "./ThemeToggle";
import { LogoIcon } from "./Icons/SvgIcons";

import Navbar from "./Navbar";

const Path = (props) => (
	<motion.path
		fill="transparent"
		strokeWidth="3"
		stroke="#fafafa"
		strokeLinecap="round"
		{...props}
	/>
);

const MenuToggle = ({ toggle, isOpen }) => (
	<button
		onClick={toggle}
		className="menu-btn md:hidden"
		aria-label={isOpen ? "Close menu" : "Open menu"}
	>
		<svg width="24" height="24" viewBox="0 0 19 19">
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
					<a
						href="/"
						className="logo menu-btn text-zinc-900 dark:text-zinc-100"
						onClick={handleLogoClick}
						aria-label="nathanielseth icon"
					>
						<LogoIcon />
					</a>
				</h1>

				<div className="relative md:justify-self-center">
					<MenuToggle toggle={() => setNavOpen(!navOpen)} isOpen={navOpen} />
					<Navbar navOpen={navOpen} toggleNav={setNavOpen} />
				</div>

				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.9 }}
					className="max-md:hidden md:justify-self-end"
				>
					<ThemeToggle className="btn btn-secondary font-semibold" />
				</motion.div>
			</div>
		</header>
	);
};

export default Header;
