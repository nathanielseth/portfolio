import { FaGithub, FaLinkedin } from "react-icons/fa";

const Contact = () => {
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<p className="font-light text-center text-xl md:text-xl">
				Please feel free to reach out,
				<br />
				email me at{" "}
				<a
					href="mailto:nathanielseth.dev@gmail.com"
					className="text-[#f9364d] font-bold text-2xl"
				>
					nathanielseth.dev@gmail.com
				</a>
				.
			</p>

			<div className="flex mt-10 space-x-4">
				<a
					href="https://github.com/nathanielseth"
					target="_blank"
					rel="noopener noreferrer"
					className="text-3xl text-white hover:text-[#f9364d]"
				>
					<FaGithub />
				</a>

				<a
					href="https://www.linkedin.com/in/nathanielseth"
					target="_blank"
					rel="noopener noreferrer"
					className="text-3xl text-white hover:text-blue-600"
				>
					<FaLinkedin />
				</a>
			</div>
		</div>
	);
};

export default Contact;
