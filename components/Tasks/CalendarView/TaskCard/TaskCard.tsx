import formatDate from "../../../../util/formatDate";
import Subtitle from "../../../Typography/Subtitle/Subtitle";
import Title from "../../../Typography/Title/Title";
import { Task, TaskStatus, TaskType } from "../CalendarView";
import TaskIcon from "./TaskIcon";

interface Props {
	task: Task;
}

export default function TaskCard({ task }: Props) {
	function capitalizeOnlyFirstLetter(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	//This below could be a global configuration where the user defines if a task that is
	//from the same day but on earlier ours is overdue or not
	const startOfDay = new Date();
	startOfDay.setHours(0, 0, 0, 0);
	const isOverdue = new Date(task?.taskDate) <= startOfDay;
	const isPostponed = task?.taskStatus === TaskStatus.POSTPONED;
	const isCompleted = task?.taskStatus === TaskStatus.COMPLETED;

	return (
		<>
			<div className='mt-3 group hover:bg-indigo-600 cursor-pointer max-w-[25vw] overflow-hidden'>
				<div className='flex gap-4 p-2 max-w-full'>
					<div className='flex-shrink-0 basis-auto w-[7%] mt-1'>
						<div className='w-7 h-7 flex items-center justify-center bg-gray-600 group-hover:bg-gray-100 rounded-full p-2'>
							<TaskIcon taskType={task?.taskType} />
						</div>
					</div>
					<div className='flex-auto w-[88%]'>
						<Title as='h3' color='text-gray-800 group-hover:text-white-lilac truncate font-medium'>
							{capitalizeOnlyFirstLetter(task?.title)}
						</Title>
						<Subtitle color='text-gray-500 group-hover:text-white-lilac'>
							{isOverdue ? (
								<span>
									<span className='text-red-600 group-hover:text-black'>Overdue</span> -{" "}
								</span>
							) : isPostponed ? (
								<span>
									<span className='text-amber-600 group-hover:text-black'>Postponed</span> -{" "}
								</span>
							) : isCompleted ? (
								<span>
									<span className='text-emerald-600 group-hover:text-black'>Completed</span> -{" "}
								</span>
							) : (
								""
							)}
							{formatDate(task?.taskDate, { showTime: true })}
						</Subtitle>
						{task?.note && (
							<Subtitle className='truncate mt-1' color='text-gray-500 group-hover:text-white-lilac'>
								{task?.note}
							</Subtitle>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
