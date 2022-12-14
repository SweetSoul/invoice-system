import { useState } from "react";
import { createRoot } from "react-dom/client";
import Button from "../components/Buttons/Generic/Button";
import Subtitle from "../components/Typography/Subtitle/Subtitle";
import Title from "../components/Typography/Title/Title";

interface IConfirmationDialogConfig {
	form?: JSX.Element;
	cancelButtonText?: string;
	okButtonText?: string;
	title?: string;
	hideOkButton?: boolean;
	confirmationInput?: string;
	className?: string;
	contentClassName?: string;
	isDeleteConfirmation?: boolean;
}

interface IRenderDialogProps {
	resolve: (
		value:
			| {
					value: any;
			  }
			| PromiseLike<{
					value: any;
			  }>
	) => void;
	message: string;
	config: IConfirmationDialogConfig;
}

const renderDialog = (message, config, resolve) => {
	const root = document.querySelector("main");
	if (!root) {
		console.error("No root element found.");
		return;
	}
	const div = document.createElement("div");
	div.setAttribute("id", "confirmationDialogContainer");
	div.setAttribute(
		"class",
		"h-screen w-screen fixed z-50 inset-0 grid place-items-center globalConfirmationModalContainer"
	);
	root.appendChild(div);
	const container = document.getElementById("confirmationDialogContainer");
	if (container === null) {
		console.error("Container was not found.");
	}
	const dialog = createRoot(container as HTMLElement);
	return dialog.render(<ConfirmationDialog message={message} resolve={resolve} config={config} />);
};

const removeDialog = () => {
	const root = document.querySelector("main");
	if (!root) {
		console.error("No root element found.");
		return;
	}
	const divs = root.querySelectorAll(".globalConfirmationModalContainer");
	divs && divs.forEach((div) => root.removeChild(div));
};

const ConfirmationDialog = ({ resolve, message, config }: IRenderDialogProps) => {
	const clickOK = () => {
		removeDialog();
		resolve({ value: true });
	};

	const clickCancel = () => {
		removeDialog();
		resolve({ value: false });
	};

	return (
		<div className='fixed inset-0 z-50 w-screen h-screen grid place-items-center'>
			<div className='fixed inset-0 z-0 h-screen w-screen bg-black opacity-60' onClick={clickCancel} />
			<div className='bg-white dark:bg-blue-dark rounded-lg shadow-lg relative z-10'>
				<div className='p-14'>
					{config?.form ? (
						<></>
					) : (
						<>
							<div>
								<Title as='h1' label='Modal Title' color='text-mirage dark:text-link-water'>
									{config?.title || "Confirmation"}
								</Title>
								<Subtitle>{message}</Subtitle>
							</div>
							<div className='flex gap-3 items-center justify-center mt-10'>
								<Button variant={config?.isDeleteConfirmation ? "3" : "5"} onClick={clickCancel}>
									{config?.cancelButtonText || "Cancel"}
								</Button>
								{!config?.hideOkButton && (
									<Button
										variant={config?.isDeleteConfirmation ? "5" : "2"}
										onClick={clickOK}
										className='px-8'
									>
										{config?.okButtonText || "Ok"}
									</Button>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

const getUserConfirmation = (
	message: string | null,
	config: IConfirmationDialogConfig | undefined = undefined
): Promise<{ value: string }> =>
	new Promise((resolve, reject) => {
		renderDialog(message, config, resolve);
	});

export default getUserConfirmation;

/* <ModalComponent
            showHeader
            showCancelButton
            headerTitle={config?.title || "Confirmation"}
            okButtonText={config?.okButtonText || "Yes"}
            showOkButton={config?.showOkButton ?? true}
            cancelButtonText={config?.cancelButtonText || "Cancel"}
            modalSwitcher={isOpen}
            modalSwitcherCallback={handleChange}
            confirmationInput={config?.confirmationInput}
            onCancel={clickCancel}
            onSuccess={clickOK}
            modalText={message ? message : "Are you sure?"}
            contentClassName={config?.contentClassName || "globalConfirmationModal"}
            className={config?.className || "globalConfirmationModalContainer"}
            form={config?.form || undefined}
        /> */
