import { useRef, useEffect } from "react";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function HorizontalScrollable({ children, className }: Props) {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const div = ref.current;
		if (!div) {
			return;
		}

		const handleMouseMove = (event: MouseEvent) => {
			event.preventDefault();
			div.scrollLeft += event.movementX;
			div.scrollTop += event.movementY;
		};

		const handleMouseUp = () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};

		const handleWheel = (event: WheelEvent) => {
			if (
				(div.scrollLeft === 0 && event.deltaY < 0) ||
				(div.scrollLeft === div.scrollWidth - div.clientWidth && event.deltaY > 0)
			) {
				return;
			}
			event.preventDefault();
			div.scrollLeft += event.deltaY;
		};

		div.addEventListener("mousedown", (event: MouseEvent) => {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		});
		div.addEventListener("wheel", handleWheel);
		return () => {
			div.removeEventListener("mousedown", (e) => {
				window.removeEventListener("mousemove", handleMouseMove);
				window.removeEventListener("mouseup", handleMouseUp);
			});
			div.removeEventListener("wheel", handleWheel);
		};
	}, [ref]);

	return (
		<div className={`overflow-x-auto ${className}`} ref={ref}>
			{children}
		</div>
	);
}
