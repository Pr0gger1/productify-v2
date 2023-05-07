import React, {ReactNode} from "react";
import { updateTaskAsync } from "../../../store/reducers/TaskSlice";

import {FormControl, InputLabel, MenuItem, SelectChangeEvent} from "@mui/material";
import { TaskCategorySelect } from "../customComponents/TaskCategorySelect";
import { baseGroupIds } from "../../../store/defaultData/baseGroups";

import * as selectors from "../../../store";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {ITask, ITaskGroup, ITaskGroups} from "../../../interfaces/TaskData";


const TaskCategorySection = () => {
    const dispatch = useAppDispatch();
    const selectedTask: ITask | null = useAppSelector(selectors.selectedTaskSelector);
    const taskGroups: ITaskGroups = useAppSelector(
        state => state.taskGroupStates.allTaskGroups
    );

    const isBaseTaskGroup: boolean = Object.values(baseGroupIds).includes(selectedTask?.groupId ?? "");

    const taskGroupList: ITaskGroup[] = taskGroups.custom && taskGroups.custom.length &&
    !isBaseTaskGroup ?
        taskGroups.custom :
        taskGroups.custom.concat(
            taskGroups.base
        );

    const onCategoryChange = (event: SelectChangeEvent<unknown>, child: ReactNode): void => {
        const newTaskGroup = event.target.value;
        if (selectedTask) {
            const taskData: ITask = {
                ...selectedTask,
                groupId: event.target.value as string,
                category: taskGroups.custom.find(
                    (group: ITaskGroup) => group.id === newTaskGroup
                )!.title
            };

            dispatch(updateTaskAsync(taskData));
        }
    }

    return (
        <FormControl
            fullWidth
            variant="filled"
            disabled={!(taskGroups.custom.length && !isBaseTaskGroup)}
        >
            <InputLabel
                style={{color: "var(--fontColor)"}}
                id="task_group_label"
            >
                Категория задачи
            </InputLabel>

            <TaskCategorySelect
                labelId="task_group_label"
                value={selectedTask?.groupId ?? ""}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: "var(--bgColorFirst)",
                            color: "var(--fontColor)"
                        }
                    }
                }}
                onChange={onCategoryChange}
            >
                {
                    taskGroupList.map((group: ITaskGroup) =>
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