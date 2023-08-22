import React, { FC, useContext } from 'react';
import { deleteTaskAsync } from 'store/reducers/TaskSlice';

import { Tooltip } from '@mui/material';
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone';
import { SnackbarContext } from 'context/SnackbarContext';
import { ITask } from 'types/TaskData';
import { useAppDispatch } from 'store';
import { setRSidebarOpen } from 'store/reducers/SidebarSlice';

interface DeleteTaskButtonProps {
	selectedTask: ITask;
}

const DeleteTaskButton: FC<DeleteTaskButtonProps> = ({
	selectedTask,
}): JSX.Element => {
	const { setToast } = useContext(SnackbarContext);
	const dispatch = useAppDispatch();

	const onDeleteTask = (): void => {
		dispatch(deleteTaskAsync(selectedTask.id));
		setToast({
			message: 'Задача удалена',
			type: 'success',
			hideDuration: 2000,
		});
		dispatch(setRSidebarOpen());
	};

	return (
		<Tooltip title="Удалить задачу">
			<DeleteSweepTwoToneIcon
				onClick={onDeleteTask}
				sx={{
					fontSize: 24,
					color: '#ff554b',
					backgroundColor: 'var(--bgColorFirst)',
					borderRadius: '0.5rem',
					padding: 1,
					cursor: 'pointer',
				}}
			/>
		</Tooltip>
	);
};

export default DeleteTaskButton;
