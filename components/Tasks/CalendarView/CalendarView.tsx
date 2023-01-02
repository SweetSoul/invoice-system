import { useState, useMemo, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import useDebounce from "../../../hooks/useDebounce";
import formatDate from "../../../util/formatDate";
import ShipperCalendar from "../../Calendar/calendar.component";
import TextInput from "../../FormControls/TextInput/TextInput";
import Popover from "../../Popover/Popover";
import HorizontalScrollable from "../../Scrollable/HorizontalScrollable";
import Subtitle from "../../Typography/Subtitle/Subtitle";
import Title from "../../Typography/Title/Title";
import CalendarFilters from "./Filters/CalendarFilters";
import CalendarSearch from "./Search/CalendarSearch";
import TaskCard from "./TaskCard/TaskCard";

interface Props {
	companies: string[];
	tasks: Task[];
}

export interface Task {
	id: string;
	createdAt: Date;
	title: string;
	shipperId: string;
	userId: string;
	taskDate: Date;
	taskType: TaskType;
	taskStatus: TaskStatus;
	note: string;
	updatedAt: Date;
	deletedAt: Date | null;
}

export enum TaskType {
	"INITIATE_WITH_CONTACT" = "initiate_with_contact",
	"FOLLOW_UP_CALL" = "follow_up_call",
	"FOLLOW_UP_EMAIL" = "follow_up_email",
	"FOLLOW_UP_SMS" = "follow_up_sms",
}

export enum TaskStatus {
	"PENDING" = "pending",
	"COMPLETED" = "completed",
	"POSTPONED" = "postponed",
	"DELETED" = "deleted",
}

interface Filters {
	show_overdue?: boolean;
	show_completed?: boolean;
	show_postponed?: boolean;
}

interface CalendarForm {
	calendarSearch: string;
}

export default function CalendarView({ companies, tasks }: Props) {
	const [selectedDay, setSelectedDay] = useState<Date>(new Date());
	const [filters, setFilters] = useState<Filters>({
		show_overdue: false,
		show_completed: false,
		show_postponed: false,
	});
	const [showCalendar, setShowCalendar] = useState(false);
	const [useMiniFilters, setUseMiniFilters] = useState(false);
	const [searchFilter, setSearchFilter] = useState("");
	const searchMethods = useForm();
	const calendarMethods = useForm<CalendarForm>();
	const endOfDay = new Date(selectedDay);
	endOfDay.setHours(23, 59, 59, 999);

	const handleChangeDay = (date: Date) => {
		setSelectedDay(date);
		setShowCalendar(false);
	};

	function handleToggleCalendar() {
		setShowCalendar((prev) => !prev);
	}

	function applyTaskFilters(task: Task, companyId: string, companyName: string) {
		let showTask = true;
		if (companyId !== task.shipperId) {
			return false;
		}
		if (searchFilter) {
			if (
				task.title.toLowerCase().includes(searchFilter?.toLowerCase()) ||
				task.note.toLowerCase().includes(searchFilter?.toLowerCase()) ||
				companyName.toLowerCase().includes(searchFilter?.toLowerCase())
			) {
				showTask = true;
			} else {
				return false;
			}
		}
		if (!filters.show_completed && task.taskStatus === TaskStatus.COMPLETED) {
			showTask = false;
		}
		if (!filters.show_postponed && task.taskStatus === TaskStatus.POSTPONED) {
			showTask = false;
		}
		if (!filters.show_overdue && new Date(task.taskDate) <= endOfDay) {
			showTask = false;
		} else if (
			`${new Date(task.taskDate).getDate()}${new Date(task.taskDate).getMonth()}${new Date(
				task.taskDate
			).getFullYear()}` === `${selectedDay.getDate()}${selectedDay.getMonth()}${selectedDay.getFullYear()}`
		) {
			showTask = true;
		}
		return showTask;
	}

	return (
		<>
			<div className='flex justify-center items-center mt-3'>
				<button
					className={`p-1 rounded-lg text-gray-600 ${
						useMiniFilters ? "bg-purple-mimosa group" : "bg-gray-400 group"
					}`}
					onClick={() => setUseMiniFilters((prev) => !prev)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className={`h-3 w-3 ${
							useMiniFilters
								? "stroke-white group-hover:stroke-gray-400"
								: "stroke-gray-400 group-hover:stroke-white"
						}`}
						fill='none'
						viewBox='0 0 24 24'
					>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
					</svg>
				</button>
				<Subtitle color='text-gray-700 ml-2 capitalize'>Use minimalistic filters</Subtitle>
			</div>
			<div>
				<FormProvider {...searchMethods}>
					<TextInput
						name='search'
						type='text'
						className='bg-transparent border-t-0 border-l-0 border-r-0 rounded-none border-b border-b-gray-300 max-w-lg'
						placeholder='🔍 Search'
					/>
				</FormProvider>
			</div>
			<div className='mt-7 flex items-stretch'>
				<button className='bg-gray-300 hover:bg-gray-500 p-3 rounded-tl-lg rounded-bl-lg text-gray-600 hover:text-white'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
					</svg>
				</button>
				<div className='flex items-center bg-gray-100 border border-gray-300 rounded-tr-lg rounded-br-lg px-4 py-3 w-full'>
					<div className='flex gap-2'>
						<Title as='h1' color='text-gray-700 mr-auto'>
							Your Tasks{" "}
						</Title>
						<div
							className='underline cursor-pointer relative'
							onClick={handleToggleCalendar}
							title='Click to toggle calendar'
						>
							<Title as='h1' color='text-gray-700 mr-auto' className='select-none'>
								{`${selectedDay.getDate()}${selectedDay.getMonth()}${selectedDay.getFullYear()}` ===
								`${new Date().getDate()}${new Date().getMonth()}${new Date().getFullYear()}`
									? "Today"
									: `on ${formatDate(selectedDay, {
											hideYear: true,
											styleDay: true,
											fullMonthName: true,
									  })}`}
							</Title>
							<Popover show={showCalendar} placement='center-right'>
								<ShipperCalendar events={tasks} onSelectDay={handleChangeDay} className='w-64' />
							</Popover>
						</div>
					</div>
				</div>
			</div>
			<div className='mt-5 flex gap-2 items-center'>
				<FormProvider {...calendarMethods}>
					<CalendarFilters config={filters} setConfig={setFilters} mini={useMiniFilters} />
					<CalendarSearch mini={useMiniFilters} setSearch={setSearchFilter} />
				</FormProvider>
			</div>
			<HorizontalScrollable className='mt-2 flex gap-2 max-w-full overflow-x-auto'>
				{companies.map((c, index) => {
					const filteredTasks = tasks?.filter((t) => applyTaskFilters(t, `${index + 1}`, c));

					return (
						<div
							className={`bg-gray-100 p-2 rounded-lg ${!!filteredTasks.length ? "block" : "hidden"}`}
							key={index}
						>
							<Title as='h2' color='text-gray-700'>
								{c}
							</Title>
							{filteredTasks?.map((t, index) => (
								<TaskCard task={t} key={index} />
							))}
						</div>
					);
				})}
			</HorizontalScrollable>
		</>
	);
}
