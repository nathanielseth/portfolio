const Hero = () => {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="max-w-2xl mx-auto text-center">
				<h1 className="text-4xl md:text-5xl font-semibold mb-12">
					My name is <span className="text-[#f9364d]">Nathaniel Seth</span>,
					<br />
					I&apos;m a Full-Stack developer.
				</h1>
				<p className="mt-4 text-sm text-zinc-400 md:text-base mb-12 max-w-sm mx-auto md:max-w-lg">
					I am a Computer Science student who is wholeheartedly dedicated to the
					concept and principles of continuous, lifelong learning.
				</p>
				<div className="mt-8 flex justify-center items-center">
					<a
						href="/assets/seth_cv.pdf"
						download
						className="inline-flex items-center gap-1 bg-[#f9364d] text-white px-6 h-12 rounded-full"
					>
						<span className="font-bold text-base leading-none">
							Download CV
						</span>
						<span className="material-symbols-rounded text-lg leading-none align-middle">
							download
						</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Hero;
