import React, {FC} from 'react';

import Popover from '@mui/material/Popover';
import NotificationContainer from 'components/ui/containers/NotificationContainer';
import { mobileSelector } from 'store/selectors';
import IWindowAnchor from 'types/Window';
import { useAppSelector } from 'store';


const NotificationWindow: FC<IWindowAnchor> = ({ anchor, setAnchor }): JSX.Element => {
	const isMobile: boolean = useAppSelector(mobileSelector);

	const handleClose = (): void => {
		setAnchor(null);
	};

	return (
		<Popover
			sx={{
				'& .MuiPaper-root': {
					backgroundColor: 'var(--bgColor)',
					color: 'var(--fontColor)',
					borderRadius: '8px',
					padding: '1rem',
					width: isMobile ? '90%' : '35%',
				},
				'& .MuiTypography-root': {
					fontSize: '18px',
				},
			}}
			PaperProps={{
				style: {
					backdropFilter: 'blur(5px)'
				}
			}}
			open={Boolean(anchor)}
			anchorEl={anchor}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			<NotificationContainer/>
		</Popover>
	);
};

export default NotificationWindow;