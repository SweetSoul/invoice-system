import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
	//TODO: Add Invoices with correct AddressID
	function randomDate(start, end) {
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	}

	const invoices = await prisma.invoice.createMany({
		data: [
			{
				createdAt: randomDate(new Date(2021, 0, 1), new Date(2022, 0, 1)),
				paymentDue: randomDate(new Date(2021, 0, 1), new Date(2022, 0, 1)),
				description: "Re-branding",
				paymentTerms: 1,
				clientName: "Jensen Huang",
				clientEmail: "jensenh@mail.com",
				status: "paid",
				total: 1800.9,
				clientAdressId: 1,
				senderAdressId: 2,
			},
			{
				createdAt: randomDate(new Date(2021, 0, 1), new Date(2022, 0, 1)),
				paymentDue: randomDate(new Date(2021, 0, 1), new Date(2022, 0, 1)),
				description: "Graphic Design",
				paymentTerms: 30,
				clientName: "Alex Grim",
				clientEmail: "alexgrim@mail.com",
				status: "pending",
				total: 556.0,
				clientAdressId: 1,
				senderAdressId: 2,
			},
			{
				createdAt: randomDate(new Date(2021, 0, 1), new Date(2022, 0, 1)),
				paymentDue: randomDate(new Date(2021, 0, 1), new Date(2022, 0, 1)),
				description: "Website Redesign",
				paymentTerms: 7,
				clientName: "John Morrison",
				clientEmail: "jm@myco.com",
				status: "paid",
				total: 14002.33,
				clientAdressId: 1,
				senderAdressId: 2,
			},
			{
				createdAt: randomDate(new Date(2021, 0, 1), new Date(2022, 0, 1)),
				paymentDue: randomDate(new Date(2021, 0, 1), new Date(2022, 0, 1)),
				description: "Logo Concept",
				paymentTerms: 1,
				clientName: "Alysa Werner",
				clientEmail: "alysa@email.co.uk",
				status: "pending",
				total: 102.04,
				clientAdressId: 1,
				senderAdressId: 2,
			},
			{
				createdAt: randomDate(new Date(2021, 0, 1), new Date(2022, 0, 1)),
				paymentDue: randomDate(new Date(2021, 0, 1), new Date(2022, 0, 1)),
				description: "Re-branding",
				paymentTerms: 7,
				clientName: "Mellisa Clarke",
				clientEmail: "mellisa.clarke@example.com",
				status: "pending",
				total: 4032.33,
				clientAdressId: 1,
				senderAdressId: 2,
			},
			{
				createdAt: randomDate(new Date(2021, 0, 1), new Date(2022, 0, 1)),
				paymentDue: randomDate(new Date(2021, 0, 1), new Date(2022, 0, 1)),
				description: "Landing Page Design",
				paymentTerms: 30,
				clientName: "Thomas Wayne",
				clientEmail: "thomas@dc.com",
				status: "pending",
				total: 6155.91,
				clientAdressId: 1,
				senderAdressId: 2,
			},
			{
				createdAt: randomDate(new Date(2021, 0, 1), new Date(2022, 0, 1)),
				paymentDue: randomDate(new Date(2021, 0, 1), new Date(2022, 0, 1)),
				description: "Logo Re-design",
				paymentTerms: 7,
				clientName: "Anita Wainwright",
				clientEmail: "",
				status: "draft",
				total: 3102.04,
				clientAdressId: 1,
				senderAdressId: 2,
			},
		],
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
