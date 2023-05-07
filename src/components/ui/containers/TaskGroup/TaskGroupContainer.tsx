import React from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

import { setSelectedGroup } from "../../../../store/reducers/TaskGroupSlice";
import { taskGroupsSelector } from "../../../../store";

import CreateListButton from "../../button/CreateListButton";
import BaseGroups from "./BaseGroups";
import CustomGroups from "./CustomGroups";

import styles from "../styles/TaskGroupContainer.module.scss";
import {ITaskGroup, ITaskGroups} from "../../../../interfaces/TaskData";
import {useAppDispatch, useAppSelector} from "../../../../store/store";

const TaskGroupContainer = () => {
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const taskGroups: ITaskGroups = useAppSelector(taskGroupsSelector);

    const onClickGroupHandler = (group: ITaskGroup): void => {
        dispatch(setSelectedGroup(group));
        navigate(`/tasks/${group.id}`);
    }

    return (
        <div className={styles.groups}>
            <BaseGroups
                taskGroups={taskGroups.base}
                onClick={onClickGroupHandler}
            />

            <div className={styles.container}>
                <CustomGroups
                    taskGroups={taskGroups.custom}
                    onClick={onClickGroupHandler}
                />
                <CreateListButton/>
            </div>
        </div>
    );
};

export default TaskGroupContainer;