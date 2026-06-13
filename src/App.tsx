import { lazy, Suspense } from "react";
import { ReactLenis } from "lenis/react";
import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import { ThemeProvider } from "./context/ThemeProvider";
import Header from "./components/Header/Header";
import Hero from "./sections/Hero/Hero";

const Projects = lazy(() => import("./sections/Projects/Projects"));
const Contact = lazy(() => import("./sections/Contact/Contact"));

const ChatButton = lazy(() => import("./components/Chat/ChatButton"));

export default function App() {
	return (
		<ThemeProvider>
			<ReactLenis root options={{ smoothWheel: true, syncTouch: false }}>
				<LazyMotion features={domAnimation}>
					<MotionConfig reducedMotion="user">
						<Header />
						<main>
							<section id="about" className="min-h-screen">
								<Hero />
							</section>

							<Suspense fallback={null}>
								<section id="projects" className="h-auto">
									<Projects />
								</section>
							</Suspense>

							<Suspense fallback={null}>
								<section id="contact" className="min-h-screen">
									<Contact />
								</section>
							</Suspense>
						</main>

						<Suspense fallback={null}>
							<ChatButton />
						</Suspense>
					</MotionConfig>
				</LazyMotion>
			</ReactLenis>
		</ThemeProvider>
	);
}