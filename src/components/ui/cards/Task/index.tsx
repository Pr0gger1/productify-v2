import React, {
	CSSProperties,
	FC,
	MouseEvent,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { setRSidebarOpen } from 'store/reducers/SidebarSlice';
import {
	deleteTaskAsync,
	setSelectedTask,
	updateTaskAsync,
} from 'store/reducers/TaskSlice';

import StarButton from 'components/ui/buttons/StarButton';

import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Checkbox from '@mui/material/Checkbox';

import { DateFormatter } from 'utils/DateFormatter';
import { repeatTaskData } from 'store/defaultData/repeatTaskData';
import { SnackbarContext } from 'context/SnackbarContext';

import { ThemeType } from 'types/slices/SliceStates';
import { ITask, ITaskGroup } from 'types/TaskData';
import {
	themeSelector,
	mobileSelector,
	rightSidebarSelector,
	selectedTaskGroupSelector,
	selectedTaskSelector,
} from 'store/selectors';

import styles from './styles.module.scss';

interface TaskProps {
	taskDataProps: ITask;
}

const Task: FC<TaskProps> = ({ taskDataProps }): JSX.Element => {
	const { setToast } = useContext(SnackbarContext);

	const [isTaskSelected, setIsTaskSelected] = useState<boolean>(false);
	const [isFavorite, setIsFavorite] = useState<boolean>(taskDataProps.favorite);
	const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(
		taskDataProps.completed,
	);

	const dispatch = useAppDispatch();
	const navigate: NavigateFunction = useNavigate();

	const currentTheme: ThemeType = useAppSelector(themeSelector);
	const isMobile: boolean = useAppSelector(mobileSelector);

	const isRSidebarOpen: boolean = useAppSelector(rightSidebarSelector);
	const selectedGroup: ITaskGroup | null = useAppSelector(
		selectedTaskGroupSelector,
	);
	const selectedTask: ITask | null = useAppSelector(selectedTaskSelector);

	const taskStyle: CSSProperties = {
		textDecoration: taskDataProps.completed ? 'line-through' : 'none',
	};

	const onTaskClick = (): void => {
		setIsTaskSelected(prev => !prev);
		if (selectedTask?.id !== taskDataProps.id) {
			/* эта ветка нужна, чтобы при нажатии на другую задачу сайдбар
            не закрывался, а изменял данные внутри
            */

			// Изменяем состояние выбранной задачи, если нажмем на другую задачу
			dispatch(setSelectedTask(taskDataProps));

			// если сайдбар был закрыт, то открываем его
			if (!isRSidebarOpen) dispatch(setRSidebarOpen());
		} else {
			dispatch(setRSidebarOpen());
			dispatch(setSelectedTask(taskDataProps));
		}
		if (selectedGroup)
			navigate(`/tasks/${selectedGroup.id}/${taskDataProps.id}`);
	};

	const favoriteToggleHandler = (event: MouseEvent): void => {
		event.stopPropagation();
		const favorite: boolean = !isFavorite;
		const taskData: ITask = { ...taskDataProps, favorite };

		dispatch(updateTaskAsync(taskData));
		setIsFavorite(prev => !prev);
	};

	const onTaskCheckboxClick = (event: MouseEvent): void => {
		event.stopPropagation();
		const completed: boolean = !isTaskCompleted;

		dispatch(
			updateTaskAsync({
				...taskDataProps,
				completed,
			}),
		);

		setIsTaskCompleted(completed);
	};

	useEffect(() => {
		const onTaskPressed = (event: KeyboardEvent): void => {
			if (event.key === 'Delete') {
				dispatch(deleteTaskAsync(taskDataProps.id));
				dispatch(setRSidebarOpen());

				setToast({
					message: 'Задача удалена',
					type: 'success',
					hideDuration: 2000,
				});
			}
		};

		if (isTaskSelected) window.addEventListener('keydown', onTaskPressed);

		return () => window.removeEventListener('keydown', onTaskPressed);
	}, [dispatch, isTaskSelected, taskDataProps.id]);

	return (
		<div
			className={styles.task}
			onClick={onTaskClick}
			style={
				isTaskCompleted && currentTheme === 'light'
					? { backgroundColor: '#dcfce3' }
					: {}
			}
		>
			<div className={styles.task__checkbox_info}>
				<Checkbox
					sx={{
						color: 'var(--checkboxColor)',
						'& .MuiSvgIcon-root': {
							fontSize: 30,
							borderRadius: '1rem',
						},
						'&.Mui-checked': {
							color: '#68d96d',
						},
					}}
					onClick={onTaskCheckboxClick}
					checked={taskDataProps.completed || isTaskCompleted}
				/>

				<div className={styles.task__info}>
					<span style={taskStyle} className={styles.task__title}>
						{taskDataProps.taskName}
					</span>

					<div className={styles.task__tags}>
						<span>{taskDataProps.category}</span>
						{!isMobile && (
							<>
								{taskDataProps.repeat && (
									<span className={styles.task__repeat}>
										<SyncRoundedIcon className={styles.task__icons} />
										{repeatTaskData[taskDataProps.repeat]}
									</span>
								)}
								{taskDataProps.deadline && (
									<span className={styles.task__deadline}>
										<CalendarMonthOutlinedIcon className={styles.task__icons} />
										{new Date(taskDataProps.deadline).toDateString() ===
										new Date().toDateString()
											? 'Сегодня'
											: new DateFormatter().getFullDate(taskDataProps.deadline)}
									</span>
								)}
								{taskDataProps.reminder && (
									<span className={styles.task__reminder}>
										<NotificationsRoundedIcon />
										{new Date(taskDataProps.reminder).toDateString() ===
										new Date().toDateString()
											? 'Сегодня'
											: new DateFormatter().getFullDate(taskDataProps.reminder)}
									</span>
								)}
							</>
						)}
					</div>
				</div>
			</div>

			<StarButton
				onClick={favoriteToggleHandler}
				isFavorite={taskDataProps.favorite}
			/>
		</div>
	);
};

export default Task;
