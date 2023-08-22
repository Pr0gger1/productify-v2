import React, { FC } from 'react';
import SubTask from 'components/ui/cards/SubTask';
import { selectedTaskSelector } from 'store/selectors';

import styles from './styles.module.scss';
import { ISubTask, ITask } from 'types/TaskData';
import { useAppSelector } from 'store';

const SubTaskContainer: FC = (): JSX.Element => {
	const selectedTask: ITask | null = useAppSelector(selectedTaskSelector);
	return (
		<>
			{selectedTask &&
				selectedTask.subTasks &&
				selectedTask.subTasks.length !== 0 && (
					<div className={styles.subtask__container}>
						{selectedTask.subTasks.map((subTask: ISubTask) => (
							<SubTask key={subTask.id} subTaskData={subTask} />
						))}
					</div>
				)}
		</>
	);
};

export default SubTaskContainer;
