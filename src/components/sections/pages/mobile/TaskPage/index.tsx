import React, {FC} from 'react';

import FilteredContent from 'components/sections/content/FilteredContent';
import ContentTopPanel from 'components/sections/content/ContentTopPanel';
import TaskContainer from 'components/ui/containers/TaskContainer';

import styles from 'components/sections/pages/mobile/TaskPage/styles.module.scss';
import {useAppSelector} from 'store/index';

const TaskPage: FC = (): JSX.Element => {
	const searchFilter: string = useAppSelector(state => state.filterStates.searchFilter);

	return (
		<div className={styles.content}>
			{
				searchFilter.length
					? <FilteredContent/>
					:
					<>
						<ContentTopPanel/>
						<TaskContainer/>
					</>
			}
		</div>
	);
};

export default TaskPage;