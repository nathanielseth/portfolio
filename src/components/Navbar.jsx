import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

const Navbar = ({ navOpen, toggleNav }) => {
	const [activeTab, setActiveTab] = useState("#about");
	const [threshold, setThreshold] = useState(0.1);
	const [isInitialLoad, setIsInitialLoad] = useState(true);

	const activeBox = useRef();
	const ignoreScrollRef = useRef(false);
	const lenis = useLenis();

	const navItems = useMemo(
		() => [
			{ label: "About", link: "#about", className: "nav-link" },
			{ label: "Projects", link: "#projects", className: "nav-link" },
			{ label: "Contact", link: "#contact", className: "nav-link" },
		],
		[]
	);

	const initActiveBox = useCallback((target) => {
		if (target && activeBox.current) {
			const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = target;
			const isMobile = window.innerWidth < 768;
			const mobileMargin = isMobile ? 5 : 0;

			activeBox.current.style.cssText = `
        top: ${offsetTop - (isMobile ? mobileMargin : 0)}px;
        left: ${offsetLeft}px;
        width: ${offsetWidth}px;
        height: ${offsetHeight + (isMobile ? mobileMargin * 2 : 0)}px;
        opacity: 1; 
      `;
		}
	}, []);

	const handleLinkClick = useCallback(
		(event, link) => {
			event.preventDefault();

			setActiveTab(link);

			const targetSection = document.querySelector(link);
			if (targetSection && lenis) {
				lenis.scrollTo(targetSection, {
					offset: link === "#projects" && window.innerWidth < 768 ? -80 : 0,
					duration: 0.5,
				});
			}

			toggleNav(false);
		},
		[toggleNav, lenis]
	);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (ignoreScrollRef.current) return;

				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionId = entry.target.id;

						
						setActiveTab(`#${sectionId}`);
						
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
	}, [navItems, threshold]);

	const handleResize = useCallback(() => {
		setThreshold(window.innerWidth >= 768 ? 0.5 : 0.2);

		const currentActiveLink = document.querySelector(`a[href='${activeTab}']`);
		if (currentActiveLink && activeBox.current) {
			initActiveBox(currentActiveLink);
		}
	}, [activeTab, initActiveBox]);

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, [handleResize]);

	useEffect(() => {
		const currentActiveLink = document.querySelector(`a[href='${activeTab}']`);
		if (currentActiveLink && activeBox.current) {
			const isVisible =
				currentActiveLink.offsetWidth > 0 && currentActiveLink.offsetHeight > 0;

			if (isVisible) {
				initActiveBox(currentActiveLink);
			} else {
				activeBox.current.style.opacity = 0;
			}
		}

		if (isInitialLoad) {
			setTimeout(() => setIsInitialLoad(false), 100);
		}
	}, [activeTab, initActiveBox, isInitialLoad]);

	return (
		<nav className={`navbar ${navOpen ? "active" : ""} bg-zinc-950/30`}>
			{navItems.map(({ label, link, className }, key) => (
				<a
					href={link}
					key={key}
					className={`${className} relative z-30 transition duration-200 md:my-0 my-2 mix-blend-difference text-zinc-300`}
					onClick={(event) => handleLinkClick(event, link)}
				>
					{label}
				</a>
			))}
			<motion.div
				className="active-box"
				ref={activeBox}
				layoutId="active-box"
				initial={{ opacity: 1 }}
				transition={
					isInitialLoad
						? { duration: 0 }
						: { type: "spring", stiffness: 500, damping: 35 }
				}
			/>
		</nav>
	);
};

Navbar.propTypes = {
	navOpen: PropTypes.bool.isRequired,
	toggleNav: PropTypes.func.isRequired,
};

export default Navbar;
