const Hero = () => {
	return (
		<div className="flex-grow flex items-center justify-center">
			<div className="max-w-2xl mx-auto text-center">
				<h1 className="text-4xl md:text-6xl font-bold mb-12">
					I&apos;m <span className="text-[#f9364d]">Nathaniel Seth</span>,<br />
					a Full-Stack Developer.
				</h1>
				<p className="mt-4 text-sm text-zinc-400 md:text-base mb-12 max-w-sm mx-auto md:max-w-2xl">
					A Computer Science student wholeheartedly dedicated to the concept and
					principles of continuous, lifelong learning.
				</p>
				<div className="mt-8 flex-col justify-center items-center">
					<a
						href="/assets/seth_cv.pdf"
						download
						className="inline-flex items-center gap-1 bg-[#f9364d] text-white px-6 h-12 rounded-full shadow-lg transition-all duration-200 pulse hover:animate-pulseGrow"
						onMouseLeave={(e) => {
							e.currentTarget.classList.remove("animate-pulseGrow");
							e.currentTarget.classList.add("animate-pulseShrink");
						}}
						onMouseEnter={(e) => {
							e.currentTarget.classList.remove("animate-pulseShrink");
							e.currentTarget.classList.add("animate-pulseGrow");
						}}
					>
						<span className="font-medium">Download CV</span>
						<span className="material-symbols-rounded">download</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Hero;
