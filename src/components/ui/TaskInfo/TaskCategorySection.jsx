import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskAsync } from "../../../store/reducers/TaskSlice";

import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { TaskCategorySelect } from "../customComponents/TaskCategorySelect";
import { baseGroupIds } from "../../../store/defaultData/baseGroups";

import * as selectors from '../../../store';


const TaskCategorySection = () => {
    const dispatch = useDispatch();
    const selectedTask = useSelector(selectors.selectedTaskSelector);
    const taskGroups = useSelector(
        state => state.taskGroupStates.allTaskGroups
    );

    const isBaseTaskGroup = Object.values(baseGroupIds).includes(selectedTask.groupId);

    const taskGroupList = taskGroups.custom && taskGroups.custom.length &&
    !isBaseTaskGroup ?
        taskGroups.custom :
        taskGroups.custom.concat(
            taskGroups.base
        );

    const onCategoryChange = event => {
        const newTaskGroup = event.target.value;
        const taskData = {
            ...selectedTask,
            groupId: event.target.value,
            category: taskGroups.custom.find(
                group => group.id === newTaskGroup
            ).title
        };

        dispatch(updateTaskAsync(taskData));
    }

    return (
        <FormControl
            fullWidth
            variant="filled"
            disabled={!(taskGroups.custom.length && !isBaseTaskGroup)}
        >
            <InputLabel
                style={{color: 'var(--fontColor)'}}
                id='task_group_label'
            >
                Категория задачи
            </InputLabel>

            <TaskCategorySelect
                labelId='task_group_label'
                value={selectedTask.groupId || ''}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: 'var(--bgColorFirst)',
                            color: 'var(--fontColor)'
                        }
                    }
                }}
                onChange={onCategoryChange}
            >
                {
                    taskGroupList.map(group =>
                    <MenuItem
                        key={group.id}
                        value={group.id}
                    >
                        {group.title}
                    </MenuItem>
                    )
                }
            </TaskCategorySelect>
        </FormControl>
    );
};

export default TaskCategorySection;