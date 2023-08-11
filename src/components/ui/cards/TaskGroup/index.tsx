import React, { FC, useMemo, useState } from 'react';
import { useAppSelector } from 'store/index';
import useGroupTasks from 'hooks/useGroupTasks';

import { ITask } from 'types/TaskData';

import { tasksSelector } from 'store/selectors';
import styles from './styles.module.scss';

export interface TaskGroupData {
    id: string,
    icon: string,
    title: string,
    isActive: string | null
}
interface TaskGroupProps {
    data: TaskGroupData,
    onClick: () => void
}

const TaskGroup: FC<TaskGroupProps> = ({ data, onClick }) => {
	const [tasksCount, setTasksCount] = useState<number>(0);

	const tasks: ITask[] = useAppSelector(tasksSelector);
	const setCurrentTasks = useGroupTasks(tasks, data);

	useMemo((): void => {

		const count: number = setCurrentTasks().length;
		setTasksCount(count);
	}, [setCurrentTasks]);

	const groupStyle: string = `${styles.group}${data.isActive ? ` ${styles['active']}`: ''}`;

	return (
		<div className={groupStyle}
			onClick={onClick}
		>
			<div className={styles.icon_title}>
				<img src={data.icon}
					alt={`${data.title}_icon`}
					className={styles.group__icon}
				/>
				<p>{ data.title }</p>
				{
					tasksCount !== 0 &&
                <div className={styles.counter}>
                	{tasksCount}
                </div>
				}
			</div>
		</div>
	);
};

export default TaskGroup;