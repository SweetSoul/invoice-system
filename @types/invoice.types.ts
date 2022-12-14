export interface Invoice {
	id: number;
	createdAt: string;
	paymentDue: string;
	description: string;
	paymentTerms: number;
	clientName: string;
	clientEmail: string;
	status: InvoiceStatus;
	senderAddress: Address;
	senderAddressId: number;
	clientAddress?: Address;
	clientAddressId?: number;
	items: InvoiceItem[];
	total: number;
}

export interface InvoiceItem {
	id: number;
	name: string;
	quantity: number;
	price: number;
	total: number;
	invoice?: Invoice;
	invoiceId?: number;
}

export interface Address {
	id: number;
	street?: string;
	city?: string;
	postCode?: string;
	country?: string;
	sender: Invoice[];
	client: Invoice[];
}

export enum InvoiceStatus {
	PAID = "paid",
	PENDING = "pending",
	DRAFT = "draft",
}
