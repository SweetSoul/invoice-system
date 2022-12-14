import React from "react";

interface Props {
	alternative?: boolean;
	className?: string;
	children: React.ReactNode;
	label?: string;
	color?: string;
}

export default function Subtitle({ children, className, alternative, label, color }: Props) {
	const subtitleSize = alternative ? "text-11" : "text-xs";
	const subtitleHeight = alternative ? "leading-relaxed" : "leading-tight";
	const subtitleWeight = "font-semibold";
	const subtitleFamily = "font-sans";
	const subtitleSpacing = alternative ? "tracking-23" : "tracking-25";
	const subtitleColor = color ? color : "text-regent-grey dark:text-link-water";

	const subtitleClassName = `${subtitleSize} ${subtitleHeight} ${subtitleWeight} ${subtitleFamily} ${subtitleSpacing} ${subtitleColor} ${
		className ? " " + className : ""
	}`;

	const subtitleAttributes = {
		className: subtitleClassName,
		"aria-label": label ?? "Page Text",
	};

	const Subtitle = () => React.createElement("p", subtitleAttributes, children);
	return <Subtitle />;
}
