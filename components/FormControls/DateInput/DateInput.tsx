import Image from "next/image";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormContext } from "react-hook-form";
import Title from "../../Typography/Title/Title";

interface DateInputProps {
	name: string;
	label: string;
	validationCallback?: (date: Date) => boolean;
	wrapperClassName?: string;
	disabled?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({ validationCallback, name, label, wrapperClassName, ...rest }) => {
	const { setValue, watch } = useFormContext();
	const selectedDate = watch(name);

	const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const customHeader = ({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
		<div className='flex justify-between px-3 border-none bg-white dark:bg-blue-clay my-4'>
			<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
				<Image src='/assets/icon-arrow-left.svg' width={10} height={10} alt='arrow left' role='presentation' />
			</button>
			<Title as='h3' className='text-sm tracking-02 font-semibold' color='dark:text-link-water'>
				{months[date.getMonth()]} {date.getFullYear()}
			</Title>
			<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
				<Image
					src='/assets/icon-arrow-right.svg'
					width={10}
					height={10}
					alt='arrow right'
					role='presentation'
				/>
			</button>
		</div>
	);

	return (
		<div className={"flex flex-col relative " + wrapperClassName}>
			<label htmlFor={name} className='text-faded-blue dark:text-link-water font-sans font-light text-sm mb-2'>
				{label}
			</label>
			<DatePicker
				selected={new Date(selectedDate)}
				dateFormat='dd MMM yyyy'
				onChange={(date, e) => {
					const isValid = validationCallback?.(date) ?? true;
					if (isValid) {
						setValue(name, date);
					}
				}}
				className='dark:bg-blue-dark border border-faded-blue rounded-md p-2 text-blue-dark dark:text-link-water outline-none focus:border-purple-mimosa hover:border-purple-mimosa disabled:opacity-50 disabled:cursor-not-allowed w-full'
				calendarClassName='dark:bg-blue-clay rounded-md shadow-lg'
				renderCustomHeader={customHeader}
				dayClassName={(d) => {
					if (d.getUTCDate() === new Date(selectedDate).getUTCDate())
						return "bg-transparent text-purple-mimosa dark:text-purple-mimosa hover:bg-transparent dark:hover:bg-transparent";
					return "bg-transparent text-blue-dark dark:text-link-water hover:bg-transparent hover:text-purple-mimosa dark:hover:bg-transparent dark:hover:text-purple-mimosa";
				}}
				{...rest}
			/>
			<div className='absolute bottom-3 right-0 mt-3 mr-3'>
				<Image src='/assets/icon-calendar.svg' width={16} height={16} alt='calendar' role='presentation' />
			</div>
		</div>
	);
};

export default DateInput;
