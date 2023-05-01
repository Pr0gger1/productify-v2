import { useDispatch, useSelector } from "react-redux";
import { repeatType } from "../components/ui/TaskInfo/components/RepeatComponent";
import { DateFormatter } from "../utils/DateFormatter";

import { updateTaskAsync } from "../store/reducers/TaskSlice";
import { useEffect } from "react";
import { updateNotifications } from "../store/reducers/NotificationSlice";
import { generateUniqueId } from "../utils/generateUniqueId";
import {tasksSelector} from "../store";

const reminderObserver = async (tasks, dispatch) => {
    tasks.forEach((task) => {
        if (task.isRemindNotified !== undefined && task.reminder) {
            const isReminderExpired = new Date(task.reminder) < new Date();
            const message = 'Напоминание';

            if (!task.completed && isReminderExpired && !task.isRemindNotified) {
                const notification = new Notification(message, {
                    body: `${task.taskName}`,
                    }
                );

                setTimeout(notification.close.bind(notification), 8000);

                let taskData = {...task}
                taskData.isRemindNotified = true;
                taskData.reminder = null;

                dispatch(updateTaskAsync(taskData));

                dispatch(updateNotifications({
                    notification: {
                        taskName: taskData.taskName,
                        type: 'reminder', message,
                        id: generateUniqueId('notify', 4, true),
                        taskId: taskData.id
                    }
                }));
            }
        }
    });
}

const deadlineObserver = async (tasks, dispatch) => {
    // console.log("observing deadlines")
    tasks.forEach((task) => {
        if (task.isDeadlineNotified !== undefined && task.deadline) {
            const timeDiff = Math.ceil((new Date(task.deadline) - new Date()) / (1000 * 3600 * 24));
            const message = 'Завтра срок выполнения задачи';

            if (timeDiff < 2 && !task.completed && !task.isDeadlineNotified) {
                const notification = new Notification(message, {
                    body: `${task.taskName}`,
                    }
                );

                setTimeout(notification.close.bind(notification), 8000);

                let taskData = {...task}

                const currentDeadline = new Date(taskData.deadline);

                switch (taskData.repeat) {
                    case repeatType.everyDay:
                        taskData.deadline = DateFormatter.setDate({date: currentDeadline, days: 1});
                        break;
                    case repeatType.everyWeek:
                        taskData.deadline = DateFormatter.setDate({date: currentDeadline, days: 7});
                        break;
                    case repeatType.everyMonth:
                        taskData.deadline = DateFormatter.setDate({date: currentDeadline, months: 1});
                        break;
                    default:
                        taskData.isDeadlineNotified = true;
                }

                dispatch(updateTaskAsync(taskData));
                dispatch(updateNotifications({
                    notification: {
                        taskName: taskData.taskName,
                        type: 'deadline', message,
                        id: generateUniqueId('notify', 4, true),
                        taskId: taskData.id
                    }
                }))
            }
        }
    });
}

const useNotification = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(tasksSelector);

    useEffect(() => {
        const observeTasks = setInterval( async () => {
            if ('Notification' in window) {
                Notification.requestPermission()
                    .then(async permission => {
                        if (permission === 'granted') {
                            await reminderObserver(tasks, dispatch);
                            await deadlineObserver(tasks, dispatch);
                        }
                    })
            }
            // console.log('observing notification')
        }, 10000);

        return () => clearInterval(observeTasks)
    }, [dispatch, tasks])
}

export default useNotification;