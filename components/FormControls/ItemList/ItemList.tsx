import { useFormContext } from "react-hook-form";
import { InvoiceItem } from "../../../@types/invoice.types";
import Button from "../../Buttons/Generic/Button";
import Subtitle from "../../Typography/Subtitle/Subtitle";
import Title from "../../Typography/Title/Title";
import Item from "./Item";

interface Props {
	wrapperClassName?: string;
	defaultItems?: InvoiceItem[];
}

export default function ItemList({ wrapperClassName, defaultItems }: Props) {
	const { setValue, watch } = useFormContext();
	const items = watch("items");

	const handleAddItemSpot = () => {
		const newItems = [...(items ?? [])];
		newItems.push({
			name: "",
			quantity: "",
			price: "",
			total: "",
		});
		setValue("items", newItems);
	};

	const removeItem = (index: number) => {
		const newItems = [...items];
		newItems.splice(index, 1);
		setValue("items", newItems);
	};

	return (
		<div className={wrapperClassName}>
			<Title as='h2' label='Form section' color='text-faded-blue'>
				Item List
			</Title>
			<div className='flex gap-2 items-center'>
				<div className='flex-grow-0 flex-shrink-0 basis-5/12'>
					<Subtitle>Item name</Subtitle>
				</div>
				<div className='flex-grow-0 flex-shrink-0 basis-1/12'>
					<Subtitle>Qty.</Subtitle>
				</div>
				<div className='flex-grow-0 flex-shrink-0 basis-3/12'>
					<Subtitle>Price</Subtitle>
				</div>
				<div className='flex-grow-0 flex-shrink-0 basis-3/12'>
					<Subtitle>Total</Subtitle>
				</div>
			</div>
			<div className='flex flex-col gap-3 mb-3'>
				{items?.map((item, index) => (
					<div key={index} className='flex gap-2 items-center'>
						<Item index={index} onRemoveItem={() => removeItem(index)} data={item} />
					</div>
				))}
			</div>
			<Button variant='6' onClick={handleAddItemSpot} className='w-full mt-2' type='button'>
				+ Add New Item
			</Button>
		</div>
	);
}
