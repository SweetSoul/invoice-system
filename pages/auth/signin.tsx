import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Button from "../../components/Buttons/Generic/Button";
import Layout from "../../components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignIn({ providers }) {
	const { data: session, status } = useSession();
	const router = useRouter();
	const loading = status === "loading";

	useEffect(() => {
		if (session && !loading) {
			router.push("/");
		}
	}, [session, loading, router]);

	return (
		<Layout>
			<div className='flex justify-center items-center h-screen'>
				{!!providers &&
					Object?.values(providers).map((provider: any) => (
						<div key={provider.name}>
							<Button
								variant='2'
								onClick={() => signIn(provider.id)}
								className='flex items-center justify-center gap-2'
							>
								<Image
									src={`/assets/${provider.id}-logo.svg`}
									width={20}
									height={20}
									alt='Github Logo'
								/>
								Sign in with {provider.name}
							</Button>
						</div>
					))}
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const providers = await getProviders();
	return {
		props: { providers },
	};
}
