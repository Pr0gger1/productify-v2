import React from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from 'store/index';
import { taskGroupsSelector } from 'store/selectors';
import { setSelectedGroup } from 'store/reducers/TaskGroupSlice';

import CreateListButton from 'components/ui/buttons/CreateListButton';
import BaseGroupContainer from '../BaseGroupContainer';
import CustomGroupContainer from '../CustomGroupContainer';

import styles from './styles.module.scss';
import {ITaskGroup, ITaskGroups} from 'types/TaskData';

const TaskGroupContainer = () => {
	const dispatch = useAppDispatch();
	const navigate: NavigateFunction = useNavigate();

	const taskGroups: ITaskGroups = useAppSelector(taskGroupsSelector);

	const onClickGroupHandler = (group: ITaskGroup): void => {
		dispatch(setSelectedGroup(group));
		navigate(`/tasks/${group.id}`);
	};

	return (
		<div className={styles.groups}>
			<BaseGroupContainer
				taskGroups={taskGroups.base}
				onClick={onClickGroupHandler}
			/>

			<div className={styles.container}>
				<CustomGroupContainer
					taskGroups={taskGroups.custom}
					onClick={onClickGroupHandler}
				/>
				<CreateListButton/>
			</div>
		</div>
	);
};

export default TaskGroupContainer;