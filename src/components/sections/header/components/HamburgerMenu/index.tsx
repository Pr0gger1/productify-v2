import React, {FC} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { setLSidebarOpen } from 'store/reducers/SidebarSlice';

import styles from './styles.module.scss';
import {useAppDispatch} from 'store/index';

const HamburgerMenu: FC = (): JSX.Element => {
	const dispatch = useAppDispatch();

	return (
		<div className={styles.hamburger_menu__btn}>
			<MenuIcon
				onClick={() => dispatch(setLSidebarOpen())}
				sx={{
					fontSize: 30
				}}
			/>
		</div>
	);
};

export default HamburgerMenu;