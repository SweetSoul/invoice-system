import React from "react";

interface Props {
	className?: string;
	children: React.ReactNode;
}

export default function BtnTitle({ children, className }: Props) {
	const btnTitleSize = "text-base";
	const btnTitleHeight = "leading-loose";
	const btnTitleWeight = "font-bold";
	const btnTitleFamily = "font-sans";
	const btnTitleSpacing = "tracking-wide";
	const btnTitleColor = "text-white";

	const btnTitleClassName = `${btnTitleSize} ${btnTitleHeight} ${btnTitleWeight} ${btnTitleFamily} ${btnTitleSpacing} ${btnTitleColor} ${
		className ? " " + className : ""
	}`;

	const btnTitleAttributes = { className: btnTitleClassName };

	const BtnTitle = () => React.createElement("span", btnTitleAttributes, children);
	return <BtnTitle />;
}
