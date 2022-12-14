import Image from "next/image";
import React from "react";
import DarkModeToggler from "../Buttons/DarkModeToggler/DarkModeToggler";
import { signOut, useSession } from "next-auth/react";
import Title from "../Typography/Title/Title";
import Link from "next/link";
import Button from "../Buttons/Generic/Button";
import getUserConfirmation from "../../util/confirmationDialog";
import { useRouter } from "next/router";

const SideMenu: React.FC = () => {
	const { data: session } = useSession();
	const router = useRouter();

	const handleLogout = async () => {
		const confirmation = await getUserConfirmation("Are you sure you want to logout?");
		if (confirmation.value) {
			signOut();
			router.push("/");
		}
	};

	return (
		<div className='fixed z-50 left-0 top-0 h-full w-36 bg-blue-dark rounded-r-3xl flex flex-col justify-between'>
			<div className='bg-purple-slate w-full h-32 rounded-r-3xl relative overflow-hidden grid place-items-center'>
				<div className='w-full h-16 absolute z-0 bottom-0 rounded-tl-3xl bg-purple-mimosa' />
				<Image src='/assets/logo.svg' alt='Bask Health Logo' width={56} height={52} className='relative z-10' />
			</div>
			<div>
				<div className='flex justify-center mb-4'>
					<DarkModeToggler />
				</div>
				<div className='w-full h-32 relative overflow-hidden grid place-items-center border-t-2 border-t-blue-clay'>
					{session ? (
						<Button onClick={handleLogout}>
							<Image
								src={session.user?.image || "/assets/image-avatar.jpg"}
								alt='Your avatar'
								width={50}
								height={50}
								className='rounded-full mx-auto'
							/>
							<Title as='h3' color='text-white-lilac'>
								{session.user.name}
							</Title>
						</Button>
					) : (
						<Link href='/auth/signin'>
							<Title as='h3' className='cursor-pointer' color='text-white-lilac'>
								Sign in
							</Title>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default SideMenu;
