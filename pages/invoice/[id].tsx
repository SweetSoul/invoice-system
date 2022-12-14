import Image from "next/image";
import Link from "next/link";
import { Invoice } from "../../@types/invoice.types";
import InvoiceHeader from "../../components/Invoice/Header/InvoiceHeader";
import Layout from "../../components/Layout";
import Subtitle from "../../components/Typography/Subtitle/Subtitle";
import prisma from "../../lib/prisma";
import React, { useState } from "react";
import { TEditInvoiceCtx } from "../../@types/context.types";
import InvoiceBody from "../../components/Invoice/Body/InvoiceBody";

export async function getServerSideProps(context) {
	const { id } = context.query;
	const invoice = await prisma.invoice.findUnique({
		where: {
			id: Number(id),
		},
		include: {
			senderAddress: true,
			clientAddress: true,
			items: true,
		},
	});
	return {
		props: {
			invoice: JSON.parse(JSON.stringify(invoice)),
		},
	};
}

interface Props {
	invoice: Invoice;
}

export const EditInvoiceCtx = React.createContext<TEditInvoiceCtx>({
	invoice: {} as Invoice,
	setInvoice: () => {},
});
export const InvoiceCtxConsumer = EditInvoiceCtx.Consumer;
export default function InvoicePage({ invoice }: Props) {
	const [invoiceData, setInvoiceData] = useState<Invoice>(invoice);
	return (
		<EditInvoiceCtx.Provider value={{ invoice: invoiceData, setInvoice: setInvoiceData }}>
			<Layout>
				<Link href='/'>
					<div className='flex gap-2 items-center cursor-pointer'>
						<Image src='/assets/icon-arrow-left.svg' width={9} height={15} alt='Arrow Left' />
						<Subtitle label='Go Back' className='font-semibold'>
							Go Back
						</Subtitle>
					</div>
				</Link>
				<InvoiceHeader invoice={invoiceData} />
				<InvoiceBody invoice={invoiceData} />
			</Layout>
		</EditInvoiceCtx.Provider>
	);
}
