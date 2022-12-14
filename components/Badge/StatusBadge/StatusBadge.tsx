import Title from "../../Typography/Title/Title";

interface Props {
	status: string;
	className?: string;
	smallBadge?: boolean;
}

export default function StatusBadge({ status, className, smallBadge }: Props) {
	const bg = status === "paid" ? "bg-green-500" : status === "pending" ? "bg-orange" : "bg-faded-blue";
	const txt =
		status === "paid"
			? "text-green-500"
			: status === "pending"
			? "text-orange"
			: "text-faded-blue dark:text-link-water";
	return (
		<div
			className={`rounded ${
				smallBadge ? "w-auto" : "w-28"
			} py-3 px-4 flex items-center justify-center gap-2 ${bg} bg-opacity-10 ${className}`}
		>
			<div className={`w-2 h-2 rounded-full ${bg}`} />
			<Title as='h3' label='Status' color={`${txt}`}>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</Title>
		</div>
	);
}
