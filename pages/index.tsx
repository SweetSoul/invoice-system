import React, { useEffect, useState } from "react";
import NewInvoiceBtn from "../components/Buttons/NewInvoice/NewInvoiceBtn";
import InvoiceCard from "../components/Cards/Invoice/InvoiceCard";
import Dropdown, { IDropdownItem } from "../components/Dropdown/Dropdown";
import Layout from "../components/Layout";
import Subtitle from "../components/Typography/Subtitle/Subtitle";
import Title from "../components/Typography/Title/Title";
import prisma from "../lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import useUpdateEffect from "../hooks/useUpdateEffect";
import { TAddInvoiceCtx } from "../@types/context.types";
import { Invoice } from "../@types/invoice.types";

export async function getServerSideProps() {
	const invoices = await prisma.invoice.findMany({
		include: {
			senderAddress: true,
			clientAddress: true,
			items: true,
		},
	});
	return {
		props: {
			invoices: JSON.parse(JSON.stringify(invoices)),
		},
	};
}

export interface FilterForm {
	status: IDropdownItem;
}

interface Props {
	invoices: Invoice[];
}

export const AddInvoiceCtx = React.createContext<TAddInvoiceCtx>({
	invoices: [],
	setInvoices: () => {},
});
export const InvoiceCtxConsumer = AddInvoiceCtx.Consumer;
export default function Homepage({ invoices }: Props) {
	const { data: session, status } = useSession();
	const [filteredInvoices, setFilteredInvoices] = useState(invoices);
	const [invoicesData, setInvoicesData] = useState(invoices);
	const totalInvoices = invoices.length;
	const router = useRouter();
	const filterMethods = useForm<FilterForm>({
		defaultValues: { status: {} },
	});
	const loading = status === "loading";
	const selectedFilter = filterMethods.watch("status");

	//draft/pending/paid
	const filterOptions = [
		{ id: "draft", value: "Draft" },
		{ id: "pending", value: "Pending" },
		{ id: "paid", value: "Paid" },
	];

	const clearFilter = () => {
		filterMethods.reset();
	};

	useEffect(() => {
		if (!session && !loading) {
			router.push("/auth/signin");
		}
	}, [session, loading, router]);

	useUpdateEffect(() => {
		if (!selectedFilter?.id) return;
		fetch(`/api/invoice?status=${selectedFilter?.id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setFilteredInvoices(data);
			});
	}, [selectedFilter]);

	return (
		<>
			<Layout>
				<AddInvoiceCtx.Provider value={{ invoices: invoicesData, setInvoices: setInvoicesData }}>
					{session && (
						<>
							<div className='flex justify-between items-center w-full'>
								<div>
									<Title as='h1'>Invoices</Title>
									<Subtitle>
										{!!totalInvoices ? `There are ${totalInvoices} total invoices` : "No invoices"}
									</Subtitle>
								</div>
								<div className='flex gap-6 align-middle'>
									<FormProvider {...filterMethods}>
										<div className='relative flex items-center'>
											<Dropdown
												items={filterOptions}
												placeholder='Filter by status'
												variant='2'
												name='status'
												wrapperClassName='inline-flex items-center'
											/>
											{selectedFilter?.id && (
												<span
													onClick={clearFilter}
													className='text-purple-mimosa whitespace-nowrap underline text-xs absolute -bottom-2 cursor-pointer'
												>
													Remove filters
												</span>
											)}
										</div>
									</FormProvider>
									<NewInvoiceBtn />
								</div>
							</div>
							<div className='flex flex-col gap-3 my-5'>
								{selectedFilter?.id
									? filteredInvoices.map((invoice) => (
											<InvoiceCard key={invoice.id} invoice={invoice} />
									  ))
									: invoicesData.map((invoice) => <InvoiceCard key={invoice.id} invoice={invoice} />)}
							</div>
						</>
					)}
				</AddInvoiceCtx.Provider>
			</Layout>
		</>
	);
}
