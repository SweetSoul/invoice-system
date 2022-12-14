import { useFormContext } from "react-hook-form";
import Title from "../Typography/Title/Title";

interface Props {
	children: React.ReactNode;
	onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	disabled?: boolean;
	id: string;
	isFocused?: boolean;
}

export default function DropdownItem({ onClick, children, disabled, id, isFocused }: Props) {
	const { setValue } = useFormContext();
	const textColor = `${
		isFocused ? "text-purple-mimosa dark:text-purple-mimosa" : "text-black dark:text-white-lilac"
	} hover:text-purple-mimosa dark:hover:text-purple-mimosa`;

	return (
		<div
			onClick={onClick}
			className={`px-5 py-2 rounded my-1 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
		>
			<Title id={id} as='h3' label='Dropdown option' color={textColor}>
				{children}
			</Title>
		</div>
	);
}
