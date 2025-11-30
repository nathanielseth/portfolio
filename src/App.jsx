import { ReactLenis } from "lenis/react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
	return (
		<ReactLenis root>
			<Header />
			<main className="scrollbar-thin">
				<section id="about" className="min-h-screen">
					<Hero />
				</section>
				<section id="skills" className="min-h-screen">
					<Skills />
				</section>
				<section id="projects" className="h-auto">
					<Projects />
				</section>
				<section id="contact" className="min-h-screen">
					<Contact />
				</section>
			</main>
			<ScrollToTop />
		</ReactLenis>
	);
};

export default App;
