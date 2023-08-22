import React, { SyntheticEvent, useState } from 'react';
import { IToastOptions, SnackbarContext } from 'context/SnackbarContext';
import SnackbarNotification from 'components/ui/windows/SnackbarNotifications';
import { Children } from 'types/Children';
import { AlertColor, SnackbarCloseReason, SnackbarOrigin } from '@mui/material';

const SnackbarProvider: React.FC<Children> = ({ children }) => {
	const [open, setOpen] = useState<boolean>(false);
	const [hideDuration, setHideDuration] = useState<number>(5000);
	const [type, setType] = useState<AlertColor>('success');
	const [message, setMessage] = useState<string>('');
	const [position, setPosition] = useState<SnackbarOrigin>({
		vertical: 'top',
		horizontal: 'center',
	});

	const handleClose = (
		event: Event | SyntheticEvent<any, Event>,
		reason: SnackbarCloseReason,
	): void => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const setToast = (options: IToastOptions) => {
		if (options.hideDuration) setHideDuration(options.hideDuration);
		if (options.position)
			setPosition({
				vertical: options.position.vertical,
				horizontal: options.position.horizontal,
			});

		if (options.type) setType(options.type);
		setOpen(true);
		setMessage(options.message);
	};

	return (
		<SnackbarContext.Provider value={{ setToast }}>
			<SnackbarNotification
				open={open}
				hideDuration={hideDuration}
				type={type}
				onClose={handleClose}
				position={position}
			>
				{message}
			</SnackbarNotification>
			{children}
		</SnackbarContext.Provider>
	);
};

export default SnackbarProvider;
