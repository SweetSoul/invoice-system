import { useCallback, useRef, useState } from "react";
import { Calendar, CalendarTileProperties, ViewCallbackProperties } from "react-calendar";

interface Props {
	tasks: any[];
	className?: string;
	onSelectDay?: (date: Date) => void;
	onSelectMonth?: (date: Date) => void;
	isLoading?: boolean;
}

export default function ShipperCalendar({ tasks, className, onSelectDay, onSelectMonth }: Props) {
	const selectedDay = useRef<Date | null>(null);
	const selectedMonth = useRef<Date | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

	const handleChangeDay = (date: Date) => {
		selectedDay.current = new Date(date);
		onSelectDay?.(new Date(date));
		setSelectedDate(date);
	};

	const handleChangeMonth = (data: ViewCallbackProperties | Date) => {
		if ((data as ViewCallbackProperties)?.activeStartDate) {
			onSelectMonth?.(new Date((data as ViewCallbackProperties).activeStartDate));
			selectedMonth.current = new Date((data as ViewCallbackProperties).activeStartDate);
			return;
		}
		if (data as Date) {
			onSelectMonth?.(new Date(data as Date));
			selectedMonth.current = new Date(data as Date);
		}
	};

	const renderEvents = useCallback(
		({ date }: CalendarTileProperties) => {
			const day = date.getDate();
			const month = date.getMonth();
			const year = date.getFullYear();
			const filteredTasks = tasks.filter((task) => {
				const taskDate = new Date(task.date);
				return taskDate.getDate() === day && taskDate.getMonth() === month && taskDate.getFullYear() === year;
			});
			if (filteredTasks.length === 0) {
				return null;
			}
			return (
				<div className='flex flex-col items-center justify-center mb-'>
					<div className='w-2 h-2 rounded-full bg-indigo-400 group-hover:bg-indigo-50' />
				</div>
			);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[tasks, selectedMonth.current, selectedDay.current]
	);

	return (
		<Calendar
			tileContent={renderEvents}
			tileClassName='font-sans font-normal hover:bg-indigo-600 hover:text-white group p-1'
			className={`bg-gray-100 rounded-lg p-2 ${className}`}
			onClickDay={handleChangeDay}
			next2Label={null}
			prev2Label={null}
			minDetail='year'
			onClickMonth={handleChangeMonth}
			value={selectedDate || null}
			calendarType='US'
		/>
	);
}
