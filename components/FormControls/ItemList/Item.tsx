import { InvoiceItem } from "@prisma/client";
import Image from "next/image";
import Button from "../../Buttons/Generic/Button";
import TextInput from "../TextInput/TextInput";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import useDebounce from "../../../hooks/useDebounce";

interface Props {
	index: number;
	onRemoveItem: () => void;
	data?: Partial<InvoiceItem>;
}

export default function Item({ index, onRemoveItem, data }: Props) {
	const { setValue, watch } = useFormContext();
	const quantityWatcher = watch(`items.${index}.quantity`);
	const priceWatcher = watch(`items.${index}.price`);
	const quantity = useDebounce(quantityWatcher, 100);
	const price = useDebounce(priceWatcher, 100);
	const total = Math.round((quantity * price + Number.EPSILON) * 100) / 100;

	useEffect(() => {
		setValue(`items.${index}.total`, isNaN(total) ? 0 : total);
	}, [quantity, price]);

	return (
		<>
			<div className='flex-grow-0 flex-shrink-0 basis-5/12 w-auto' style={{ maxWidth: "40%" }}>
				<TextInput label='' name={`items.${index}.name`} type='text' validation={{ isRequired: true }} />
			</div>
			<div className='flex-grow-0 flex-shrink-0 basis-1/12' style={{ maxWidth: "10%" }}>
				<TextInput
					label=''
					name={`items.${index}.quantity`}
					type='number'
					validation={{ isRequired: true, isNumber: true }}
				/>
			</div>
			<div className='flex-grow-0 flex-shrink-0 basis-3/12' style={{ maxWidth: "25%" }}>
				<TextInput
					label=''
					name={`items.${index}.price`}
					type='number'
					validation={{ isRequired: true, isNumber: true }}
				/>
			</div>
			<div
				className='flex items-center gap-1 flex-grow-0 flex-shrink-0 basis-3/12 relative'
				style={{ maxWidth: "25%" }}
			>
				<TextInput label='' name={`items.${index}.total`} type='text' readOnly />
				<Button type='button' className='absolute bottom-0 right-3' onClick={onRemoveItem}>
					<Image src='/assets/icon-delete.svg' alt='Remove' width={12} height={12} />
				</Button>
			</div>
		</>
	);
}
