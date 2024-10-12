import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

const Navbar = ({ navOpen, toggleNav }) => {
	const [activeTab, setActiveTab] = useState("#home");
	const [threshold, setThreshold] = useState(0.2);
	const activeBox = useRef();
	const lenis = useLenis();

	const navItems = useMemo(
		() => [
			{ label: "Home", link: "#home", className: "nav-link" },
			{ label: "Skills", link: "#skills", className: "nav-link" },
			{ label: "Projects", link: "#projects", className: "nav-link" },
			{ label: "Contact", link: "#contact", className: "nav-link md:hidden" },
		],
		[]
	);

	const initActiveBox = useCallback((target) => {
		if (target && activeBox.current) {
			const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = target;
			activeBox.current.style.cssText = `
        top: ${offsetTop}px; 
        left: ${offsetLeft}px; 
        width: ${offsetWidth}px; 
        height: ${offsetHeight}px;
      `;
		}
	}, []);

	const handleLinkClick = useCallback(
		(event, link) => {
			event.preventDefault();
			setActiveTab(link);
			const targetSection = document.querySelector(link);

			if (targetSection) {
				lenis.scrollTo(targetSection.offsetTop, { duration: 0.55 });

				const handleScroll = () => {
					if (activeTab !== link) {
						setActiveTab(link);
					}
				};
				window.addEventListener("scroll", handleScroll, { once: true });
			}

			toggleNav(false);
		},
		[activeTab, toggleNav, lenis]
	);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const newActiveLink = navItems.find(
							(item) => item.link === `#${entry.target.id}`
						);
						if (newActiveLink && activeTab !== newActiveLink.link) {
							setActiveTab(newActiveLink.link);
						}
					}
				});
			},
			{
				threshold: threshold,
				rootMargin: "0px 0px -30% 0px",
			}
		);

		navItems.forEach(({ link }) => {
			const section = document.querySelector(link);
			if (section) {
				observer.observe(section);
			}
		});

		return () => observer.disconnect();
	}, [activeTab, navItems, threshold]);

	const handleResize = useCallback(() => {
		setThreshold(window.innerWidth >= 768 ? 0.5 : 0.2);

		const currentActiveLink = document.querySelector(`a[href='${activeTab}']`);
		if (currentActiveLink) {
			initActiveBox(currentActiveLink);
		}
	}, [activeTab, initActiveBox]);

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [handleResize]);

	useEffect(() => {
		const currentActiveLink = document.querySelector(`a[href='${activeTab}']`);
		if (currentActiveLink) {
			initActiveBox(currentActiveLink);
		}
	}, [activeTab, initActiveBox]);

	return (
		<nav className={`navbar ${navOpen ? "active" : ""}`}>
			{navItems.map(({ label, link, className }, key) => (
				<a
					href={link}
					key={key}
					className={`${className} relative z-20 transition duration-200 ${
						activeTab === link ? "text-black active-tab" : "text-zinc-400"
					}`}
					onClick={(event) => handleLinkClick(event, link)}
				>
					{label}
				</a>
			))}
			<motion.div
				className="active-box"
				ref={activeBox}
				layoutId="active-box"
				initial={false}
				transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
			/>
		</nav>
	);
};

Navbar.propTypes = {
	navOpen: PropTypes.bool.isRequired,
	toggleNav: PropTypes.func.isRequired,
};

export default Navbar;
