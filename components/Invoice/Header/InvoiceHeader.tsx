import { Invoice } from "../../../@types/invoice.types";
import StatusBadge from "../../Badge/StatusBadge/StatusBadge";
import DelInvoiceBtn from "../../Buttons/DelInvoice/DelnvoiceBtn";
import EditInvoiceBtn from "../../Buttons/EditInvoice/EditInvoiceBtn";
import ToggleInvoiceStatusBtn from "../../Buttons/ToggleInvoiceStatus/ToggleInvoiceStatusBtn";
import Subtitle from "../../Typography/Subtitle/Subtitle";

interface Props {
	invoice: Invoice;
}

export default function InvoiceHeader({ invoice }: Props) {
	return (
		<div className='flex items-center justify-between mt-5 bg-white dark:bg-blue-dark p-8 rounded-lg'>
			<div className='flex gap-2 items-center'>
				<Subtitle color='text-faded-blue dark:text-link-water' className='font-extralight'>
					Status
				</Subtitle>
				<StatusBadge status={invoice.status} smallBadge />
			</div>
			<div className='flex gap-2 items-center'>
				<EditInvoiceBtn invoice={invoice} />
				<DelInvoiceBtn invoice={invoice} />
				{invoice.status === "pending" && <ToggleInvoiceStatusBtn invoice={invoice} />}
			</div>
		</div>
	);
}
