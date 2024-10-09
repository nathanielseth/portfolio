import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Navbar = ({ navOpen }) => {
	const lastActiveLink = useRef();
	const activeBox = useRef();

	const navItems = [
		{ label: "Home", link: "#home", className: "nav-link active" },
		{ label: "Skills", link: "#skills", className: "nav-link" },
		{ label: "Projects", link: "#projects", className: "nav-link" },
		{ label: "Contact", link: "#contact", className: "nav-link md:hidden" },
	];

	const initActiveBox = (target) => {
		activeBox.current.style.top = target.offsetTop + "px";
		activeBox.current.style.left = target.offsetLeft + "px";
		activeBox.current.style.width = target.offsetWidth + "px";
		activeBox.current.style.height = target.offsetHeight + "px";
	};

	const activeCurrentLink = (event, targetId) => {
		lastActiveLink.current?.classList.remove("active");
		const linkElement = document.querySelector(`a[href='${targetId}']`);
		linkElement.classList.add("active");
		lastActiveLink.current = linkElement;

		initActiveBox(linkElement);
	};

	const handleLinkClick = (event, link) => {
		event.preventDefault();

		const targetSection = document.querySelector(link);
		if (targetSection) {
			targetSection.scrollIntoView({ behavior: "smooth" });

			setTimeout(() => {
				activeCurrentLink(event, link);
			}, 300);
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const activeLink = navItems.find(
							(item) => item.link === `#${entry.target.id}`
						);
						if (activeLink) {
							const linkElement = document.querySelector(
								`a[href='${activeLink.link}']`
							);
							if (linkElement) {
								activeCurrentLink({ target: linkElement }, activeLink.link);
							}
						}
					}
				});
			},
			{ threshold: 0.1 }
		);

		navItems.forEach((item) => {
			const section = document.querySelector(item.link);
			if (section) {
				observer.observe(section);
			}
		});

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<nav className={"navbar " + (navOpen ? "active" : "")}>
			{navItems.map(({ label, link, className }, key) => (
				<a
					href={link}
					key={key}
					className={className}
					onClick={(event) => handleLinkClick(event, link)}
				>
					{label}
				</a>
			))}
			<div className="active-box" ref={activeBox}></div>
		</nav>
	);
};

Navbar.propTypes = {
	navOpen: PropTypes.bool.isRequired,
};

export default Navbar;
