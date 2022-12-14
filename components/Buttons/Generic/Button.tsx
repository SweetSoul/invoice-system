import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "2" | "3" | "4" | "5" | "6";
}

export default function Button(props: Props) {
	const { children, className, variant, ...rest } = props;

	const finalClassName = (variantName: string) => {
		const defaultClass = `rounded-full transition-colors duration-300 font-sans font-semibold text-sm tracking-wide ${
			className ?? ""
		}`;
		const defaultPadding = " p-3";
		const alternativePadding = " px-5 py-3";
		const bigPadding = " px-8 py-3";
		switch (variantName) {
			case "2":
				return "bg-purple-slate hover:bg-purple-mimosa text-white " + defaultClass + defaultPadding;
			case "3":
				return (
					"bg-white-lilac dark:bg-blue-clay hover:bg-link-water dark:hover:bg-white text-regent-grey dark:text-white-lilac dark:hover:text-faded-blue " +
					defaultClass +
					alternativePadding
				);
			case "4":
				return (
					"bg-bright-grey hover:bg-black dark:hover:bg-blue-dark text-regent-grey dark:text-link-water dark:hover:text-faded-blue " +
					defaultClass +
					defaultPadding
				);
			case "5":
				return "bg-valentine-red hover:bg-light-salmon-pink text-white " + defaultClass + alternativePadding;
			case "6":
				return (
					"bg-white-lilac hover:bg-link-water dark:bg-blue-clay dark:hover:bg-blue-dark text-faded-blue dark:text-link-water " +
					defaultClass +
					bigPadding
				);
			default:
				return defaultClass + defaultPadding;
		}
	};

	return (
		<>
			<button className={finalClassName(variant)} {...rest}>
				{children}
			</button>
		</>
	);
}
