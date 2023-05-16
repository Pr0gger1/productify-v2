import React, {FC, useEffect, useState} from "react";
import {useAppSelector} from "../../../store/store";
import {DateFormatter} from "../../../utils/DateFormatter";
import {ITask} from "../../../interfaces/TaskData";

import DeleteTaskButton from "../button/DeleteTaskButton";

import * as selectors from "../../../store";
import styles from "./styles/TaskDateAndDelete.module.scss";

type taskStateT = "Задача создана" | "Задача выполнена";

const TaskDateAndDeleteSection: FC = (): JSX.Element => {
    const selectedTask: ITask | null = useAppSelector(selectors.selectedTaskSelector);
    const [taskDate, setTaskDate] = useState<number>(selectedTask?.createdAt ?? new Date().getTime());
    const [taskState, setTaskState] = useState<taskStateT>("Задача создана");
    
    useEffect(() => {
        if (selectedTask?.completed) {
            setTaskDate(new Date().getTime())
            setTaskState("Задача выполнена");
        }
        else {
            setTaskDate(selectedTask?.createdAt ?? new Date().getTime())
            setTaskState("Задача создана");
        }
    }, [selectedTask])

    return (
        <>
            {
                selectedTask &&
                <div className={styles.task_date_deleteBtn__container}>
                    <span>
                        {taskState} {new DateFormatter().getFullDate(taskDate)}
                    </span>
                    <DeleteTaskButton
                        selectedTask={selectedTask}
                    />
                </div>
            }
        </>
    );
};

export default TaskDateAndDeleteSection;