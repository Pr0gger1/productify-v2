import { useMemo } from 'react';
import {ITask} from 'types/TaskData';
import {TaskFilterType} from 'types/Filter';

function sortTasks(a: any, b: any, desc = true) {
	if (!desc) {
		const temp = a;
		a = b;
		b = temp;
	}

	if (a > b) return 1;
	else if (a < b) return -1;
	return 0;
}

const useFilteredTasks = (groupTasks: ITask[], filter: TaskFilterType) => {
	return useMemo(() => {
		if (filter.type === 'alphabet')
			return [...groupTasks].sort(
				(a: ITask, b: ITask) => sortTasks(
					a.taskName, b.taskName, filter.desc
				)
			);
		else if (filter.type === 'created_at')
			return [...groupTasks].sort(
				(a: ITask, b: ITask) => sortTasks(
					a.createdAt, b.createdAt, filter.desc
				)
			);
		else return [...groupTasks].sort(
			(a: ITask, b: ITask) => sortTasks(
				a.favorite, b.favorite, filter.desc
			)
		);

	}, [groupTasks, filter]);
};

export default useFilteredTasks;