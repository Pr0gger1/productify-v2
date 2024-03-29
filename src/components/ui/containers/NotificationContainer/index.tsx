import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { notificationSelector } from 'store/selectors';
import { clearNotifications } from 'store/reducers/NotificationSlice';

import Notification from 'components/ui/cards/Notification';
import { CSSTransition } from 'react-transition-group';

import Button from '@mui/material/Button';

import { ITaskNotification } from 'types/Notification';
import { TransitionGroup } from 'react-transition-group';

import 'components/ui/animations/Notifications/notificationAnimation.css';
import styles from './styles.module.scss';

const NotificationContainer = () => {
	const dispatch = useAppDispatch();
	const notifications: ITaskNotification[] =
		useAppSelector(notificationSelector);
	const [show, setShow] = useState<boolean>(true);

	return (
		<div className={styles.notification__container}>
			{notifications.length === 0 && <span>Нет уведомлений</span>}

			<TransitionGroup className={styles.wrapper}>
				{notifications.map((notify: ITaskNotification, index: number) => (
					<CSSTransition
						key={index}
						in={show}
						classNames="notification"
						timeout={300}
						onEnter={() => setShow(true)}
					>
						<Notification data={notify} />
					</CSSTransition>
				))}
			</TransitionGroup>
			{notifications.length !== 0 && (
				<Button
					variant={'contained'}
					onClick={() => dispatch(clearNotifications())}
				>
					Очистить все
				</Button>
			)}
		</div>
	);
};

export default NotificationContainer;
