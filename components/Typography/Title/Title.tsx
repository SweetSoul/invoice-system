import React from "react";

interface Props {
	id?: string;
	as?: "h1" | "h2" | "h3" | "h4";
	className?: string;
	children: React.ReactNode;
	label?: string;
	color?: string;
}

export default function Title({ children, as = "h1", className, label, color, id }: Props) {
	const titleSize = as === "h1" ? "text-3xl" : as === "h2" ? "text-xl" : as === "h3" ? "text-base" : "text-xs";
	const titleHeight = as === "h1" ? "leading-9" : as === "h4" ? "leading-tight" : "leading-normal";
	const titleWeight = "font-bold";
	const titleFamily = "font-sans";
	const titleSpacing = as === "h1" ? "tracking-normal" : as === "h2" ? "tracking-tight" : "tracking-tighter";
	const titleColor = color ? color : "text-onyx dark:text-white";

	const titleClassName = `${titleSize} ${titleHeight} ${titleWeight} ${titleFamily} ${titleSpacing} ${titleColor} ${
		className ? " " + className : ""
	}`;

	const titleAttributes = {
		className: titleClassName,
		"aria-label": label ?? as === "h1" ? "Page title" : "Section title",
		id,
		title: typeof children === "string" ? children : label,
	};

	const Title = () => React.createElement(as, titleAttributes, children);
	return <Title />;
}
