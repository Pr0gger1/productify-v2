import React, { FC } from 'react';
import { selectedTaskSelector } from 'store/selectors';

import Stack from '@mui/material/Stack';
import DeleteTaskButton from 'components/ui/buttons/DeleteTaskButton';

import styles from '../TaskGroupMenuContainer/TaskGroupMenuContainer.module.scss';
import { useAppSelector } from 'store';
import { ITask } from 'types/TaskData';

const TaskPageMenuList: FC = () => {
	const selectedTask: ITask | null = useAppSelector(selectedTaskSelector);

	return (
		<Stack>
			<div className={styles.menu__item}>
				{selectedTask && <DeleteTaskButton selectedTask={selectedTask} />}
				Удалить задачу
			</div>
		</Stack>
	);
};

export default TaskPageMenuList;
