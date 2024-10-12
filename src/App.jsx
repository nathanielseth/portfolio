import { useEffect } from "react";
import { ReactLenis } from "lenis/react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
	useEffect(() => {
		const homeSection = document.getElementById("home");
		if (homeSection) {
			homeSection.scrollIntoView({ behavior: "smooth" });
		}
	}, []);

	return (
		<ReactLenis root>
			<Header />
			<main className="scrollbar-thin">
				<section id="home" className="h-screen">
					<Hero />
				</section>
				<section id="skills" className="h-screen">
					<Skills />
				</section>
				<section id="projects" className="md:h-screen h-auto">
					<Projects />
				</section>
				<section id="contact" className="h-screen">
					<Contact />
				</section>
			</main>
			<ScrollToTop />
		</ReactLenis>
	);
};

export default App;
