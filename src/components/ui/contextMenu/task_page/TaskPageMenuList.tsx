import React, {FC} from "react";
import { selectedTaskSelector } from "../../../../store";

import Stack from "@mui/material/Stack";
import DeleteTaskButton from "../../button/DeleteTaskButton";

import styles from "./styles/TaskGroupMenuContainer.module.scss";
import {useAppSelector} from "../../../../store/store";
import {ITask} from "../../../../interfaces/TaskData";

const TaskPageMenuList: FC = () => {
    const selectedTask: ITask | null = useAppSelector(selectedTaskSelector);

    return (
        <Stack>
            <div className={styles.menu__item}>
                {
                    selectedTask &&
                    <DeleteTaskButton
                        selectedTask={selectedTask}
                    />

                }
                Удалить задачу
            </div>
        </Stack>
    );
};

export default TaskPageMenuList;