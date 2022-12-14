import Image from "next/image";
import { useSession } from "next-auth/react";

interface Props {
	fullPage?: boolean;
	loading?: boolean;
}

export default function Loader({ fullPage, loading }: Props) {
	const { status } = useSession();
	const isLoading = loading || status === "loading";
	if (!isLoading) return null;

	return (
		<div
			className={`flex items-center justify-center inset-0 bg-black bg-opacity-60 z-50 ${
				fullPage ? "w-screen h-screen fixed" : "absolute w-full h-full"
			}`}
		>
			<Image
				src='/assets/loader.svg'
				width={50}
				height={50}
				alt='Loader'
				role='presentation'
				className='fill-purple-mimosa'
			/>
		</div>
	);
}
