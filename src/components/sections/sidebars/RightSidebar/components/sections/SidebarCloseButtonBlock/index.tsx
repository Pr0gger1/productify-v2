import React from 'react';
import { useAppDispatch } from 'store/index';
import { setRSidebarOpen } from 'store/reducers/SidebarSlice';
import CloseIcon from '@mui/icons-material/Close';

import styles from './styles.module.scss';

const SidebarCloseButton = (): JSX.Element => {
	const dispatch = useAppDispatch();
	return (
		<div className={styles.sidebar_close__btn}>
			<CloseIcon
				onClick={() => dispatch(setRSidebarOpen())}
			/>
		</div>
	);
};

export default SidebarCloseButton;