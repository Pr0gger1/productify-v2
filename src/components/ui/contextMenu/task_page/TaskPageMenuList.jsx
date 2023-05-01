import React from 'react';
import { useSelector } from "react-redux";
import { selectedTaskSelector } from "../../../../store";

import Stack from "@mui/material/Stack";
import DeleteTaskButton from "../../button/DeleteTaskButton";

import styles from './styles/TaskGroupMenuContainer.module.scss';

const TaskPageMenuList = () => {
    const selectedTask = useSelector(selectedTaskSelector);

    return (
        <Stack>
            <div className={styles.menu__item}>
                <DeleteTaskButton
                    selectedTask={selectedTask}
                />
                Удалить задачу
            </div>
        </Stack>
    );
};

export default TaskPageMenuList;