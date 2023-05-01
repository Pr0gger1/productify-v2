import React from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from 'react-redux';
import useToggleIconTheme from "../../hooks/useToggleIconTheme";

import { setTheme } from "../../store/reducers/ThemeSlice";

import TaskGroupMenuContainer from "../ui/contextMenu/task_page/TaskGroupMenuContainer";
import HamburgerMenu from "./components/hamburgerMenu/HamburgerMenu";
import NotificationWindow from "./components/notifications/NotificationWindow";
import SettingsWindow from "./components/settings/SettingsWindow";
import IconButton from "../ui/button/IconButton";
import { StyledBadge } from "../ui/customComponents/CustomBadge";

import {mobileSelector, notificationSelector, userDataSelector} from "../../store";
import {useNavigate, useParams} from "react-router-dom";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import themeIconLight from "../../assets/img/icons/theme_icon_light.svg";
import themeIconDark from "../../assets/img/icons/theme_icon_dark.svg";
import notificationIconDark from "../../assets/img/icons/bell_dark.svg";
import notificationIconLight from "../../assets/img/icons/bell_light.svg";
import settingsIconDark from "../../assets/img/icons/settings_dark.svg";
import settingsIconLight from "../../assets/img/icons/settings_light.svg";

import styles from "./styles/Header.module.scss";
import {Avatar} from "@mui/material";

const Header = () => {
    const mobileScreen =  useMediaQuery({maxWidth: 768});
    const navigate = useNavigate();
    const params = useParams();

    const dispatch = useDispatch();
    const notifications = useSelector(notificationSelector);
    const userData = useSelector(userDataSelector);
    const isMobile = useSelector(mobileSelector) || mobileScreen;

    // иконки кнопок
    const themeIcon = useToggleIconTheme(themeIconLight, themeIconDark);
    const notificationIcon = useToggleIconTheme(notificationIconDark, notificationIconLight);
    const settingsIcon = useToggleIconTheme(settingsIconDark, settingsIconLight);


    const [settingsAnchor, setSettingsAnchor] = useState(null);
    const [notificationAnchor, setNotificationAnchor] = useState(null);

    const onNotificationClick = (event) => {
        setNotificationAnchor(event.currentTarget);
    };

    const onSettingsClick = (event) => {
        setSettingsAnchor(event.currentTarget);
    }

    return (
        <header className={styles.header__app}
            style={!isMobile ? {
                height: '1.5rem'
            } : {}}
        >
            {
                isMobile ? (
                    Object.keys(params).length !== 0 ?
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40
                            }}
                            src={userData ? userData.photoURL : null}
                        />
                        <SearchRoundedIcon
                            onClick={() => navigate('/search')}
                        />
                        {
                            params.task_id &&
                            <TaskGroupMenuContainer />
                        }
                    </div>
                    :
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40
                            }}
                            src={userData ? userData.photoURL : null}
                        />
                        <SearchRoundedIcon
                            onClick={() => navigate('/search')}
                        />
                    </div>
                )
                    :
                <HamburgerMenu/>
            }

            <div className={styles.settings__buttons}>
                <IconButton
                    onClick={() => dispatch(setTheme())}
                    imgIcon={themeIcon}
                />

                <StyledBadge badgeContent={notifications.length}>
                    <IconButton
                        imgIcon={notificationIcon}
                        onClick={onNotificationClick}
                    />

                    <NotificationWindow
                        setAnchor={setNotificationAnchor}
                        anchor={notificationAnchor}
                    />
                </StyledBadge>

                <IconButton
                    imgIcon={settingsIcon}
                    onClick={onSettingsClick}
                />
                <SettingsWindow
                    anchor={settingsAnchor}
                    setAnchor={setSettingsAnchor}
                />
            </div>
        </header>
    );
}

export default Header;