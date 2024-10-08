import Header from "./components/Header";
import Hero from "./components/Hero";

const App = () => {
	return (
		<>
			<Header />
			<main className="flex flex-col min-h-screen">
				<Hero />
			</main>
		</>
	);
};

export default App;
