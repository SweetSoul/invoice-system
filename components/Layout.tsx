import React, { ReactNode } from "react";
import useDarkMode from "../hooks/useDarkMode";
import SideMenu from "./SideMenu/SideMenu";

type Props = {
	children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
	const [mounted, setMounted] = React.useState(false);

	const { isDarkMode } = useDarkMode();

	React.useEffect(() => setMounted(true), []);

	if (!mounted)
		return (
			<div>
				<SideMenu />
				<main className='grid place-items-center bg-link-water dark:bg-blue-dark'>{props.children}</main>
			</div>
		);

	return (
		<>
			<div className={isDarkMode ? "dark" : ""}>
				<SideMenu />
				<main className='flex flex-col items-center pt-7 bg-link-water dark:bg-mirage min-h-screen w-screen'>
					<div className='w-full max-w-screen-60'>{props.children}</div>
				</main>
			</div>
		</>
	);
};

export default Layout;
