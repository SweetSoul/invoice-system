import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
	const { status } = req.query;
	const result = await prisma.invoice.findMany({
		where: {
			status: status,
		},
	});
	res.json(result);
}
