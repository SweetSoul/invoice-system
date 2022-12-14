export default function formatDate(isoDate: string): string {
	const date = new Date(isoDate);
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const formattedDate = `${day} ${monthNames[month]} ${year}`;
	return formattedDate;
}
