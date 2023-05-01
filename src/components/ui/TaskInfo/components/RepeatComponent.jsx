import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskAsync } from "../../../../store/reducers/TaskSlice";

import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { TaskCategorySelect } from "../../customComponents/TaskCategorySelect";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import {selectedTaskSelector} from "../../../../store";

export const repeatType = {
    everyDay: 'daily',
    everyWeek: 'weekly',
    everyMonth: 'monthly'
}

const repeatItems = [
    {
        title: 'Каждый день',
        value: repeatType.everyDay
    },
    {
        title: 'Каждую неделю',
        value: repeatType.everyWeek
    },
    {
        title: 'Каждый месяц',
        value: repeatType.everyMonth
    }
];

const RepeatComponent = () => {
    const dispatch = useDispatch();
    const selectedTask = useSelector(selectedTaskSelector);

    const [repeat, setRepeat] = useState(selectedTask.repeat || '');

    const onRepeatChange = event => {
        const value = event.target.value;
        const date = new Date();

        setRepeat(value);
        switch (value) {
            case repeatType.everyDay:
            {
                const taskData = {
                        ...selectedTask,
                        repeat: value,
                        deadline: new Date(date.setDate(date.getDate() + 1))
                }
                dispatch(updateTaskAsync(taskData));
            }
                break;
            case repeatType.everyWeek:
            {
                const taskData =  {
                        ...selectedTask,
                        repeat: value,
                        deadline: new Date(date.setDate(date.getDate() + 7))
                }
                dispatch(updateTaskAsync(taskData));
            }
                break;
            case repeatType.everyMonth:
            {
                const taskData = {
                    ...selectedTask,
                    repeat: value,
                    deadline: new Date(date.setMonth(date.getMonth() + 1))
                }
                dispatch(updateTaskAsync(taskData));
            }
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (!selectedTask.repeat)
            setRepeat('');
    }, [selectedTask.repeat])

    return (
        <FormControl fullWidth>
            <InputLabel
                id='repeat_select__label'
                style={{color: 'var(--fontColor)'}}
            >
                Повтор
            </InputLabel>
            <TaskCategorySelect
                value={selectedTask.repeat || repeat}
                onChange={onRepeatChange}
                labelId='repeat_select__label'
                IconComponent={CalendarMonthTwoToneIcon}
                MenuProps={{
                PaperProps: {
                    sx: {
                        backgroundColor: 'var(--bgColorFirst)',
                        color: 'var(--fontColor)',
                        }
                    }
                }}
            >
                <MenuItem value=''>Выберите период</MenuItem>
                {
                    repeatItems.map(item =>
                       <MenuItem key={item.value}
                         value={item.value}
                       >
                            {item.title}
                        </MenuItem>
                    )
                }
            </TaskCategorySelect>
        </FormControl>
    );
};

export default RepeatComponent;