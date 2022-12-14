import { Invoice } from "../../../@types/invoice.types";
import formatDate from "../../../util/formatDate";
import Subtitle from "../../Typography/Subtitle/Subtitle";
import Title from "../../Typography/Title/Title";

interface Props {
	invoice: Invoice;
}

export default function InvoiceBody({ invoice }: Props) {
	return (
		<div className='mt-5 bg-white dark:bg-blue-dark p-12 rounded-lg'>
			<div className='flex justify-between'>
				<div>
					<Title as='h1' label='Invoice ID'>
						<span className='text-faded-blue'>#</span>
						{invoice.id}
					</Title>
					<Subtitle label='Invoice description'>{invoice.description}</Subtitle>
				</div>
				<div>
					<Subtitle label='Sender street'>{invoice.senderAddress.street}</Subtitle>
					<Subtitle label='Sender street'>{invoice.senderAddress.city}</Subtitle>
					<Subtitle label='Sender street'>{invoice.senderAddress.postCode}</Subtitle>
					<Subtitle label='Sender street'>{invoice.senderAddress.country}</Subtitle>
				</div>
			</div>
			<div className='flex justify-between my-10 gap-2'>
				<div>
					<div>
						<Subtitle>Invoice Date</Subtitle>
						<Title as='h2' label='Invoice Date'>
							{formatDate(invoice.createdAt)}
						</Title>
					</div>
					<div className='mt-5'>
						<Subtitle>Payment Due</Subtitle>
						<Title as='h2' label='Payment Due'>
							{formatDate(invoice.paymentDue)}
						</Title>
					</div>
				</div>
				<div>
					<div>
						<Subtitle>Bill To</Subtitle>
						<Title as='h2' label='Client name'>
							{invoice.clientName}
						</Title>
						{invoice.clientAddress?.id && (
							<>
								<Subtitle label='Sender street'>{invoice.clientAddress.street}</Subtitle>
								<Subtitle label='Sender street'>{invoice.clientAddress.city}</Subtitle>
								<Subtitle label='Sender street'>{invoice.clientAddress.postCode}</Subtitle>
								<Subtitle label='Sender street'>{invoice.clientAddress.country}</Subtitle>
							</>
						)}
					</div>
				</div>
				<div>
					<div>
						<Subtitle>Sent To</Subtitle>
						<Title as='h2' label='Client email'>
							{invoice.clientEmail}
						</Title>
					</div>
				</div>
			</div>
			<div className='mt-5 bg-link-water dark:bg-blue-clay p-6 rounded-t-lg'>
				<div className='flex w-full'>
					<Subtitle className='font-normal flex-grow-1 flex-shrink-0 w-5/12'>Item Name</Subtitle>
					<Subtitle className='font-normal flex-grow-1 flex-shrink-0 w-1/12'>QTY.</Subtitle>
					<Subtitle className='font-normal text-right flex-grow-1 flex-shrink-0 w-3/12'>Price</Subtitle>
					<Subtitle className='font-normal text-right flex-grow-1 flex-shrink-0 w-3/12'>Total</Subtitle>
				</div>
				{invoice.items.map((item) => (
					<div className='flex w-full mt-4' key={item.id}>
						<Subtitle className='font-semibold flex-grow-1 flex-shrink-0 w-5/12'>{item.name}</Subtitle>
						<Subtitle className='font-semibold flex-grow-1 flex-shrink-0 w-1/12'>{item.quantity}</Subtitle>
						<Subtitle className='font-semibold text-right flex-grow-1 flex-shrink-0 w-3/12'>
							£{item.price}
						</Subtitle>
						<Subtitle className='font-semibold text-right flex-grow-1 flex-shrink-0 w-3/12'>
							£{item.total}
						</Subtitle>
					</div>
				))}
			</div>
			<div className='bg-black rounded-b-lg p-6'>
				<div className='flex items-center justify-between'>
					<Subtitle className='text-link-water font-normal'>Amount Due</Subtitle>
					<Title as='h1' label='Amount Due' className='tracking-02' color='text-link-water'>
						£ {invoice.total.toFixed(2)}
					</Title>
				</div>
			</div>
		</div>
	);
}
