import Image from "next/image";
import { useEffect, useState } from "react";
import useDarkMode from "../../../hooks/useDarkMode";

export default function DarkModeToggler() {
	const [iconToRender, setIconToRender] = useState<string>();
	const { isDarkMode, toggle } = useDarkMode();

	useEffect(() => {
		setIconToRender(isDarkMode ? "icon-sun.svg" : "icon-moon.svg");
	}, [isDarkMode]);

	return (
		<button onClick={toggle} data-testid='dark-mode-toggler'>
			{iconToRender && <Image src={`/assets/${iconToRender}`} width={25} height={25} alt='Toggle dark mode' />}
		</button>
	);
}
