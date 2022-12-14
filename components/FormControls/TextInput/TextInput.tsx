import { ChangeEvent, SetStateAction, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	name: string;
	type: "text" | "textarea" | "email" | "number" | "tel";
	placeholder?: string;
	rows?: number;
	validation?: InputValidation;
	label?: string;
	wrapperClassName?: string;
	className?: string;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	hasHoverBorderColor?: boolean;
	disabled?: boolean;
	autoComplete?: string;
	readOnly?: boolean;
	errorText?: string;
}

interface InputValidation {
	isRequired?: boolean;
	isNumber?: boolean;
	minLength?: number;
	maxLength?: number;
	callback?: (value: string) => boolean;
}

const TextInput = (props: Props) => {
	const { register, formState } = useFormContext();
	const {
		label,
		name,
		type,
		rows,
		validation,
		wrapperClassName,
		hasHoverBorderColor,
		className,
		errorText,
		onFocus,
		...rest
	} = props;

	let names: string[];
	names = name.split(".");
	const parentHasError = formState.errors?.[names?.[0]];
	const childHasError = !!parentHasError?.[names?.[1]];
	let hasError = formState.errors[names?.[0] ?? name] ? childHasError ?? true : false;

	return (
		<div className={"flex flex-col " + wrapperClassName}>
			{label && (
				<label
					htmlFor={name}
					className='text-faded-blue dark:text-link-water font-sans font-light text-sm mb-2'
				>
					{label}
				</label>
			)}
			{type === "textarea" ? (
				<textarea
					rows={rows}
					aria-invalid={hasError ? "true" : "false"}
					onFocus={onFocus}
					className={`invalid:border-valentine-red read-only:border-0 read-only:bg-transparent dark:read-only:bg-transparent dark:bg-blue-dark border border-faded-blue rounded-md p-2 text-blue-dark dark:text-link-water outline-none focus:border-purple-mimosa ${
						hasHoverBorderColor ? "hover:border-purple-mimosa" : ""
					} ${className ? className : ""}`}
					{...register(name, {
						required: validation?.isRequired,
						valueAsNumber: validation?.isNumber,
						validate: validation?.callback,
						minLength: validation?.minLength,
						maxLength: validation?.maxLength,
						shouldUnregister: true,
					})}
					{...rest}
				/>
			) : (
				<input
					type={type}
					aria-invalid={hasError}
					onFocus={onFocus}
					step={validation?.isNumber ? ".01" : undefined}
					className={`read-only:border-0 read-only:bg-transparent dark:read-only:bg-transparent dark:bg-blue-dark border border-faded-blue rounded-md p-2 text-blue-dark dark:text-link-water outline-none focus:border-purple-mimosa invalid:border-valentine-red ${
						hasHoverBorderColor ? "hover:border-purple-mimosa" : ""
					} ${className ? className : ""}`}
					{...register(name, {
						required: { value: validation?.isRequired, message: "This field is required" },
						valueAsNumber: validation?.isNumber,
						validate: validation?.callback,
						minLength: validation?.minLength,
						maxLength: validation?.maxLength,
						shouldUnregister: true,
					})}
					{...rest}
					title={
						hasError
							? errorText ||
							  formState.errors?.[names?.[0]]?.[names?.[1]].message ||
							  formState.errors?.[name]?.message
							: undefined
					}
				/>
			)}
		</div>
	);
};

TextInput.displayName = "TextInput";

export default TextInput;
