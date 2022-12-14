import Image from "next/image";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import Button from "../Buttons/Generic/Button";
import TextInput from "../FormControls/TextInput/TextInput";
import DropdownItem from "./DropdownItem";

interface Props {
	placeholder: string;
	name: string;
	items: IDropdownItem[];
	variant?: "2";
	label?: string;
	wrapperClassName?: string;
	className?: string;
	validation?: InputValidation;
}

export interface IDropdownItem {
	id: string;
	value?: string;
}

interface InputValidation {
	isRequired?: boolean;
}

const Dropdown = ({ placeholder, variant, items, label, wrapperClassName, className, name, validation }: Props) => {
	const { setValue, watch } = useFormContext();
	const [isOpen, setIsOpen] = useState(false);
	const [focusIndex, setFocusIndex] = useState<number>();

	const selectedItem: IDropdownItem = watch(name);
	const dropdown = document.getElementById("dropdown");
	const dropdownPosition = dropdown?.getBoundingClientRect();
	const hasEnoughSpaceBelow = useMemo(() => {
		const dropdownHeight = dropdown?.offsetHeight;
		const windowHeight = window.innerHeight;
		const hasEnoughSpaceBelow = windowHeight - dropdownPosition?.bottom! > dropdownHeight!;
		return hasEnoughSpaceBelow;
	}, [dropdownPosition]);

	const handleClick = () => {
		setIsOpen((prev) => !prev);
	};

	const handleItemClick = (index?: number) => {
		setIsOpen(false);
		if (index !== undefined) setValue(name, items[index]);
	};

	const handleArrowPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (!isOpen && e.key === "ArrowDown") {
			setIsOpen(true);
		}
		if (isOpen && e.key === "ArrowUp" && focusIndex === 0) {
			return setIsOpen(false);
		}
		if (isOpen && e.key === "ArrowDown" && focusIndex === items.length - 1) {
			return;
		}
		if (isOpen && e.key === "ArrowUp" && focusIndex > 0) {
			setFocusIndex((prev) => prev - 1);
		}
		if (isOpen && e.key === "ArrowDown" && focusIndex < items.length - 1) {
			setFocusIndex((prev) => prev + 1);
		}
		if (isOpen && e.key === "Enter") {
			setValue(name, items[focusIndex]);
			setIsOpen(false);
		}
	};

	return (
		<div
			className={"relative cursor-pointer " + wrapperClassName}
			id='dropdown'
			onBlur={() => {
				if (!isOpen) return;
				setTimeout(() => setIsOpen(false), 100);
			}}
		>
			{!variant && label ? (
				<>
					<div className={"flex flex-col"}>
						<label
							htmlFor={name}
							className='text-faded-blue dark:text-link-water font-sans font-light text-sm mb-2'
						>
							{label}
						</label>
						<input
							type='text'
							onFocus={() => setIsOpen(true)}
							readOnly
							onKeyDown={handleArrowPress}
							className={`cursor-pointer invalid:border-valentine-red dark:bg-blue-dark border border-faded-blue rounded-md p-2 text-blue-dark dark:text-link-water outline-none focus:border-purple-mimosa hover:border-purple-mimosa ${
								className ? className : ""
							}`}
							value={selectedItem?.value || placeholder}
							required={validation.isRequired}
							aria-invalid={validation.isRequired && !selectedItem?.value}
							title={validation.isRequired && !selectedItem?.value ? "This field is required" : ""}
						/>
					</div>
				</>
			) : (
				<div className='bg-none p-0 pr-3 inline-flex items-center' onClick={handleClick}>
					<span className='mr-1 text-blue-dark dark:text-white font-bold font-sans'>
						{selectedItem?.value || placeholder}
					</span>
				</div>
			)}
			<Image
				src='/assets/icon-arrow-down.svg'
				width={10}
				height={6}
				alt='arrow down'
				className={`${!variant ? "absolute bottom-4 right-2" : ""}`}
				onClick={handleClick}
			/>
			<div
				className={`absolute drop-shadow-lg z-10 bg-white dark:bg-blue-clay mt-1 w-full rounded-lg overflow-auto max-h-select min-w-fit ${
					hasEnoughSpaceBelow ? "top-full" : "bottom-full"
				}`}
				style={{ display: isOpen ? "block" : "none" }}
			>
				{!!items?.length ? (
					<>
						{items.map((item, index) => (
							<div key={index}>
								<DropdownItem
									id={name}
									isFocused={focusIndex === index}
									onClick={() => handleItemClick(index)}
								>
									{item.value}
								</DropdownItem>
								{index !== items.length - 1 && <hr className='my-2' />}
							</div>
						))}
					</>
				) : (
					<>
						<DropdownItem id='noData' onClick={() => handleItemClick()} disabled>
							Nothing to display
						</DropdownItem>
					</>
				)}
			</div>
		</div>
	);
};

Dropdown.displayName = "Dropdown";

export default Dropdown;
