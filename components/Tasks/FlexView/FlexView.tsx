import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../../FormControls/TextInput/TextInput";
import Title from "../../Typography/Title/Title";
import TaskRow from "./TaskRow";

interface Props {
	companies: string[];
}

export default function FlexView({ companies }: Props) {
	const methods = useForm();
	return (
		<>
			<div>
				<FormProvider {...methods}>
					<TextInput
						name='search'
						type='text'
						className='bg-transparent border-none'
						placeholder='🔍 Search'
					/>
				</FormProvider>
			</div>
			<div className='mt-7 flex items-stretch'>
				<button className='bg-gray-300 hover:bg-gray-500 p-3 rounded-tl-lg rounded-bl-lg text-gray-600 hover:text-white'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
					</svg>
				</button>
				<div className='flex items-center bg-gray-100 border border-gray-300 rounded-tr-lg rounded-br-lg px-4 py-3 w-full'>
					<Title as='h1' color='text-gray-700 mr-auto'>
						Your Tasks Today
					</Title>
				</div>
			</div>
			<div className='mt-8'>
				{companies.map((c, index) => (
					<TaskRow company_name={c} key={index} limit={index + 3} />
				))}
			</div>
		</>
	);
}
