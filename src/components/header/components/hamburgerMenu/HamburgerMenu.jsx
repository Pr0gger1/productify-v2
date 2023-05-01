import React from 'react';
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from 'react-redux';
import { setLSidebarOpen } from '../../../../store/reducers/SidebarSlice';

import styles from './HamburgerMenu.module.scss';

const  HamburgerMenu = () => {
    const dispatch = useDispatch();

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