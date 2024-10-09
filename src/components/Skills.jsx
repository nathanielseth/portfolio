import { RiJavascriptFill } from "react-icons/ri";
import { SiCsharp } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa6";
import { FaReact } from "react-icons/fa6";
import { SiDotnet } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";

const Skills = () => {
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<h2 className="text-center text-2xl  md:text-3xl mb-8">
				Skills & Technologies
			</h2>
			<div className="flex flex-wrap items-center justify-center gap-4">
				<div className="p-3">
					<RiJavascriptFill className="text-5xl text-yellow-400" />
				</div>
				<div className="p-3">
					<SiCsharp className="text-5xl text-purple-600" />
				</div>
				<div className="p-3">
					<SiDotnet className="text-5xl text-blue-600" />
				</div>
				<div className="p-3">
					<FaReact className="text-5xl text-cyan-400" />
				</div>
				<div className="p-3">
					<FaNodeJs className="text-5xl text-green-600" />
				</div>
				<div className="p-3">
					<BiLogoPostgresql className="text-5xl text-blue-800" />
				</div>
			</div>
		</div>
	);
};

export default Skills;
