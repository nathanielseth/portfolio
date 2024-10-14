import SkillBox from "./SkillBox";
import { skills } from "../utils/skillsData";

const Skills = () => {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen py-10">
			<h2 className="text-center text-2xl md:text-3xl mb-10">
				Skills & Technologies
			</h2>

			<div className="grid gap-3 grid-cols-2 md:grid-cols-3 max-w-3xl w-full px-4">
				{skills.map((skill, index) => (
					<SkillBox
						key={index}
						Icon={skill.icon}
						label={skill.name}
						color={skill.color}
					/>
				))}
			</div>
		</div>
	);
};

export default Skills;
