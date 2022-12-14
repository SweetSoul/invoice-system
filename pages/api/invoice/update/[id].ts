import prisma from "../../../../lib/prisma";
import _ from "lodash";
import { Invoice, InvoiceItem } from "../../../../@types/invoice.types";

export default async function handle(req, res) {
	const { id } = req.query;
	if (req.method === "PATCH") {
		const result = await prisma.invoice.update({
			where: { id: parseInt(id) },
			data: req.body,
			include: {
				clientAddress: true,
				senderAddress: true,
				items: true,
			},
		});
		return res.json(result);
	}
	if (req.method !== "PUT") {
		return res.status(405).json({ message: "Method not allowed" });
	}
	const body: Invoice = _.cloneDeep(req.body);
	let data: any = {
		...body,
		senderAddress: {
			connectOrCreate: { where: { id: body.senderAddress?.id }, create: { ...body.senderAddress } },
		},
	};

	if (body.clientAddress?.id || body.clientAddress?.street) {
		data = {
			...data,
			clientAddress: {
				connectOrCreate: {
					where: { id: body.clientAddress?.id ?? 0 },
					create: { ...body.clientAddress },
				},
			},
		};
	}

	const grandTotal = Array.isArray(req.body.items)
		? req.body.items.reduce((acc: number, item: InvoiceItem) => {
				return acc + item.total;
		  }, 0)
		: 0;
	const now = new Date();
	const dateAdjusted = now.setDate(now.getDate() + parseInt(req.body.paymentTerms));
	const paymentDue = new Date(dateAdjusted).toISOString();

	data = {
		...data,
		total: grandTotal,
		paymentDue,
	};

	data.items = {
		upsert: data.items.map((i) => {
			return {
				where: { id: i.id ?? 0 },
				create: i,
				update: i,
			};
		}),
	};

	const result = await prisma.invoice.update({
		where: { id: parseInt(id) },
		data,
		include: {
			clientAddress: true,
			senderAddress: true,
			items: true,
		},
	});
	res.json(result);
}
