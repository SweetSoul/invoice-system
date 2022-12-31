type PopoverProps = {
	show: boolean;
	placement:
		| "top-right"
		| "center-right"
		| "bottom-right"
		| "top-center"
		| "bottom-center"
		| "top-left"
		| "center-left"
		| "bottom-left";
	children: React.ReactNode;
	setShow?: (prev: boolean) => void;
};

export default function Popover({ show, placement, setShow, children }: PopoverProps) {
	const horizontalPlacement = placement.split("-")[1];
	const verticalPlacement = placement.split("-")[0];
	let horizontalClass = "";
	let verticalClass = "";
	if (horizontalPlacement === "center") {
		horizontalClass = "left-1/2 transform -translate-x-1/2";
	} else {
		horizontalClass = `${horizontalPlacement === "left" ? "right" : "left"}-120`;
	}
	if (verticalPlacement === "center") {
		verticalClass = "top-1/2 transform -translate-y-1/2";
	} else {
		verticalClass = `${verticalPlacement === "top" ? "bottom" : "top"}-120`;
	}
	return (
		<div
			className={`absolute ${verticalClass} ${horizontalClass} bg-white rounded-md shadow-lg ${
				show ? "block" : "hidden"
			}`}
		>
			<div onClick={() => setShow?.(false)} className='fixed w-screen h-screen z-0' />
			<div
				className={`absolute z-0 ${
					verticalPlacement === "center"
						? "top-1/2 transform -translate-y-1/2"
						: `${verticalPlacement === "top" ? "bottom" : "top"}-4`
				} ${
					horizontalPlacement === "center"
						? "left-1/2 transform -translate-x-1/2"
						: `${horizontalPlacement === "left" ? "right" : "left"}-4`
				}`}
			>
				<div
					className={`w-3 h-3 bg-gray-400 ${
						verticalPlacement === "center"
							? "rotate-45"
							: `${verticalPlacement === "top" ? "rotate-45" : "-rotate-45"}`
					} ${
						horizontalPlacement === "center"
							? "rotate-45"
							: `${horizontalPlacement === "left" ? "-rotate-45" : "rotate-45"}`
					}`}
				></div>
			</div>
			<div className='z-10 relative'>{children}</div>
		</div>
	);
}
