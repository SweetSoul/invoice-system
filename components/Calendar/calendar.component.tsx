import { useCallback, useRef, useState } from "react";
import { Calendar, CalendarTileProperties, ViewCallbackProperties } from "react-calendar";

interface IProps {
	events: any[];
	className?: string;
	onSelectDay?: (date: Date) => void;
	onSelectMonth?: (date: Date) => void;
	isLoading?: boolean;
}

export default function ShipperCalendar(props: IProps) {
	const selectedDay = useRef<Date | null>(null);
	const selectedMonth = useRef<Date | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

	const handleChangeDay = (date: Date) => {
		selectedDay.current = new Date(date);
		props.onSelectDay?.(new Date(date));
		setSelectedDate(date);
	};

	const handleChangeMonth = (data: ViewCallbackProperties | Date) => {
		if ((data as ViewCallbackProperties)?.activeStartDate) {
			props.onSelectMonth?.(new Date((data as ViewCallbackProperties).activeStartDate));
			selectedMonth.current = new Date((data as ViewCallbackProperties).activeStartDate);
			setSelectedDate(undefined);
			return;
		}
		if (data as Date) {
			props.onSelectMonth?.(new Date(data as Date));
			selectedMonth.current = new Date(data as Date);
			setSelectedDate(undefined);
		}
	};

	const renderEvents = useCallback(
		({ date }: CalendarTileProperties) => {
			const day = date.getDate();
			const month = date.getMonth();
			const year = date.getFullYear();
			const events = props.events.filter((event) => {
				const eventDate = new Date(event.date);
				return (
					eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year
				);
			});
			if (events.length === 0) {
				return null;
			}
			return (
				<div className='flex flex-col items-center justify-center mb-'>
					<div className='w-2 h-2 rounded-full bg-purple-mimosa group-hover:bg-purple-50' />
				</div>
			);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props.events, selectedMonth.current, selectedDay.current]
	);

	return (
		<Calendar
			tileContent={renderEvents}
			tileClassName='font-sans font-normal hover:bg-purple-slate hover:text-white group p-1'
			className='bg-gray-100 rounded-lg p-2'
			onClickDay={handleChangeDay}
			next2Label={null}
			prev2Label={null}
			minDetail='month'
			onActiveStartDateChange={handleChangeMonth}
			onClickMonth={handleChangeMonth}
			value={selectedDate || null}
			calendarType='US'
		/>
	);
}
