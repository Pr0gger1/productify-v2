import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles/TaskGroup.module.scss';
import * as selectors from "../../../store";
import useGroupTasks from "../../../hooks/useGroupTasks";

const TaskGroup = ({ taskGroupData, onClick }) => {
    const [tasksCount, setTasksCount] = useState(0);

    const isLSidebarOpened = useSelector(selectors.leftSidebarSelector);
    const tasks = useSelector(selectors.tasksSelector);
    
    const setCurrentTasks = useGroupTasks(tasks, taskGroupData);

    useMemo(() => {
        const count = setCurrentTasks().length;
        setTasksCount(count);
    }, [setCurrentTasks]);

    let groupStyle = `${styles.group}${taskGroupData.isActive ? ` ${styles['active']}`: ''}${!isLSidebarOpened ? ` ${styles['closed']}` : ''}`;

    return (
        <div 
            className={groupStyle}
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