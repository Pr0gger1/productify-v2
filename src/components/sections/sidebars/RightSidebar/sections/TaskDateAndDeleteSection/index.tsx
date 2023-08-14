import React, {FC, useEffect, useState} from 'react';
import { useAppSelector } from 'store';
import {DateFormatter} from 'utils/DateFormatter';
import {ITask} from 'types/TaskData';

import DeleteTaskButton from 'components/ui/buttons/DeleteTaskButton';

import { selectedTaskSelector } from 'store/selectors';
import styles from './styles.module.scss';

type taskStateT = 'Задача создана' | 'Задача выполнена';

const TaskDateAndDeleteSection: FC = (): JSX.Element => {
	const selectedTask: ITask | null = useAppSelector(selectedTaskSelector);
	const [taskDate, setTaskDate] = useState<number>(selectedTask?.createdAt ?? new Date().getTime());
	const [taskState, setTaskState] = useState<taskStateT>('Задача создана');
    
	useEffect(() => {
		if (selectedTask?.completed) {
			setTaskDate(new Date().getTime());
			setTaskState('Задача выполнена');
		}
		else {
			setTaskDate(selectedTask?.createdAt ?? new Date().getTime());
			setTaskState('Задача создана');
		}
	}, [selectedTask]);

	return (
		<>
			{
				selectedTask &&
                <div className={styles.task_date_deleteBtn__container}>
                	<span>
                		{taskState} {new DateFormatter().getFullDate(taskDate)}
                	</span>
                	<DeleteTaskButton
                		selectedTask={selectedTask}
                	/>
                </div>
			}
		</>
	);
};

export default TaskDateAndDeleteSection;