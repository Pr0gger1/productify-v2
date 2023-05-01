import {baseGroupIds} from "../store/defaultData/baseGroups";
import {useCallback} from "react";

const useGroupTasks = (tasks, selectedTaskGroup) => {
    return useCallback(() => {
        if (tasks) {
            return [...tasks].filter(task => {
                if (selectedTaskGroup.id === baseGroupIds.all)
                    return true;
                else if (selectedTaskGroup.id === baseGroupIds.plan)
                    return task.deadline;
                else if (selectedTaskGroup.id === baseGroupIds.favorite)
                    return task.favorite;
                else if (selectedTaskGroup.id === baseGroupIds.completed)
                    return task.completed;
                else return task.groupId === selectedTaskGroup.id;
            });
        }
    }, [selectedTaskGroup.id, tasks]);
}
export default useGroupTasks;