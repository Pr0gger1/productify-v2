import React, {FC} from 'react';
import { useMediaQuery } from 'react-responsive';

import Skeleton from '@mui/material/Skeleton';
import TaskGroup from 'components/ui/cards/TaskGroup';

import {RootState, useAppSelector} from 'store/index';
import { mobileSelector, leftSidebarSelector, selectedTaskGroupSelector } from 'store/selectors';

import styles from '../TaskGroupContainer/styles.module.scss';
import {ITaskGroup} from 'types/TaskData';

interface CustomGroupsProps {
    taskGroups: ITaskGroup[],
    onClick: (group: ITaskGroup) => void
}

const CustomGroupContainer: FC<CustomGroupsProps> = ({ taskGroups, onClick }) => {
	const mobileScreen: boolean =  useMediaQuery({maxWidth: 768});
	const isMobile: boolean = useAppSelector(mobileSelector) || mobileScreen;

	const selectedTaskGroup: ITaskGroup = useAppSelector(selectedTaskGroupSelector);
	const isLSidebarOpened: boolean = useAppSelector(leftSidebarSelector);

	const taskGroupLoading = useAppSelector((state: RootState) => state.taskGroupStates.loading);

	const hideOverflow = !isLSidebarOpened ? {
		overflow: 'hidden'
	} : {};

	return (
		<div className={styles.custom_group__container}
			style={hideOverflow}
		>
			{
				taskGroupLoading ?
					<>
						<Skeleton animation={'wave'} width={'100%'}/>
						<Skeleton animation="wave" width={'100%'}/>
					</>
					:
					taskGroups.map((group: ITaskGroup) =>
						<TaskGroup
							key={group.id}
							data={{
								id: group.id,
								icon: group.icon,
								title: group.title,
								isActive: !isMobile && group.id === selectedTaskGroup?.id ? 'active' : null
							}}
							onClick={() => onClick(group)}
						/>
					)
			}
		</div>
	);
};

export default CustomGroupContainer;