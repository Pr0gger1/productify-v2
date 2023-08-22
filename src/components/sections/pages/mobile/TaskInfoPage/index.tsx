import React, { useEffect } from 'react';
import { useAppSelector } from 'store';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import TaskNameSection from 'components/sections/sidebars/RightSidebar/sections/TaskNameSection';
import TaskDatesSection from 'components/sections/sidebars/RightSidebar/sections/TaskDatesSection';
import TaskNotesSection from 'components/sections/sidebars/RightSidebar/sections/TaskNotesSection';
import TaskCategorySection from 'components/sections/sidebars/RightSidebar/sections/TaskCategorySection';
import BackButton from 'components/ui/buttons/BackButton';

import {
	selectedTaskSelector,
	selectedTaskGroupSelector,
} from 'store/selectors';

import { ITask, ITaskGroup } from 'types/TaskData';
import styles from './styles.module.scss';

const TaskInfoPage = () => {
	const navigate: NavigateFunction = useNavigate();
	const selectedTask: ITask | null = useAppSelector(selectedTaskSelector);
	const selectedTaskGroup: ITaskGroup = useAppSelector(
		selectedTaskGroupSelector,
	);

	useEffect((): void => {
		if (selectedTask && !Object.keys(selectedTask).length)
			navigate(`/tasks/${selectedTaskGroup.id}`);
	}, [navigate, selectedTaskGroup, selectedTask]);

	return (
		<div className={styles.content}>
			<BackButton to={`/tasks/${selectedTaskGroup.id}`} />
			<TaskNameSection />
			<TaskCategorySection />
			<TaskDatesSection />
			<TaskNotesSection />
		</div>
	);
};

export default TaskInfoPage;
