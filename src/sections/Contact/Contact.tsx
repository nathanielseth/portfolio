import { useRef, useState } from "react";
import { m } from "motion/react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../../components/Icons";

const EMAIL = "nathanielseth.dev@gmail.com";

const SOCIAL_LINKS = [
	{
		id: "github",
		href: "https://github.com/nathanielseth",
		label: "GitHub profile",
		Icon: GithubIcon,
	},
	{
		id: "linkedin",
		href: "https://www.linkedin.com/in/nathanielseth",
		label: "LinkedIn profile",
		Icon: LinkedinIcon,
	},
	{
		id: "email",
		href: `mailto:${EMAIL}`,
		label: "Send email",
		Icon: Mail,
	},
] as const;

const FADE_UP = {
	hidden: { opacity: 0, y: 30 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
} as const;

const STAGGER = {
	hidden: {},
	show: { transition: { staggerChildren: 0.6 } },
} as const;

export default function Contact() {
	const [tooltipText, setTooltipText] = useState("Click to copy");
	const [showTooltip, setShowTooltip] = useState(false);

	const copiedRef = useRef(false);

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(EMAIL);
		} catch (error) {
			console.error("Failed to copy using Clipboard API:", error);
			return;
		}

		setTooltipText("Copied!");
		copiedRef.current = true;
		setShowTooltip(true);

		const hideId = setTimeout(() => {
			setShowTooltip(false);
			const resetId = setTimeout(() => {
				setTooltipText("Click to copy");
				copiedRef.current = false;
			}, 200);
			return () => clearTimeout(resetId);
		}, 1900);
		return () => clearTimeout(hideId);
	};

	return (
		<m.div
			className="flex flex-col justify-between items-center h-screen"
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			variants={STAGGER}
		>
			<div className="grow flex flex-col justify-center items-center">
				{/* email */}
				<m.div
					className="font-normal text-center text-l md:text-xl"
					variants={FADE_UP}
				>
					Please feel free to reach out at
					<br />
					<span className="relative inline-block">
						<button
							type="button"
							onClick={copyEmail}
							onMouseEnter={() => setShowTooltip(true)}
							onMouseLeave={() => !copiedRef.current && setShowTooltip(false)}
							className="accent-text font-medium text-xl md:text-2xl cursor-pointer"
							aria-label={`Copy ${EMAIL} to clipboard`}
						>
							{EMAIL}
						</button>

						{/* tooltip */}
						<m.div
							className="absolute top-full left-1/2 -translate-x-1/2 mt-1 pointer-events-none"
							animate={
								showTooltip ? { opacity: 1, y: 2 } : { opacity: 0, y: -5 }
							}
							transition={{ duration: 0.1 }}
						>
							<div className="relative z-10 px-2 py-1.5 text-sm leading-none text-zinc-50 bg-zinc-900 rounded-md shadow-lg whitespace-nowrap">
								{tooltipText}
							</div>
							<div className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 bg-zinc-900 rotate-45" />
						</m.div>
					</span>
				</m.div>

				{/* social links */}
				<m.div
					className="flex mt-11 space-x-5"
					variants={{
						hidden: { opacity: 0, y: 30 },
						show: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.5, delay: 0.2 },
						},
					}}
				>
					{SOCIAL_LINKS.map(({ id, href, label, Icon }) => (
						<m.a
							key={id}
							href={href}
							target={id !== "email" ? "_blank" : undefined}
							rel={id !== "email" ? "noopener noreferrer" : undefined}
							className="text-2xl md:text-3xl text-zinc-600 hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-zinc-50 transition-colors"
							whileHover={{ y: -2 }}
							aria-label={label}
						>
							<Icon />
						</m.a>
					))}
				</m.div>
			</div>

			{/* footer */}
			<m.div
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				variants={FADE_UP}
				className="text-sm font-light md:text-base mb-5 text-center text-zinc-600 dark:text-zinc-500"
			>
				© nathanielseth.dev
			</m.div>
		</m.div>
	);
}