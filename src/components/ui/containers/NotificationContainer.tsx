import React, { useState } from "react";
import { notificationSelector } from "../../../store";

import Notification from "../cards/Notification";

import { CSSTransition } from "react-transition-group";
import { TransitionGroup } from "react-transition-group";
import "../animations/Notifications/notificationAnimation.css";
import styles from "./styles/NotificationContainer.module.scss";
import {useAppSelector} from "../../../store/store";
import {ITaskNotification} from "../../../interfaces/Notification";

const NotificationContainer = () => {
    const notifications: ITaskNotification[] = useAppSelector(notificationSelector);
    const [show, setShow] = useState<boolean>(true);

    return (
        <div className={styles.notification__container}>
            {
                notifications.length === 0 && 
                <span>Нет уведомлений</span>
            }

                <TransitionGroup className={styles.wrapper}>
                    {
                        notifications.map((notify: ITaskNotification, index: number) =>
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