import { useMemo } from 'react';
import { ITask, ITaskGroup } from 'types/TaskData';
import { TaskGroupData } from 'components/ui/cards/TaskGroup';

const useGroupTasks = (
	tasks: ITask[],
	selectedTaskGroup: TaskGroupData | ITaskGroup,
) => {
	return useMemo(() => {
		if (tasks) {
			return [...tasks].filter((task: ITask) => {
				if (selectedTaskGroup.id === 'all') return true;
				// else return task[selectedTaskGroup.id as keyof ITask];
				else if (selectedTaskGroup.id === 'plan') return task.deadline;
				else if (selectedTaskGroup.id === 'favorite') return task.favorite;
				else if (selectedTaskGroup.id === 'completed') return task.completed;
				else return task.groupId === selectedTaskGroup.id;
			});
		}
		return [];
	}, [selectedTaskGroup.id, tasks]);
};
export default useGroupTasks;
