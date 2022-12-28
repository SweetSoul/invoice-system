import formatDate from "../../../util/formatDate";
import Subtitle from "../../Typography/Subtitle/Subtitle";
import Title from "../../Typography/Title/Title";
import tasksData from "../data.json";

interface Props {
	company_name: string;
	limit?: number;
}

export default function TaskRow({ company_name, limit }: Props) {
	return (
		<div className='grid grid-cols-tasks bg-gray-200 rounded-lg my-5'>
			<div className='flex items-center border-r-2 border-r-gray-300 p-3'>
				<Title as='h3' className='font-medium truncate'>
					{company_name}
				</Title>
			</div>
			<div className='flex items-center border-r-2 border-r-gray-300 p-3 hover:bg-gray-400 cursor-pointer'>
				<svg
					stroke='currentColor'
					fill='currentColor'
					strokeWidth='0'
					viewBox='0 0 1024 1024'
					height='1em'
					width='1em'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494zM544 472c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v108H372c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h108v108c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V644h108c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V472z'></path>
				</svg>
			</div>
			<div>
				<div className='grid grid-cols-4 w-full max-h-40 overflow-y-auto'>
					{tasksData.slice(0, limit ?? tasksData.length).map((t) => (
						<div
							className='w-auto cursor-pointer p-2 hover:bg-gray-600 flex items-center justify-center flex-col text-center group'
							key={t.id}
						>
							<div className='w-9 h-9 flex items-center justify-center bg-red-500 rounded-full p-2 mx-auto'>
								{t.type === "call" ? (
									<svg
										stroke='currentColor'
										fill='currentColor'
										strokeWidth='0'
										viewBox='0 0 16 16'
										height='1em'
										width='1em'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z'></path>
									</svg>
								) : (
									<svg
										stroke='currentColor'
										fill='currentColor'
										strokeWidth='0'
										viewBox='0 0 1024 1024'
										height='1em'
										width='1em'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M209.68 883.264c-20.112 41.807-32.802 69.666-144.689 73.73 3.216-107.968 23.792-119.552 64.992-140.08 17.296-8.624 38.832-19.344 62.113-37.248l-38.96-49.744c-18.4 14.128-35.329 21.568-51.697 29.712C32.8 793.858.45 827.569.45 988.289l.543 32.704 31.456-.704c169.632 0 201.328-38.32 233.104-104.32 6.96-14.464 10.832-24.24 22.56-43.729l-47.456-43.104c-14.224 19.408-23.104 37.872-30.976 54.128zm495.279-694.607c-70.768 0-128.352 57.583-128.352 128.335 0 70.784 57.6 128.353 128.352 128.353s128.336-57.584 128.336-128.352c0-70.752-57.6-128.336-128.336-128.336zm0 192.415c-35.328 0-64.08-28.752-64.08-64.08 0-35.313 28.752-64.08 64.08-64.08s64.08 28.767 64.08 64.08c-.016 35.344-28.752 64.08-64.08 64.08zm318.821-351.76c-.976-15.968-13.63-28.771-29.598-29.955 0 0-179.088-13.056-351.376 51.28-62.944 23.504-114.752 60.737-163.104 117.137-40.32 47.025-80.385 132.032-115.745 202.608-13.664 27.248-26.72 53.313-37.792 73.217H148.15a32.003 32.003 0 0 0-23.936 10.768L6.917 581.503A31.993 31.993 0 0 0 .388 612.51c3.44 10.785 12.32 18.945 23.329 21.44l190.944 43.665c13.007 16.064 34.687 40.097 69.376 78.593l72.335 80.192 38.945 164.72a31.984 31.984 0 0 0 21.231 23.056c3.233 1.024 6.576 1.568 9.904 1.568a31.95 31.95 0 0 0 20.832-7.712l118.56-117.936a31.981 31.981 0 0 0 11.184-24.288v-165.12c15.936-9.904 44.191-25.152 70.783-40.032 72.464-40.496 180.624-90.912 225.472-130.784 63.153-56.128 86.16-97.28 108.752-158.112 53.712-144.688 42.288-344.031 41.744-352.447zM922.001 359.469c-19.712 53.072-37.568 84.83-91.248 132.558-39.664 35.232-148.128 85.824-214.192 122.769-49.312 27.568-78.848 43.664-91.792 54.256a31.949 31.949 0 0 0-11.76 24.784v167.248l-67.52 74.193-28.752-121.6a31.949 31.949 0 0 0-7.393-14.064c-58.847-65.216-147.743-163.808-154.56-171.632a32.017 32.017 0 0 0-17.568-10.848L90.624 583.597l71.904-76H344.56a31.988 31.988 0 0 0 27.264-15.248c14.08-22.928 30.416-55.536 49.344-93.296 32.048-63.952 71.92-148.544 107.12-189.632 41.584-48.528 83.824-79.009 136.896-98.848C783.28 66.445 905.152 61.805 960.864 62.22c1.04 59.008-1.184 195.824-38.863 297.248z'></path>
									</svg>
								)}
							</div>
							<Title as='h3' color='text-gray-800 group-hover:text-white-lilac'>
								{t.title}
							</Title>
							<Subtitle color='text-gray-500 group-hover:text-white-lilac'>
								{new Date(t.date) < new Date() ? (
									<span>
										<span className='text-red-600'>{"Overdue"}</span> -{" "}
									</span>
								) : (
									""
								)}
								{formatDate(t.date)}
							</Subtitle>
							{t.note && (
								<Subtitle
									className='whitespace-pre-wrap truncate mt-3'
									color='text-gray-500 group-hover:text-white-lilac'
								>
									{t.note}
								</Subtitle>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
