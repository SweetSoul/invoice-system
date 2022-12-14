import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
	const { id } = req.query;
	const result = await prisma.invoice.delete({
		where: { id: parseInt(id) },
	});
	res.json(result);
}
