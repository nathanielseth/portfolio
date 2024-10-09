import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";

const App = () => {
	return (
		<>
			<Header />
			<main className="snap-y snap-mandatory overflow-y-scroll scrollbar-thin">
				<section className="snap-start h-screen">
					<Hero />
				</section>
				<section className="snap-start h-screen">
					<Skills />
				</section>
			</main>
		</>
	);
};

export default App;
