import React, { FC, useMemo, useState } from "react";
import { useAppSelector } from "../../../store/store";
import useGroupTasks from "../../../hooks/useGroupTasks";

import { ITask } from "../../../interfaces/TaskData";

import * as selectors from "../../../store";
import styles from "./styles/TaskGroup.module.scss";

export interface TaskGroupData {
    id: string,
    icon: string,
    title: string,
    isActive: string | null
}
interface TaskGroupProps {
    taskGroupData: TaskGroupData,
    onClick: () => void
}

const TaskGroup: FC<TaskGroupProps> = ({ taskGroupData, onClick }) => {
    const [tasksCount, setTasksCount] = useState<number>(0);

    const tasks: ITask[] = useAppSelector(selectors.tasksSelector);
    
    const setCurrentTasks = useGroupTasks(tasks, taskGroupData);

    useMemo((): void => {

        const count: number = setCurrentTasks().length;
        setTasksCount(count);
    }, [setCurrentTasks]);

    let groupStyle: string = `${styles.group}${taskGroupData.isActive ? ` ${styles["active"]}`: ""}`;

    return (
        <div className={groupStyle}
            onClick={onClick}
        >
            <div className={styles.icon_title}>
                <img src={taskGroupData.icon}
                     alt={`${taskGroupData.title}_icon`}
                     className={styles.group__icon}
                />
                <p>{ taskGroupData.title }</p>
            {
                tasksCount !== 0 &&
                <div className={styles.counter}>
                    {tasksCount}
                </div>
            }
            </div>
        </div>
    );
};

export default TaskGroup;