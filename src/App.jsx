import { ReactLenis } from "lenis/react";
import { LazyMotion, domAnimation } from "framer-motion";

import Header from "./components/Header";
import Hero from "./sections/About/Hero";
import Skills from "./sections/Skills/Skills";
import Projects from "./sections/Projects/Projects";
import Contact from "./sections/Contact/Contact";
import ChatButton from "./components/Chat/ChatButton";

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

				<ChatButton />
			</LazyMotion>
		</ReactLenis>
	);
};

export default App;
