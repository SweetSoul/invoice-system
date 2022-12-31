import Layout from "../../components/Layout";
import CalendarView, { Task, TaskStatus, TaskType } from "../../components/Tasks/CalendarView/CalendarView";
import { faker } from "@faker-js/faker";

export async function getServerSideProps() {
	const res = await fetch("https://6040127af3abf00017785815.mockapi.io/api/v3/tasks", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const tasks: Task[] = await res.json();
	const companies = ["Apple", "Samsung", "3M", "Pepsico", "Coca-cola"];

	return {
		props: {
			companies,
			tasks,
		},
	};
}

export default function Tasks({ companies, tasks }) {
	function mockFactory(): Partial<Task>[] {
		const m: Partial<Task>[] = new Array(20).fill(0).map((_) => {
			let shipperId = Math.floor(Math.random() * 5 + 1).toString();
			let taskType = Object.values(TaskType)[Math.floor(Math.random() * Object.values(TaskType).length)];
			let taskStatus = Object.values(TaskStatus)[Math.floor(Math.random() * Object.values(TaskStatus).length)];
			let deletedAt = taskStatus === TaskStatus.DELETED ? new Date() : null;
			return {
				createdAt: new Date(),
				title: faker.hacker.phrase(),
				shipperId,
				userId: shipperId,
				taskDate: new Date(
					Math.random() * (new Date(2022, 11, 31).getTime() - new Date(2022, 1, 1).getTime()) +
						new Date(2022, 1, 1).getTime()
				),
				taskType,
				taskStatus,
				note: faker.hacker.phrase(),
				updatedAt: new Date(),
				deletedAt,
			};
		});
		return m;
	}

	async function handleAddMock() {
		const body = await mockFactory();
		await fetch("https://6040127af3abf00017785815.mockapi.io/api/v3/tasks", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
	}

	return (
		<Layout alternative>
			<CalendarView companies={companies} tasks={tasks} />
		</Layout>
	);
}
