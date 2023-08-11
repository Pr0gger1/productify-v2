import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { setRSidebarOpen } from 'store/reducers/SidebarSlice';
import { setSelectedTask } from 'store/reducers/TaskSlice';

import SidebarCloseButton from 'components/sections/sidebars/RightSidebar/components/sections/SidebarCloseButtonBlock';
import TaskNameSection from 'components/sections/sidebars/RightSidebar/components/sections/TaskNameSection';
import TaskCategorySection from 'components/sections/sidebars/RightSidebar/components/sections/TaskCategorySection';
import TaskNotesSection from 'components/sections/sidebars/RightSidebar/components/sections/TaskNotesSection';
import TaskDatesSection from 'components/sections/sidebars/RightSidebar/components/sections/TaskDatesSection';
import TaskDateAndDeleteSection from 'components/sections/sidebars/RightSidebar/components/sections/TaskDateAndDeleteSection';

import { ITask, ITaskGroup } from 'types/TaskData';
import { rightSidebarSelector, selectedTaskGroupSelector, selectedTaskSelector } from 'store/selectors';

import 'components/ui/animations/Button/CreateListBtnAnimation.css';
import styles from './styles.module.scss';

const RightSidebar: FC = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate: NavigateFunction = useNavigate();

	const isRSidebarOpened: boolean = useAppSelector(rightSidebarSelector);
	const selectedTaskGroup: ITaskGroup = useAppSelector(selectedTaskGroupSelector);
	const selectedTask: ITask | null = useAppSelector(selectedTaskSelector);

	useEffect(() => {
		if (!isRSidebarOpened) {
			navigate(`/tasks/${selectedTaskGroup.id}`);
			dispatch(setSelectedTask(null));
		}
	}, [dispatch, isRSidebarOpened, navigate, selectedTaskGroup.id]);

	useEffect(() => {
		if (selectedTask && !Object.keys(selectedTask).length && isRSidebarOpened)
			dispatch(setRSidebarOpen());
	}, [selectedTask, isRSidebarOpened, dispatch]);


	return (
		<aside className={styles.sidebar__right}
			data-rsidebar-active={isRSidebarOpened}
		>
			<div className={styles.sidebar_container}>
				<SidebarCloseButton/>
				<TaskNameSection/>
				<TaskCategorySection/>
				<TaskDatesSection/>
				<TaskNotesSection/>
				<TaskDateAndDeleteSection/>
			</div>
		</aside>
	);
};

export default RightSidebar;