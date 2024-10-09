import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

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
				<section id="projects" className="snap-start h-screen">
					<Projects />
				</section>
			</main>
		</>
	);
};

export default App;
