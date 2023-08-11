import {ITaskGroup} from 'types/TaskData';

import todayTaskIcon  from 'assets/img/icons/task_list/today_task_icon.svg';
import planTaskIcon from 'assets/img/icons/task_list/plan_task_icon.svg';
import favoriteTaskIcon from 'assets/img/icons/task_list/favourite_task_icon.svg';
import completedTaskIcon from 'assets/img/icons/task_list/completed_task_icon.svg';
import allTasksIcon from 'assets/img/icons/task_list/all_tasks_icon.svg';

export const baseGroupIds = {
	today: 'today',
	plan: 'plan',
	favorite: 'favorite',
	completed: 'completed',
	all: 'all'
};

export const initialGroup: ITaskGroup = {
	title: 'Сегодня',
	icon: todayTaskIcon,
	counter: 0,
	id: 'today',
	pageTitle: '✌️Мой день',
	webTitle: 'Productify - Мой день'
};

const defaultGroups: ITaskGroup[] = [
	{
		title: 'Сегодня',
		icon: todayTaskIcon,
		id: 'today',
		pageTitle: '✌️Мой день',
		webTitle: 'Productify - Мой день',
		counter: 0
	},
	{
		title: 'Запланировано',
		icon: planTaskIcon,
		id: 'plan',
		pageTitle: '🗓️Запланировано',
		webTitle: 'Productify - Запланировано',
		counter: 0
	},
	{
		title: 'Избранные',
		icon: favoriteTaskIcon,
		id: 'favorite',
		counter: 0,
		pageTitle: '✨Избранное',
		webTitle: 'Productify - Избранное'
	},
	{
		title: 'Завершенные',
		icon: completedTaskIcon,
		id: 'completed',
		counter: 0,
		pageTitle: '✅Завершенные',
		webTitle: 'Productify - Завершенное',
	},
	{
		title: 'Все задачи',
		icon: allTasksIcon,
		id: 'all',
		counter: 0,
		pageTitle: '🎯Все задачи',
		webTitle: 'Productify - Все задачи'
	}
];
export default defaultGroups;
