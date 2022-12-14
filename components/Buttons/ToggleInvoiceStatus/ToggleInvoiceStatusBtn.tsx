import { Invoice, InvoiceStatus } from "../../../@types/invoice.types";
import Button from "../Generic/Button";
import { useContext, useState } from "react";
import { EditInvoiceCtx } from "../../../pages/invoice/[id]";
import Loader from "../../Loader/Loader";

interface Props {
	invoice: Invoice;
}

export default function ToggleInvoiceStatusBtn({ invoice }: Props) {
	const [isLoading, setIsLoading] = useState(false);
	const editInvoiceCtx = useContext(EditInvoiceCtx);
	const handleToggleStatusInvoice = () => {
		setIsLoading(true);
		fetch(`/api/invoice/update/${invoice.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				status: "paid",
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				editInvoiceCtx?.setInvoice(data);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	return (
		<>
			<Button variant='2' onClick={handleToggleStatusInvoice} className='px-5'>
				Mark as Paid
			</Button>
			<Loader loading={isLoading} />
		</>
	);
}
