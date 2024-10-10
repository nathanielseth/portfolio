import { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "./Navbar";

const Header = () => {
	const [navOpen, setNavOpen] = useState(false);
	return (
		<header className="fixed top-0 left-0 w-full h-20 flex items-center z-40">
			<div className="max-w-screen-lg w-full mx-auto px-5 flex justify-between items-center md:px-14 md:grid md:grid-cols-[1fr,3fr,1fr]">
				<h1>
					<a href="/" className="logo">
						<img
							src="/images/logo.svg"
							width={35}
							height={35}
							alt="Nathaniel-Seth"
						/>
					</a>
				</h1>

				<div className="relative md:justify-self-center">
					<button
						className="menu-btn md:hidden"
						onClick={() => setNavOpen((prev) => !prev)}
					>
						<span className="material-symbols-rounded">
							{navOpen ? "close" : "menu"}
						</span>
					</button>
					<Navbar navOpen={navOpen} />
				</div>

				<motion.a
					whileHover={{ y: -2 }}
					href="#contact"
					className="btn btn-secondary max-md:hidden md:justify-self-end font-semibold"
				>
					Contact me!
				</motion.a>
			</div>
		</header>
	);
};

export default Header;
