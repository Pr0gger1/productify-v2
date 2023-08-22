import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { addTaskAsync } from 'store/reducers/TaskSlice';
import { User } from 'firebase/auth';

import Button from '../Button';
import ConfirmationButton from '../ConfirmationButton';
import { TextField } from '@mui/material';

import { baseGroupIds } from 'store/defaultData/baseGroups';
import { ITask, ITaskGroup } from 'types/TaskData';
import { useAppDispatch, useAppSelector } from 'store';

import { generateUniqueId } from 'utils/generateUniqueId';
import { userDataSelector, selectedTaskGroupSelector } from 'store/selectors';

import { CSSTransition } from 'react-transition-group';
import styles from './styles.module.scss';
import 'components/ui/animations/Button/CreateTaskBtnAnimation.css';
import 'components/ui/animations/Input/InputAnimation.css';

const CreateTaskButton = () => {
	const dispatch = useAppDispatch();
	const [showInput, setShowInput] = useState<boolean>(false);
	const [showButton, setShowButton] = useState<boolean>(true);
	const [taskName, setTaskName] = useState<string>('');

	const selectedTaskGroup: ITaskGroup = useAppSelector(
		selectedTaskGroupSelector,
	);
	const userData: User | null = useAppSelector(userDataSelector);

	const addTaskHandler = (): void => {
		if (userData && userData.uid) {
			const taskData: ITask = {
				taskName,
				completed: false,
				favorite: false,
				createdAt: new Date().getTime(),
				subTasks: [],
				notes: '',
				groupId: selectedTaskGroup.id,
				userId: userData.uid,
				id: generateUniqueId('task', 12, true),
				category: selectedTaskGroup.title,
				deadline: null,
				reminder: null,
				repeat: null,
			};

			if (selectedTaskGroup.id === baseGroupIds.favorite)
				taskData.favorite = true;

			dispatch(addTaskAsync(taskData));
			setTaskName('');
		}
	};

	const onInputKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
		const currentValue: string =
			event.currentTarget.getElementsByTagName('input')[0].value;
		if (event.key === 'Enter' && currentValue.length) addTaskHandler();
		else if (event.key === 'Escape') setShowInput(false);
	};

	const onInputTaskChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setTaskName(event.currentTarget.value);
	};

	return (
		<>
			<CSSTransition
				in={showButton}
				timeout={300}
				classNames="create_task_btn_animation"
				unmountOnExit
			>
				<Button
					className={styles.create_task__btn}
					onClick={() => setShowInput(true)}
				>
					Добавить задачу
				</Button>
			</CSSTransition>

			<CSSTransition
				in={showInput}
				timeout={700}
				classNames="input_animation"
				onEnter={() => setShowButton(false)}
				onExited={() => setShowButton(true)}
				unmountOnExit
			>
				<div className={styles.add_task_input__container}>
					{taskName.length ? (
						<ConfirmationButton variant="ok" onClick={addTaskHandler} />
					) : (
						<ConfirmationButton
							variant="cancel"
							onClick={() => setShowInput(false)}
						/>
					)}
					<TextField
						className={styles.add_task__btn}
						value={taskName}
						onChange={onInputTaskChange}
						onKeyDown={onInputKeyDown}
						sx={{
							width: '100%',
							border: '1px solid transparent',
							'& .MuiInputBase-input': {
								color: 'var(--fontColor)',
							},
						}}
					/>
					{/*<InputField*/}
					{/*    customClasses={[styles.add_task__btn]}*/}
					{/*    value={taskName}*/}
					{/*    onChange={onInputTaskChange}*/}
					{/*    onKeyDown={onInputKeyDown}*/}
					{/*    // onClose={() => setShowInput(false)}*/}
					{/*/>*/}
				</div>
			</CSSTransition>
		</>
	);
};

export default CreateTaskButton;
