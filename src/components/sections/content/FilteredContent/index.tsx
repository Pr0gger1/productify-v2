import React, { ChangeEvent, FC, useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from 'store';
import { setCurrentGroupTasks } from 'store/reducers/TaskSlice';
import { setSearchFilter } from 'store/reducers/FilterSlice';

import Task from 'components/ui/cards/Task';
import SearchInput from 'components/ui/input/SearchInput';
import BackButton from 'components/ui/buttons/BackButton';

import { ITask } from 'types/TaskData';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
	currentGroupTasksSelector,
	tasksSelector,
	mobileSelector,
} from 'store/selectors';

import styles from './styles.module.scss';

const FilteredContent: FC = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const currentGroupTasks: ITask[] = useAppSelector(currentGroupTasksSelector);
	const searchFilter: string = useAppSelector(
		(state: RootState) => state.filterStates.searchFilter,
	);
	const tasks: ITask[] = useAppSelector(tasksSelector);
	const isMobile: boolean = useAppSelector(mobileSelector);

	useEffect((): void => {
		let currentTasks: ITask[];
		if (searchFilter && searchFilter.length) {
			currentTasks = tasks.filter((task: ITask) =>
				task.taskName.includes(searchFilter),
			);
		} else currentTasks = [];

		dispatch(setCurrentGroupTasks(currentTasks));
	}, [dispatch, searchFilter, tasks]);

	const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
		dispatch(setSearchFilter({ searchFilter: event.target.value }));
	};

	return (
		<div className={styles.tasks__container}>
			{isMobile && (
				<div className={styles.search__container}>
					<BackButton />
					<SearchInput value={searchFilter} onChange={onSearchChange} />
				</div>
			)}
			<TransitionGroup
				style={{
					padding: isMobile ? '5rem 0 0 0' : '0 0 0 0.5rem',
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
				}}
			>
				{currentGroupTasks.length > 0 &&
					currentGroupTasks.map((task: ITask, index: number) => (
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
		</div>
	);
};

export default FilteredContent;
