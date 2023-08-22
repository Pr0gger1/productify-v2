import React, { Dispatch, FC, ReactNode, SetStateAction } from 'react';

import { Popover } from '@mui/material';
import { mobileSelector } from 'store/selectors';
import { useAppSelector } from 'store';

interface ContextMenuProps {
	children: ReactNode | JSX.Element;
	anchorEl: HTMLElement | null;
	setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
}

const ContextMenu: FC<ContextMenuProps> = ({
	children,
	anchorEl,
	setAnchorEl,
}) => {
	const isMobile: boolean = useAppSelector(mobileSelector);

	const closeMenuHandler = () => {
		setAnchorEl(null);
	};

	return (
		<Popover
			sx={{
				'& .MuiPaper-root': {
					color: 'var(--fontColor)',
					borderRadius: '0.25rem',
					padding: '0.5rem',
					width: isMobile ? '100%' : '20%',
					minWidth: '20%',
				},
				'& .MuiTypography-root': {
					fontSize: '18px',
				},
				'& img': {
					width: '1.3rem',
					height: '1.3rem',
				},
			}}
			PaperProps={{
				style: {
					backgroundColor: 'var(--bgColorSecond)',
				},
			}}
			open={Boolean(anchorEl)}
			anchorEl={anchorEl}
			onClose={closeMenuHandler}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			{children}
		</Popover>
	);
};

export default ContextMenu;
