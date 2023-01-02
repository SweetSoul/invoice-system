import { useState } from "react";
import Popover from "../../../Popover/Popover";
import Subtitle from "../../../Typography/Subtitle/Subtitle";

interface Props<T extends Object> {
	config: T;
	setConfig: (config: T) => void;
	mini?: boolean;
}

export default function CalendarFilters<T>({ config, setConfig, mini }: Props<T>) {
	const [showFilters, setShowFilters] = useState(false);

	function Filters() {
		return (
			<div className='flex gap-2 items-center p-4'>
				{Array.isArray(Object.entries(config)) &&
					Object.entries(config).map(([key, value]) => {
						return (
							<div className='flex justify-center items-center' key={key}>
								<button
									className={`p-1 rounded-lg text-gray-600 ${
										value ? "bg-purple-mimosa group" : "bg-gray-400 group"
									}`}
									onClick={() => setConfig({ ...config, [key]: !value })}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className={`h-3 w-3 ${
											value
												? "stroke-white group-hover:stroke-gray-400"
												: "stroke-gray-400 group-hover:stroke-white"
										}`}
										fill='none'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M5 13l4 4L19 7'
										/>
									</svg>
								</button>
								<Subtitle color='text-gray-700 ml-2 capitalize'>{key.split("_").join(" ")}</Subtitle>
							</div>
						);
					})}
			</div>
		);
	}

	return (
		<>
			{mini ? (
				<div className='relative max-w-fit' title='Click to see filters'>
					<button
						onClick={() => setShowFilters((prev) => !prev)}
						className={`${
							showFilters ? "bg-gray-500" : "bg-gray-300"
						} hover:bg-gray-500 p-2 rounded-lg group`}
					>
						<svg
							className={`group-hover:stroke-white${showFilters ? " stroke-white" : " stroke-black"}`}
							fill='none'
							strokeWidth='1.5'
							viewBox='0 0 24 24'
							aria-hidden='true'
							height='1em'
							width='1em'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
							></path>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
							></path>
						</svg>
					</button>
					<Popover placement='bottom-right' show={showFilters}>
						<Filters />
					</Popover>
				</div>
			) : (
				<Filters />
			)}
		</>
	);
}
