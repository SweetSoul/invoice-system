import { Invoice } from "../../../@types/invoice.types";
import Button from "../Generic/Button";
import { useState, useEffect } from "react";
import InvoiceModal from "../../Modals/Invoice/InvoiceModal";
import useDebounce from "../../../hooks/useDebounce";

interface Props {
	invoice: Invoice;
}

export default function EditInvoiceBtn({ invoice }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	const handleEditInvoice = () => {
		setIsOpen(true);
	};
	return (
		<>
			<Button variant='3' onClick={handleEditInvoice}>
				Edit
			</Button>
			<InvoiceModal setIsOpen={setIsOpen} isOpen={isOpen} defaultInvoice={invoice} />
		</>
	);
}
