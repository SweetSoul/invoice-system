import { useState } from "react";
import Layout from "../../components/Layout";
import CalendarView from "../../components/Tasks/CalendarView/CalendarView";
import FlexView from "../../components/Tasks/FlexView/FlexView";

export default function Tasks() {
	const [view, setView] = useState<"flex" | "calendar">("flex");
	const companies = [
		"Company Name",
		"Company Name 2",
		"Company with a really long name to see if it will fit or do something else",
	];

	const handleViewChange = (newView: "flex" | "calendar") => {
		setView(newView);
	};

	return (
		<Layout alternative>
			<div className='flex items-center justify-center'>
				<button
					className={`${
						view === "flex" ? "bg-gray-300" : "bg-gray-100"
					} hover:bg-gray-500 p-3 rounded-tl-lg rounded-bl-lg text-gray-600 hover:text-white`}
					onClick={() => handleViewChange("flex")}
				>
					Flex View
				</button>
				<button
					className={`${
						view === "calendar" ? "bg-gray-300" : "bg-gray-100"
					} hover:bg-gray-500 p-3 rounded-tr-lg rounded-br-lg text-gray-600 hover:text-white`}
					onClick={() => handleViewChange("calendar")}
				>
					Calendar View
				</button>
			</div>

			{view === "flex" ? <FlexView companies={companies} /> : <CalendarView companies={companies} />}
		</Layout>
	);
}
