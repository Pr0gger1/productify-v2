import React, { FC, useEffect } from 'react';
import useFilteredTasks from 'hooks/useFilteredTasks';
import useGroupTasks from 'hooks/useGroupTasks';
import useNotification from 'hooks/useNotification';
import { setCurrentGroupTasks } from 'store/reducers/TaskSlice';

import CompletedTasksAccordion from './CompletedTasksAccordion';
import CreateTaskButton from 'components/ui/buttons/CreateTaskButton';
import Task from 'components/ui/cards/Task';

import CircularProgress from '@mui/material/CircularProgress';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
	currentGroupTasksSelector,
	filterSelector,
	selectedTaskGroupSelector,
	tasksSelector,
} from 'store/selectors';

import 'components/ui/animations/Task/TaskAnimation.css';
import { RootState, useAppDispatch, useAppSelector } from 'store';
import { ITask, ITaskGroup } from 'types/TaskData';
import { FilterStates } from 'types/Filter';
import styles from './styles.module.scss';

const NoTasksMessage: FC = (): JSX.Element => {
	return (
		<div className={styles.no_tasks__message}>
			В этой группе нет задач. Вперед к приключениям :)
		</div>
	);
};

const TaskContainer = () => {
	const dispatch = useAppDispatch();

	const tasks: ITask[] = useAppSelector(tasksSelector);
	const filter: FilterStates = useAppSelector(filterSelector);

	const currentGroupTasks: ITask[] = useAppSelector(currentGroupTasksSelector);
	const selectedTaskGroup: ITaskGroup = useAppSelector(
		selectedTaskGroupSelector,
	);

	// функция, которая фильтрует массив задач в соответствии с выбранной группой
	const setCurrentTasks: ITask[] = useGroupTasks(
		tasks || [],
		selectedTaskGroup,
	);

	// Конечный массив с отсортированными задачами
	const sortedTasks: ITask[] = useFilteredTasks(
		currentGroupTasks,
		filter.taskFilter,
	);
	const completedTasks: ITask[] = sortedTasks.filter(
		(task: ITask) => task.completed,
	);

	const isCompletedGroup: boolean = selectedTaskGroup.id === 'completed';
	const taskLoading: boolean = useAppSelector(
		(state: RootState) => state.taskStates.loading,
	);

	useNotification();
	useEffect((): void => {
		dispatch(setCurrentGroupTasks(setCurrentTasks));
	}, [dispatch, selectedTaskGroup, tasks]);

	if (!taskLoading)
		return (
			<div className={styles.tasks__container}>
				{!isCompletedGroup && <CreateTaskButton />}
				{taskLoading ? (
					<CircularProgress sx={{ margin: '0 auto' }} />
				) : (
					<>
						<CompletedTasksAccordion completedTasks={completedTasks} />
						{!sortedTasks.length && <NoTasksMessage />}

						<TransitionGroup
							component={'div'}
							style={{
								paddingLeft: '0.5rem',
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem',
							}}
						>
							{sortedTasks
								.filter((task: ITask) => {
									return (
										(isCompletedGroup && task.completed) || !task.completed
									);
								})
								.map((task: ITask, index: number) => (
									<CSSTransition
										key={index}
										timeout={500}
										classNames="item"
										mountOnEnter
									>
										<Task key={task.id} taskDataProps={task} />
									</CSSTransition>
								))}
						</TransitionGroup>
					</>
				)}
			</div>
		);

	return <></>;
};

export default TaskContainer;
