const Contact = () => {
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<p className="font-light text-center text-xl md:text-xl">
				Please feel free to reach out,
				<br />
				contact me at{" "}
				<a
					href="mailto:nathanielseth.dev@gmail.com"
					className="text-[#f9364d] font-bold text-2xl"
				>
					nathanielseth.dev@gmail.com
				</a>
				.
			</p>
		</div>
	);
};

export default Contact;
