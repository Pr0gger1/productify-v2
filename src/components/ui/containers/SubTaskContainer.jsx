import React from 'react';
import { useSelector } from 'react-redux';
import SubTask from "../cards/SubTask";
import { selectedTaskSelector } from "../../../store";

import styles from './styles/SubTaskContainer.module.scss';

const SubTaskContainer = () => {
    const selectedTask = useSelector(selectedTaskSelector);
    return (
        <>
            {
                selectedTask.subTasks &&
                selectedTask.subTasks.length !== 0 &&
                <div className={styles.subtask__container}>
                {
                    selectedTask.subTasks.map(subTask =>
                        <SubTask
                            key={subTask.id}
                            subTaskData={subTask}
                        />
                    )
                }
            </div>
            }
        </>
    );
};

export default SubTaskContainer;