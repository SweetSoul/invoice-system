import "../styles/globals.css";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Loader from "../components/Loader/Loader";
import Head from "next/head";
import { League_Spartan } from "@next/font/google";

const spartan = League_Spartan({
	weight: ["400", "500", "600", "700"],
	style: "normal",
	display: "swap",
	preload: true,
	subsets: ["latin"],
});

const App = ({ Component, pageProps }: AppProps) => {
	const AnyComp = Component as any;
	return (
		<SessionProvider session={pageProps.session}>
			<style jsx global>
				{`
					:root {
						--spartan-font: ${spartan.style.fontFamily};
					}
				`}
			</style>
			<Head>
				<title>Invoice App</title>
				<meta name='description' content='Invoice App' />
				<link rel='icon' href='/assets/favicon-32x32.png' />
			</Head>
			<Loader fullPage />
			<AnyComp {...pageProps} />
		</SessionProvider>
	);
};

export default App;
