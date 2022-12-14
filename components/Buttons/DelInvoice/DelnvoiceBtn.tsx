import { useRouter } from "next/router";
import { Invoice } from "../../../@types/invoice.types";
import Button from "../Generic/Button";
import { useState, useContext } from "react";
import Loader from "../../Loader/Loader";
import { AddInvoiceCtx } from "../../../pages";
import getUserConfirmation from "../../../util/confirmationDialog";

interface Props {
	invoice: Invoice;
}

export default function DelInvoiceBtn({ invoice }: Props) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const addInvoiceCtx = useContext(AddInvoiceCtx);

	const handleDelInvoice = async () => {
		const confirmation = await getUserConfirmation("Are you sure you want to delete this invoice?", {
			isDeleteConfirmation: true,
			okButtonText: "Delete",
		});
		if (!confirmation.value) return;
		setIsLoading(true);
		fetch(`/api/invoice/delete/${invoice.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(() => {
				addInvoiceCtx.setInvoices((prev) => {
					return prev.filter((inv) => inv.id !== invoice.id);
				});
				router.push("/");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	return (
		<>
			<Button variant='5' onClick={handleDelInvoice}>
				Delete
			</Button>
			<Loader fullPage loading={isLoading} />
		</>
	);
}
