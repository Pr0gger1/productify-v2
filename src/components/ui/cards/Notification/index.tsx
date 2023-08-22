import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { deleteNotification } from 'store/reducers/NotificationSlice';

import { updateTaskAsync } from 'store/reducers/TaskSlice';
import Button from '@mui/material/Button';
import { tasksSelector } from 'store/selectors';
import { ITaskNotification } from 'types/Notification';
import { ITask } from 'types/TaskData';

import styles from './styles.module.scss';

interface NotificationProps {
	data: ITaskNotification;
}

const Notification: FC<NotificationProps> = ({ data }) => {
	const dispatch = useAppDispatch();
	const tasks: ITask[] = useAppSelector(tasksSelector);

	const onDoneClick = (): void => {
		dispatch(deleteNotification(data.id));

		const notifiedTask: ITask | undefined = tasks.find(
			(task: ITask) => task.id === data.taskId,
		);
		if (notifiedTask) {
			const taskData: ITask = {
				...notifiedTask,
				completed: !notifiedTask.completed,
			};
			dispatch(updateTaskAsync(taskData));
		}
	};

	const onReadClick = (): void => {
		dispatch(deleteNotification(data.id));
	};

	const borderLeft: string = data.type === 'reminder' ? '#3354FF' : '#f9266c';

	return (
		<div
			className={styles.notification}
			style={{
				borderLeft: `2px solid ${borderLeft}`,
			}}
		>
			<h5>{data.taskName}</h5>

			<p>{data.message}</p>

			<div className={styles.notification__buttons}>
				<Button
					variant="contained"
					color="success"
					className={styles.button__done}
					onClick={onDoneClick}
				>
					Выполнить
				</Button>

				<Button
					variant="outlined"
					color="error"
					className={styles.button__read}
					onClick={onReadClick}
				>
					Прочитано
				</Button>
			</div>
		</div>
	);
};

export default Notification;
