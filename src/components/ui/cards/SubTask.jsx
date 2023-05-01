import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteSubTaskAsync, updateSubTaskAsync } from "../../../store/reducers/TaskSlice";

import CheckboxInputField from "../input/CheckboxInputField";
import DeleteButton from "../button/DeleteButton";

import { selectedTaskSelector } from "../../../store";

import styles from "./styles/SubTask.module.scss";

const SubTask = ({ subTaskData }) => {
    const dispatch = useDispatch();

    const [subTaskName, setSubTaskName] = useState(
        subTaskData.taskName || ''
    );
    const [subTaskCompleted, setSubTaskCompleted] = useState(
        subTaskData.completed
    );

    const selectedTask = useSelector(selectedTaskSelector);

    const onTaskNameChange = event => {
        const newSubTaskData = {
            ...subTaskData,
            taskName: event.target.value
        };

        setSubTaskName(event.target.value);

        if (subTaskName.length)
            dispatch(updateSubTaskAsync({
                taskId: selectedTask.id,
                subTaskId: newSubTaskData.id,
                subTaskData: newSubTaskData
            }));
    }

    const onCheckboxChange = () => {
        const completed = !subTaskData.completed;
        const newSubTaskData = {
            ...subTaskData, completed
        };

        setSubTaskCompleted(completed);

        dispatch(updateSubTaskAsync({
            taskId: selectedTask.id,
            subTaskId: subTaskData.id,
            subTaskData: newSubTaskData
        }));
    }

    const deleteSubTaskHandler = () => {
        dispatch(deleteSubTaskAsync({
            taskId: selectedTask.id,
            subTaskId: subTaskData.id
        }))
    }

    return (
        <div className={styles.subtask}>
            <CheckboxInputField
                inputValue={subTaskName}
                onChangeInput={onTaskNameChange}
                onChangeCheckbox={onCheckboxChange}
                checked={subTaskCompleted || subTaskData.completed}
                inputStyle={{
                    textDecoration: subTaskData.completed
                        ? 'line-through' : 'none'
                }}
            />
            <DeleteButton
                onClick={deleteSubTaskHandler}
            />
        </div>
    );
};

export default SubTask;