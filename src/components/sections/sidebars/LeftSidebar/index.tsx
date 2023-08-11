import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import { setLSidebarOpen } from 'store/reducers/SidebarSlice';
import { leftSidebarSelector } from 'store/selectors';

import UserDataCard from 'components/ui/cards/UserDataCard';
import SearchInput from 'components/ui/input/SearchInput';
import TaskGroupContainer from 'components/ui/containers/TaskGroups/TaskGroupContainer';

import styles from './styles.module.scss';

const LeftSidebar = () => {
	const dispatch = useAppDispatch();
	const isLSidebarOpened: boolean = useAppSelector(leftSidebarSelector);

	const searchClickHandler = (): void => {
		if (!isLSidebarOpened) dispatch(setLSidebarOpen());
	};

	return (
		<aside className={styles.sidebar__left}
			data-lsidebar-active={isLSidebarOpened}
		>
			<UserDataCard/>
			<SearchInput
				onClick={searchClickHandler}
				placeholder="Поиск..."
			/>
			<TaskGroupContainer/>
		</aside>
	);
};
export default LeftSidebar;