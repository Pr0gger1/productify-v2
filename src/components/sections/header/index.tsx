import React, { FC, MouseEvent } from 'react';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import useToggleIconTheme from 'hooks/useToggleIconTheme';

import { setTheme } from 'store/reducers/ThemeSlice';

import TaskGroupMenuContainer from 'components/ui/windows/contextMenu/task_page/TaskGroupMenuContainer';
import HamburgerMenu from 'components/sections/header/HamburgerMenu';
import NotificationWindow from 'components/sections/header/NotificationWindow';
import HeaderSettings from 'components/sections/header/SettingsWindow';
import IconButton from 'components/ui/buttons/IconButton';
import { StyledBadge } from 'components/ui/custom/CustomBadge';

import {
	mobileSelector,
	notificationSelector,
	userDataSelector,
} from 'store/selectors';
import {
	NavigateFunction,
	Params,
	useNavigate,
	useParams,
} from 'react-router-dom';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import styles from './styles.module.scss';
import { Avatar } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';
import { ITaskNotification } from 'types/Notification';
import { User } from 'firebase/auth';

import themeIconLight from 'assets/img/icons/theme_icon_light.svg';
import themeIconDark from 'assets/img/icons/theme_icon_dark.svg';
import notificationIconDark from 'assets/img/icons/bell_dark.svg';
import notificationIconLight from 'assets/img/icons/bell_light.svg';
import settingsIconDark from 'assets/img/icons/settings_dark.svg';
import settingsIconLight from 'assets/img/icons/settings_light.svg';

const Header: FC = (): JSX.Element => {
	const mobileScreen: boolean = useMediaQuery({ maxWidth: 768 });
	const navigate: NavigateFunction = useNavigate();
	const params: Readonly<Params> = useParams();

	const dispatch = useAppDispatch();
	const notifications: ITaskNotification[] =
		useAppSelector(notificationSelector);
	const userData: User | null = useAppSelector(userDataSelector);
	const isMobile: boolean = useAppSelector(mobileSelector) || mobileScreen;

	// иконки кнопок
	const themeIcon: string = useToggleIconTheme(themeIconLight, themeIconDark);
	const notificationIcon: string = useToggleIconTheme(
		notificationIconDark,
		notificationIconLight,
	);
	const settingsIcon: string = useToggleIconTheme(
		settingsIconDark,
		settingsIconLight,
	);

	const [settingsAnchor, setSettingsAnchor] = useState<HTMLElement | null>(
		null,
	);
	const [notificationAnchor, setNotificationAnchor] =
		useState<HTMLElement | null>(null);

	const onNotificationClick = (event: MouseEvent<HTMLButtonElement>): void => {
		setNotificationAnchor(event.currentTarget);
	};

	const onSettingsClick = (event: MouseEvent<HTMLButtonElement>): void => {
		setSettingsAnchor(event.currentTarget);
	};

	return (
		<header className={styles.header__app}>
			{isMobile ? (
				Object.keys(params).length !== 0 ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
						}}
					>
						<Avatar
							sx={{
								width: 40,
								height: 40,
							}}
							src={userData?.photoURL || undefined}
						/>
						<SearchRoundedIcon onClick={() => navigate('/search')} />
						{params.task_id && <TaskGroupMenuContainer />}
					</div>
				) : (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
						}}
					>
						<Avatar
							sx={{
								width: 40,
								height: 40,
							}}
							src={userData?.photoURL || undefined}
						/>
						<SearchRoundedIcon onClick={() => navigate('/search')} />
					</div>
				)
			) : (
				<HamburgerMenu />
			)}

			<div className={styles.settings__buttons}>
				<IconButton
					onClick={() => dispatch(setTheme())}
					imgIcon={themeIcon}
					name="theme_button"
				/>

				<StyledBadge badgeContent={notifications.length}>
					<IconButton
						imgIcon={notificationIcon}
						onClick={onNotificationClick}
						name="notification_button"
					/>

					<NotificationWindow
						setAnchor={setNotificationAnchor}
						anchor={notificationAnchor}
					/>
				</StyledBadge>

				<IconButton
					imgIcon={settingsIcon}
					onClick={onSettingsClick}
					name="settings_button"
				/>
				<HeaderSettings anchor={settingsAnchor} setAnchor={setSettingsAnchor} />
			</div>
		</header>
	);
};

export default Header;
