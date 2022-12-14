import Image from "next/image";
import { useState } from "react";
import InvoiceModal from "../../Modals/Invoice/InvoiceModal";
import BtnTitle from "../../Typography/BtnText/BtnText";
import Button from "../Generic/Button";

export default function NewInvoiceBtn() {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(true);
	};
	return (
		<>
			<Button
				className='flex gap-4 align-middle text-white bg-purple-slate hover:bg-purple-mimosa'
				onClick={handleClick}
			>
				<div className='rounded-full w-9 h-9 grid place-items-center bg-white p-2'>
					<Image
						src='/assets/icon-plus.svg'
						width={12}
						height={12}
						className='color-white'
						alt=''
						role='presentation'
					/>
				</div>
				<BtnTitle>New Invoice</BtnTitle>
			</Button>
			<InvoiceModal setIsOpen={setIsOpen} isOpen={isOpen} />
		</>
	);
}
