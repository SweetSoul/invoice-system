interface Config {
	hideYear?: boolean;
	styleDay?: boolean;
	fullMonthName?: boolean;
	showTime?: boolean;
}

export default function formatDate(isoDate: string | Date, config?: Config): string {
	const date = new Date(isoDate);
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const monthNames = config?.fullMonthName
		? [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
		  ]
		: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	const formattedDate = `${day}${
		config?.styleDay ? (day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th") : ""
	} ${config?.styleDay ? "of " + monthNames[month] : monthNames[month]}${config?.hideYear ? "" : ` ${year}`}${
		config?.showTime
			? ` - ${hours < 10 ? "0" + hours : hours > 12 ? hours - 12 : hours}:${
					minutes < 10 ? "0" + minutes : minutes
			  } ${hours < 12 ? "AM" : "PM"}`
			: ""
	}`;
	return formattedDate;
}
