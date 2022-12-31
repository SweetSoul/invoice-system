import { useState } from "react";
import { useFormContext } from "react-hook-form";
import TextInput from "../../../FormControls/TextInput/TextInput";
import Popover from "../../../Popover/Popover";

interface Props {
	mini?: boolean;
}

export default function CalendarSearch({ mini }: Props) {
	const [showSearch, setShowSearch] = useState(false);
	const { setValue } = useFormContext();

	function SearchInput() {
		return (
			<div className='flex gap-2 items-center p-4'>
				<TextInput
					name='calendarSearch'
					type='text'
					placeholder='Search by company name or task title'
					className='w-80'
				/>
				<button
					onClick={() => setValue("calendarSearch", "")}
					className='px-4 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 text-sm'
				>
					{mini ? "Clear" : "Clear search"}
				</button>
			</div>
		);
	}
	return (
		<>
			{mini ? (
				<div className='relative max-w-fit' title='Click to see filters'>
					<button
						onClick={() => setShowSearch((prev) => !prev)}
						className='bg-gray-300 hover:bg-gray-500 hover:text-white p-2 rounded-lg'
					>
						<svg
							stroke='currentColor'
							fill='none'
							strokeWidth='0'
							viewBox='0 0 24 24'
							height='1em'
							width='1em'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
							></path>
						</svg>
					</button>
					<Popover placement='center-right' show={showSearch}>
						<SearchInput />
					</Popover>
				</div>
			) : (
				<SearchInput />
			)}
		</>
	);
}
