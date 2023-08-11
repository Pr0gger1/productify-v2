import React, {ChangeEvent, FC, useState} from 'react';
import { deleteSubTaskAsync, updateSubTaskAsync } from 'store/reducers/TaskSlice';

import CheckboxInputField from 'components/ui/input/CheckboxInputField';
import DeleteButton from 'components/ui/buttons/DeleteButton';

import { selectedTaskSelector } from 'store/selectors';
import {useAppDispatch, useAppSelector} from 'store/index';

import styles from './styles.module.scss';
import {ISubTask, ITask} from 'types/TaskData';

interface subTaskProps {
    subTaskData: ISubTask
}

const SubTask: FC<subTaskProps> = ({ subTaskData }): JSX.Element => {
	const dispatch = useAppDispatch();

	const [subTaskName, setSubTaskName] = useState<string>(
		subTaskData.taskName || ''
	);
	const [subTaskCompleted, setSubTaskCompleted] = useState<boolean>(
		subTaskData.completed
	);

	const selectedTask: ITask | null = useAppSelector(selectedTaskSelector);

	const onTaskNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const newSubTaskData: ISubTask = {
			...subTaskData,
			taskName: event.target.value
		};

		setSubTaskName(event.target.value);

		if (subTaskName.length && selectedTask)
			dispatch(updateSubTaskAsync({
				taskId: selectedTask.id,
				subTaskId: newSubTaskData.id,
				subTaskData: newSubTaskData
			}));
	};

	const onCheckboxChange = (): void => {
		const completed: boolean = !subTaskData.completed;
		const newSubTaskData: ISubTask = {
			...subTaskData, completed
		};

		setSubTaskCompleted(completed);

		if (selectedTask)
			dispatch(updateSubTaskAsync({
				taskId: selectedTask.id,
				subTaskId: subTaskData.id,
				subTaskData: newSubTaskData
			}));
	};

	const deleteSubTaskHandler = (): void => {
		if (selectedTask)
			dispatch(deleteSubTaskAsync({
				taskId: selectedTask.id,
				subTaskId: subTaskData.id
			}));
	};

	return (
		<div className={styles.subtask}>
			<CheckboxInputField
				inputValue={subTaskName}
				onChangeInput={onTaskNameChange}
				onChangeCheckbox={onCheckboxChange}
				checked={subTaskCompleted || subTaskData.completed}
				inputStyle={{
					textDecoration: subTaskData.completed
						? 'line-through' : 'none'
				}}
			/>
			<DeleteButton
				onClick={deleteSubTaskHandler}
			/>
		</div>
	);
};

export default SubTask;