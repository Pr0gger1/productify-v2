import React, { FC, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
	mobileSelector,
	filterSelector,
	selectedTaskGroupSelector,
} from 'store/selectors';

import TaskContainer from 'components/ui/containers/TaskContainer';
import ContentTopPanel from './ContentTopPanel';
import FilteredContent from './FilteredContent';

import { ITaskGroup } from 'types/TaskData';
import { useAppSelector } from 'store';
import styles from './styles.module.scss';

const Content: FC = (): JSX.Element => {
	const mobileScreen: boolean = useMediaQuery({ maxWidth: 768 });
	const isMobile: boolean = useAppSelector(mobileSelector) || mobileScreen;
	const selectedGroup: ITaskGroup | null = useAppSelector(
		selectedTaskGroupSelector,
	);
	const searchFilter: string = useAppSelector(filterSelector).searchFilter;

	useEffect((): void => {
		document.title = selectedGroup?.webTitle || 'Productify';
	}, [selectedGroup]);

	return (
		<div className={styles.content} style={!isMobile ? { width: '100vw' } : {}}>
			{searchFilter.length ? (
				<FilteredContent />
			) : (
				<>
					<ContentTopPanel />
					<TaskContainer />
				</>
			)}
		</div>
	);
};

export default Content;
