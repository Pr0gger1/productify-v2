import React, { FC } from 'react';
import { useMediaQuery } from 'react-responsive';

import TaskGroup from 'components/ui/cards/TaskGroup';
import { mobileSelector, selectedTaskGroupSelector } from 'store/selectors';

import styles from 'components/ui/containers/TaskGroups/TaskGroupContainer/styles.module.scss';
import { ITaskGroup } from 'types/TaskData';
import { useAppSelector } from 'store';

interface BaseGroupsProps {
	taskGroups: ITaskGroup[];
	onClick: (group: ITaskGroup) => void;
}

const BaseGroupContainer: FC<BaseGroupsProps> = ({ taskGroups, onClick }) => {
	const mobileScreen: boolean = useMediaQuery({ maxWidth: 768 });
	const isMobile: boolean = useAppSelector(mobileSelector) || mobileScreen;
	const selectedTaskGroup: ITaskGroup = useAppSelector(
		selectedTaskGroupSelector,
	);

	return (
		<div className={styles.base_group__container}>
			{taskGroups.map((group: ITaskGroup) => (
				<TaskGroup
					key={group.id}
					data={{
						id: group.id,
						icon: group.icon,
						title: group.title,
						isActive:
							!isMobile && group.id === selectedTaskGroup.id ? 'active' : null,
					}}
					onClick={() => onClick(group)}
				/>
			))}
		</div>
	);
};

export default BaseGroupContainer;
