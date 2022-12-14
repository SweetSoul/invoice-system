import { InvoiceItem } from "../../../../@types/invoice.types";
import prisma from "../../../../lib/prisma";
import _ from "lodash";

export default async function handle(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}
	const body = _.cloneDeep(req.body);

	const hasItems = Array.isArray(body.items) && body.items.length > 0;
	const grandTotal = hasItems
		? body.items.reduce((acc: number, item: InvoiceItem) => {
				return acc + item.total;
		  }, 0)
		: 0;

	if (body.status === "draft") {
		const hasClientAddress = typeof body.clientAddress === "object" && Object.keys(body.clientAddress).length > 0;
		const draftItems = hasItems
			? {
					connectOrCreate: body.items.map((item: any) => {
						return {
							where: {
								id: item.id ?? 0,
							},
							create: {
								...item,
							},
						};
					}),
			  }
			: [];
		const hasClientName = typeof body.clientName === "string" && body.clientName.length > 0;
		const hasClientEmail = typeof body.clientEmail === "string" && body.clientEmail.length > 0;
		const draftData = await {
			...body,
			clientName: hasClientName ? body.clientName : undefined,
			clientEmail: hasClientEmail ? body.clientEmail : undefined,
			clientAddress: hasClientAddress
				? {
						connectOrCreate: {
							where: {
								id: body.clientAddress?.id ?? 0,
							},
							create: {
								street: body.clientAddress?.street ?? "",
								city: body.clientAddress?.city ?? "",
								postCode: body.clientAddress?.postCode ?? "",
								country: body.clientAddress?.country ?? "",
							},
						},
				  }
				: undefined,
			items: draftItems,
			total: grandTotal,
		};

		await Object.entries(draftData).forEach(([key, value]) => {
			if (value === undefined) {
				delete draftData[key];
			}
		});

		const result = await prisma.invoice.create({
			data: draftData,
		});
		return res.json(result);
	}

	const existingClientAddress = await prisma.address.findFirst({
		where: {
			street: body.clientAddress.street,
			city: body.clientAddress.city,
			postCode: body.clientAddress.postCode,
		},
	});

	const existingSenderAddress = await prisma.address.findFirst({
		where: {
			street: body.senderAddress.street,
			city: body.senderAddress.city,
			postCode: body.senderAddress.postCode,
		},
	});

	const now = new Date();
	const dateAdjusted = now.setDate(now.getDate() + parseInt(body.paymentTerms));
	const paymentDue = new Date(dateAdjusted).toISOString();

	let data = {
		clientEmail: body.clientEmail,
		clientName: body.clientName,
		createdAt: body.createdAt,
		description: body.description,
		paymentDue,
		paymentTerms: body.paymentTerms,
		status: body.status,
		senderAddress: {
			connectOrCreate: {
				where: {
					id: existingSenderAddress?.id ?? 0,
				},
				create: {
					...body.senderAddress,
				},
			},
		},
		clientAddress: {
			connectOrCreate: {
				where: {
					id: existingClientAddress?.id ?? 0,
				},
				create: {
					...body.clientAddress,
				},
			},
		},
		items: {
			connectOrCreate: body.items.map((item: any) => {
				return {
					where: {
						id: item.id ?? 0,
					},
					create: {
						...item,
					},
				};
			}),
		},
		total: grandTotal,
	};

	const result = await prisma.invoice.create({
		data,
	});

	res.json(result);
}
