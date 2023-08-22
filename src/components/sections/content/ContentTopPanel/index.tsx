import React, { FC } from 'react';
import { useMediaQuery } from 'react-responsive';

import TaskGroupMenuContainer from 'components/ui/windows/contextMenu/task_page/TaskGroupMenuContainer';
import BackButton from 'components/ui/buttons/BackButton';

import { DateFormatter } from 'utils/DateFormatter';
import { mobileSelector, selectedTaskGroupSelector } from 'store/selectors';

import 'components/ui/animations/ContextMenu/ContextMenuPageAnimation.scss';
import styles from './styles.module.scss';
import { ITaskGroup } from 'types/TaskData';
import { useAppSelector } from 'store';

const ContentTopPanel: FC = (): JSX.Element => {
	const mobileScreen: boolean = useMediaQuery({ maxWidth: 768 });
	const isMobile: boolean = useAppSelector(mobileSelector) || mobileScreen;

	const selectedTaskGroup: ITaskGroup | null = useAppSelector(
		selectedTaskGroupSelector,
	);

	return (
		<section className={styles.content__top_panel}>
			{isMobile && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<BackButton to="/" />
					<TaskGroupMenuContainer />
				</div>
			)}

			<div className={styles.top_panel__left}>
				<div className={styles.task_list__title}>
					<span>
						{selectedTaskGroup?.pageTitle}
						<span className={styles.day_of_week__title}>
							{new DateFormatter().getDayOfWeek()}
						</span>
					</span>
				</div>

				<span className={styles.date__title}>
					{new DateFormatter().getFullDate()}
				</span>
			</div>

			{!mobileScreen && <TaskGroupMenuContainer />}
		</section>
	);
};

export default ContentTopPanel;
