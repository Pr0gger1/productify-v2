import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from 'store/index';
import {ITask} from 'types/TaskData';

import DeadlinePicker from '../../DeadlinePicker';
import ReminderPicker from '../../RemiderPicker';
import RepeatComponent from '../../RepeatComponent';
import { selectedTaskSelector } from 'store/selectors';

import styles from './styles.module.scss';

const TaskDatesSection: FC = (): JSX.Element => {
	const selectedTask: ITask | null = useAppSelector(selectedTaskSelector);

	const [showDeadlinePicker,
		setShowDeadlinePicker] = useState<boolean>(false);

	const [showReminderPicker,
		setShowReminderPicker] = useState<boolean>(false);

	useEffect((): void => {
		if (selectedTask) {
			if (!selectedTask.reminder)
				setShowReminderPicker(false);

			if (!selectedTask.deadline)
				setShowDeadlinePicker(false);
		}
	}, [selectedTask]);

	return (
		<>
			<div className={styles.date_and_repeat}>
				{
					selectedTask?.deadline ?? showDeadlinePicker ?
						<DeadlinePicker
							setShowDeadlinePicker={setShowDeadlinePicker}
						/>
						:
						<div className={styles.deadline__btn}
							onClick={() => setShowDeadlinePicker(prev => !prev)}
						>
                        Дата выполнения
						</div>
				}
				<RepeatComponent/>
				{
					selectedTask?.reminder ?? showReminderPicker ?
						<ReminderPicker
							setShowReminderPicker={setShowReminderPicker}
						/>
						:
						<div className={styles.reminder__btn}
							onClick={() => setShowReminderPicker(prev => !prev)}
						>
                        Напоминание
						</div>
				}
			</div>

		</>
	);
};

export default TaskDatesSection;