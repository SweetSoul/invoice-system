import { Address, Invoice, InvoiceItem, InvoiceStatus } from "../../../@types/invoice.types";
import Dropdown, { IDropdownItem } from "../../Dropdown/Dropdown";
import DateInput from "../../FormControls/DateInput/DateInput";
import ItemList from "../../FormControls/ItemList/ItemList";
import TextInput from "../../FormControls/TextInput/TextInput";
import Title from "../../Typography/Title/Title";
import { useForm, FormProvider } from "react-hook-form";
import Button from "../../Buttons/Generic/Button";
import { useEffect, useContext, useState, useRef } from "react";
import _ from "lodash";
import { EditInvoiceCtx } from "../../../pages/invoice/[id]";
import { AddInvoiceCtx } from "../../../pages";
import Loader from "../../Loader/Loader";
import getUserConfirmation from "../../../util/confirmationDialog";

interface ModalProps {
	defaultInvoice?: Invoice;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	onAddNewInvoice?: (invoice: Invoice) => void;
	onUpdateInvoice?: (invoice: Invoice) => void;
}

interface InvoiceForm {
	id?: number;
	createdAt: string;
	paymentDue: string;
	description: string;
	paymentTerms: IDropdownItem;
	clientName: string;
	clientEmail: string;
	status?: InvoiceStatus;
	senderAddress: Address;
	clientAddress?: Address;
	items: InvoiceItem[];
	total: string;
}

export default function InvoiceModal({ defaultInvoice, isOpen, setIsOpen }: ModalProps) {
	const [isLoading, setIsLoading] = useState(false);
	const paymentTerms: IDropdownItem[] = [
		{ id: "1", value: "Net 1 Day" },
		{ id: "7", value: "Net 7 Days" },
		{ id: "14", value: "Net 14 Days" },
		{ id: "30", value: "Net 30 Days" },
	];
	const invoiceMethods = useForm<InvoiceForm>({
		defaultValues: {
			createdAt: new Date().toISOString(),
		},
	});
	const editInvoiceCtx = useContext(EditInvoiceCtx);
	const addInvoiceCtx = useContext(AddInvoiceCtx);
	const isAddingDraft = useRef(false);

	const handleSaveDraft = () => {
		isAddingDraft.current = true;
		invoiceMethods.handleSubmit((data) =>
			handleSubmit({
				...data,
				status: InvoiceStatus.DRAFT,
			})
		);
	};

	const handleSubmit = (data: InvoiceForm) => {
		setIsLoading(true);
		const updateInvoice = {
			...data,
			paymentTerms: parseInt(data.paymentTerms.id),
		};
		if (defaultInvoice) {
			return fetch(`/api/invoice/update/${defaultInvoice.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateInvoice),
			})
				.then((res) => res.json())
				.then((data) => {
					editInvoiceCtx.setInvoice(data);
					setIsOpen(false);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
		const newInvoice = {
			...updateInvoice,
			status: "pending",
		};
		return fetch("/api/invoice/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newInvoice),
		})
			.then((res) => res.json())
			.then((data) => {
				addInvoiceCtx.setInvoices((prev) => [...prev, data]);
				setIsOpen(false);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const handleCancel = async () => {
		if (invoiceMethods.formState.isDirty) {
			const confirmation = await getUserConfirmation(
				"Are you sure you want to discard? All changes will be lost."
			);
			if (confirmation.value) {
				setIsOpen(false);
			}
			return;
		}
		setIsOpen(false);
	};

	useEffect(() => {
		if (defaultInvoice) {
			const senderAddress = defaultInvoice?.senderAddress
				? _.cloneDeep(defaultInvoice?.senderAddress)
				: {
						street: "",
						city: "",
						postCode: "",
						country: "",
				  };
			const clientAddress = defaultInvoice?.clientAddress
				? _.cloneDeep(defaultInvoice?.clientAddress)
				: {
						street: "",
						city: "",
						postCode: "",
						country: "",
				  };
			const items = defaultInvoice?.items?.length ? _.cloneDeep(defaultInvoice?.items) : [];
			invoiceMethods.reset({
				createdAt: defaultInvoice?.createdAt ? defaultInvoice?.createdAt : new Date().toISOString(),
				paymentDue: defaultInvoice?.paymentDue ? defaultInvoice?.paymentDue : new Date().toISOString(),
				description: defaultInvoice?.description ?? "",
				paymentTerms: defaultInvoice?.paymentTerms
					? paymentTerms.find((term) => parseInt(term.id) === defaultInvoice?.paymentTerms)
					: {},
				clientName: defaultInvoice?.clientName ?? "",
				clientEmail: defaultInvoice?.clientEmail ?? "",
				senderAddress,
				clientAddress,
				items,
				total: defaultInvoice?.total.toString() ?? "0",
			});
		}
	}, [isOpen]);

	return (
		<>
			<FormProvider {...invoiceMethods}>
				<div
					className={`fixed top-0 left-0 z-20 transition-all duration-300 ease-in-out w-screen ${
						isOpen ? "translate-x-28 opacity-100" : "translate-x-0 opacity-0"
					}`}
				>
					{isOpen && (
						<>
							<div
								className='fixed inset-0 z-10 bg-black opacity-60 h-full w-full'
								onClick={handleCancel}
							/>
							<div
								className={`relative z-20 px-10 py-8 bg-white dark:bg-mirage rounded-br-3xl rounded-tr-3xl max-w-xl h-screen overflow-y-scroll max-h-screen`}
							>
								<form onSubmit={invoiceMethods.handleSubmit(handleSubmit)} className='pl-4'>
									<div className='mb-16'>
										<Title as='h2' className='leading-8 tracking-wide mb-10' label='Modal title'>
											{defaultInvoice ? "Edit " : "New Invoice"}
											{defaultInvoice?.id && <span className='text-faded-blue'>#</span>}
											{defaultInvoice?.id && defaultInvoice.id}
										</Title>
										<div className='my-3 flex flex-col gap-3'>
											<Title
												as='h4'
												className='mb-4 tracking-02 font-bold'
												label='Sender title'
												color='text-purple-slate'
											>
												Bill From
											</Title>
											<TextInput
												label='Street Address'
												name='senderAddress.street'
												type='text'
												validation={{ isRequired: true }}
											/>
											<div className='flex items-center gap-3 justify-between'>
												<TextInput
													label='City'
													name='senderAddress.city'
													type='text'
													validation={{ isRequired: true }}
													wrapperClassName='flex-grow-0 flex-shrink-0 basis-auto max-w-30'
												/>
												<TextInput
													label='Post Code'
													name='senderAddress.postCode'
													type='text'
													validation={{ isRequired: true }}
													wrapperClassName='flex-grow-0 flex-shrink-0 basis-auto max-w-30'
												/>
												<TextInput
													label='Country'
													name='senderAddress.country'
													type='text'
													validation={{ isRequired: true }}
													wrapperClassName='flex-grow-0 flex-shrink-0 basis-auto max-w-30'
												/>
											</div>
										</div>
										<div className='my-10 flex flex-col gap-3'>
											<Title
												as='h4'
												className='mb-2 tracking-02 font-bold'
												label='Sender title'
												color='text-purple-slate'
											>
												Bill To
											</Title>
											<TextInput
												label="Client's Name"
												name='clientName'
												type='text'
												validation={{ isRequired: !isAddingDraft.current }}
											/>
											<TextInput
												label="Client's Email"
												name='clientEmail'
												type='email'
												validation={{ isRequired: !isAddingDraft.current }}
											/>
											<TextInput
												label='Street Address'
												name='clientAddress.street'
												type='text'
												validation={{ isRequired: !isAddingDraft.current }}
											/>
											<div className='flex items-center gap-3 justify-between'>
												<TextInput
													label='City'
													name='clientAddress.city'
													type='text'
													validation={{ isRequired: !isAddingDraft.current }}
													wrapperClassName='flex-grow-0 flex-shrink-0 basis-auto max-w-30'
												/>
												<TextInput
													label='Post Code'
													name='clientAddress.postCode'
													type='text'
													validation={{ isRequired: !isAddingDraft.current }}
													wrapperClassName='flex-grow-0 flex-shrink-0 basis-auto max-w-30'
												/>
												<TextInput
													label='Country'
													name='clientAddress.country'
													type='text'
													validation={{ isRequired: !isAddingDraft.current }}
													wrapperClassName='flex-grow-0 flex-shrink-0 basis-auto max-w-30'
												/>
											</div>
										</div>
										<div className='my-10 flex flex-col gap-3'>
											<div className='flex items-center gap-3 justify-between'>
												<DateInput
													name='createdAt'
													label='Invoice Date'
													wrapperClassName='max-w-1/2 w-1/2'
													disabled
												/>
												<Dropdown
													placeholder=''
													items={paymentTerms}
													label='Payment Terms'
													wrapperClassName='max-w-1/2 w-1/2'
													name='paymentTerms'
													validation={{ isRequired: true }}
												/>
											</div>
											<TextInput
												label='Project Description'
												name='description'
												type='text'
												validation={{ isRequired: !isAddingDraft.current }}
											/>
										</div>
										<ItemList />
									</div>
									<div className='bg-link-water dark:bg-blue-dark fixed z-30 bottom-0 left-0 w-full max-w-xl px-10 h-20 rounded-b-2xl flex items-center justify-end gap-2'>
										<Button type='button' variant='5' onClick={handleCancel} className='mr-auto'>
											Discard
										</Button>
										{/* <Button type='button' variant='3' onClick={handleSaveDraft}>
											Save as Draft
										</Button> */}
										<Button type='submit' variant='2' className={defaultInvoice ? "" : "px-6"}>
											{defaultInvoice ? "Save Changes" : "Send"}
										</Button>
									</div>
								</form>
							</div>
						</>
					)}
				</div>
			</FormProvider>
			<Loader loading={isLoading} />
		</>
	);
}
