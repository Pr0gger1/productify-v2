import React, { FC } from 'react';
import Popover from '@mui/material/Popover';
import SettingsContainer from 'components/ui/containers/SettingsContainer';
import IWindowAnchor from 'types/Window';

const HeaderSettings: FC<IWindowAnchor> = ({
	anchor,
	setAnchor,
}): JSX.Element => {
	const settingsHandleClose = (): void => {
		setAnchor(null);
	};

	return (
		<Popover
			sx={{
				'& .MuiPaper-root': {
					color: 'var(--fontColor)',
					borderRadius: '0.5rem',
					padding: '1rem',
				},
				'& .MuiTypography-root': {
					fontSize: '18px',
				},
			}}
			PaperProps={{
				style: {
					backgroundColor: 'var(--bgColorFirst)',
					backdropFilter: 'blur(5px)',
				},
			}}
			open={Boolean(anchor)}
			anchorEl={anchor}
			onClose={settingsHandleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			<SettingsContainer />
		</Popover>
	);
};

export default HeaderSettings;
