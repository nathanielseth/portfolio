import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const App = () => {
	return (
		<>
			<Header />
			<main className="snap-y snap-mandatory overflow-y-scroll scrollbar-thin">
				<section id="home" className="snap-start h-screen">
					<Hero />
				</section>
				<section id="skills" className="snap-start h-screen">
					<Skills />
				</section>
				<section
					id="projects"
					className="md:snap-start md:h-screen h-auto overflow-y-auto"
				>
					<Projects />
				</section>
				<section id="contact" className="snap-start h-screen">
					<Contact />
				</section>
			</main>
		</>
	);
};

export default App;
