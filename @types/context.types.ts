import { Invoice } from "./invoice.types";

export interface TEditInvoiceCtx {
	invoice: Invoice;
	setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
}

export interface TAddInvoiceCtx {
	invoices: Invoice[];
	setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
}
