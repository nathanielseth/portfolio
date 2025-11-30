import { ReactLenis } from "lenis/react";
import { LazyMotion, domAnimation } from "framer-motion";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
	return (
		<ReactLenis root>
			<LazyMotion features={domAnimation}>
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
			</LazyMotion>
		</ReactLenis>
	);
};

export default App;
