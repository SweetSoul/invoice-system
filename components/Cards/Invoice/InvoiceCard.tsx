import Image from "next/image";
import Link from "next/link";
import { Invoice } from "../../../@types/invoice.types";
import formatDate from "../../../util/formatDate";
import StatusBadge from "../../Badge/StatusBadge/StatusBadge";
import Title from "../../Typography/Title/Title";

interface Props {
	invoice: Invoice;
}

export default function InvoiceCard({ invoice }: Props) {
	return (
		<>
			<Link href={`/invoice/${invoice.id}`}>
				<div className='bg-white dark:bg-blue-clay rounded-xl py-4 px-7 flex items-center justify-between relative cursor-pointer'>
					<Title as='h3' label='Invoice ID' className='flex-grow-0 flex-shrink-0 basis-auto w-4'>
						<span className='text-faded-blue'>#</span>
						{invoice.id}
					</Title>
					<Title
						as='h3'
						label='Invoice Date'
						className='flex-grow-0 flex-shrink-0 basis-auto w-32'
						color='text-faded-blue dark:text-faded-blue'
					>
						Due {formatDate(invoice.paymentDue)}
					</Title>
					<Title
						as='h3'
						label='Client Name'
						className='flex-grow-0 flex-shrink-0 basis-auto w-1/4'
						color='text-faded-blue dark:text-faded-blue'
					>
						{invoice.clientName}
					</Title>
					<Title
						as='h3'
						label='Total'
						className='flex-grow-0 flex-shrink-0 basis-auto w-16'
						color='text-mirage dark:text-white'
					>
						£{invoice.total}
					</Title>
					<StatusBadge status={invoice.status} className='flex-grow-0 flex-shrink-0 basis-auto w-1/4' />
					<div className='absolute top-7 right-4'>
						<Image src='/assets/icon-arrow-right.svg' alt='Arrow Right' width={6} height={10} />
					</div>
				</div>
			</Link>
		</>
	);
}
