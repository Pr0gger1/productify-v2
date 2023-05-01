import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { notificationSelector } from "../../../store";

import Notification from '../cards/Notification';

import { CSSTransition } from 'react-transition-group';
import { TransitionGroup } from 'react-transition-group';
import '../animations/Notifications/notificationAnimation.css';
import styles from './styles/NotificationContainer.module.scss';

const NotificationContainer = () => {
    const notifications = useSelector(notificationSelector);
    const [show, setShow] = useState(true);

    return (
        <div className={styles.notification__container}>
            {
                notifications.length === 0 && 
                <span>Нет уведомлений</span>
            }

                <TransitionGroup className={styles.wrapper}>
                    {
                        notifications.map((notify, index) => 
                        <CSSTransition
                            key={index}
                            in={show}
                            classNames="notification"
                            timeout={300}
                            
                        >
                            <Notification
                                data={notify}
                            />
                        </CSSTransition>
                        )
                    }
                </TransitionGroup>
        </div>
    );
};

export default NotificationContainer;