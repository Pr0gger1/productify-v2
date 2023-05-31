import { repeatType } from "../components/ui/rightSidebarComponents/components/RepeatComponent";
import { DateFormatter } from "../utils/DateFormatter";

import { updateTaskAsync } from "../store/reducers/TaskSlice";
import { useEffect } from "react";
import { updateNotifications } from "../store/reducers/NotificationSlice";
import { generateUniqueId } from "../utils/generateUniqueId";
import {tasksSelector} from "../store";
import {ITask} from "../interfaces/TaskData";
import {RootState, TypedDispatch, useAppDispatch, useAppSelector} from "../store/store";
import {ITaskNotification} from "../interfaces/Notification";
// import {onMessageListener} from "../firebase.config";

const reminderObserver = async (tasks: ITask[], dispatch: TypedDispatch<RootState>) => {
    tasks.forEach((task: ITask): void => {
        if (task.isRemindNotified !== undefined && task.reminder) {
            const isReminderExpired: boolean= new Date(task.reminder) < new Date();
            const message: string = "Напоминание";

            if (!task.completed && isReminderExpired && !task.isRemindNotified) {
                // onMessageListener().then(payload => {
                //     const notification = new Notification(payload?.notification?.title ?? "test",
                //         {body: payload?.notification?.body}
                //     );
                //     setTimeout(notification.close.bind(notification), 8000);
                // })
                const notification = new Notification(message, {
                    body: `${task.taskName}`,
                    }
                );

                setTimeout(notification.close.bind(notification), 8000);

                let taskData: ITask = {...task};
                taskData.isRemindNotified = true;
                taskData.reminder = null;

                dispatch(updateTaskAsync(taskData));
                const taskNotification: ITaskNotification = {
                    taskName: taskData.taskName,
                    type: "reminder", message,
                    id: generateUniqueId("notify", 4, true),
                    taskId: taskData.id
                }

                dispatch(updateNotifications(taskNotification));
            }
        }
    });
}

const deadlineObserver = async (tasks: ITask[], dispatch: TypedDispatch<RootState>) => {
    // console.log("observing deadlines")
    tasks.forEach((task: ITask): void => {
        if (task.isDeadlineNotified !== undefined && task.deadline) {
            const timeDiff: number = Math.ceil(
                (new Date(task.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
            );
            const message: string = "Завтра срок выполнения задачи";

            if (timeDiff < 2 && !task.completed && !task.isDeadlineNotified) {
                // onMessageListener().then(payload => {
                //     const notification = new Notification(payload?.notification?.title ?? "test",
                //         {body: payload?.notification?.body}
                //     );
                //     setTimeout(notification.close.bind(notification), 8000);
                // })
                const notification: Notification = new Notification(message, {
                    body: `${task.taskName}`,
                    }
                );

                setTimeout(notification.close.bind(notification), 8000);

                let taskData: ITask = {...task};
                let currentDeadline: Date;

                if (taskData.deadline) {
                    currentDeadline = new Date(taskData.deadline);
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
                    const notification: ITaskNotification = {
                        taskName: taskData.taskName,
                        type: "deadline", message,
                        id: generateUniqueId("notify", 4, true),
                        taskId: taskData.id
                    };

                    dispatch(updateNotifications(notification))
                }
            }
        }
    });
}

const useNotification = (): void => {
    const dispatch = useAppDispatch();
    const tasks: ITask[] = useAppSelector(tasksSelector);

    useEffect(() => {
        const observeTasks: NodeJS.Timer = setInterval( async (): Promise<void> => {
            if ("Notification" in window) {
                Notification.requestPermission()
                    .then(async (permission: NotificationPermission): Promise<void> => {
                        if (permission === "granted") {
                            await reminderObserver(tasks, dispatch);
                            await deadlineObserver(tasks, dispatch);
                        }
                    })
            }
            // console.log("observing notification")
        }, 10000);

        return (): void => clearInterval(observeTasks)
    }, [dispatch, tasks])
}

export default useNotification;