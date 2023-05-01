import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskAsync } from "../../../../store/reducers/TaskSlice";

import DeleteButton from "../../button/DeleteButton";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers';
import dayjs from "dayjs";

import { selectedTaskSelector } from "../../../../store";

import styles from "../styles/TaskDatesSection.module.scss";

const DeadlinePicker = ({ setShowDeadlinePicker }) => {
    const dispatch = useDispatch();
    const selectedTask = useSelector(selectedTaskSelector);

    const onDeadlineChange = async value => {
        const taskData = {
            ...selectedTask,
            deadline: value.toDate().getTime(),
            isDeadlineNotified: false
        }

        if (selectedTask.repeat)
            taskData.repeat = null;



        dispatch(updateTaskAsync(taskData));
    }

    const deleteDeadlineHandler = () => {
        let taskData = {
            ...selectedTask,
            deadline: null
        };

        delete taskData.isDeadlineNotified;

        if (selectedTask.repeat)
            taskData.repeat = null;

        dispatch(updateTaskAsync(taskData));
        setShowDeadlinePicker(false);
    }


    return (
        <div className={styles.date__container}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            >
                <MobileDateTimePicker
                    label={'Дата выполнения'}
                    value={dayjs(selectedTask.deadline)}
                    onChange={async val => await onDeadlineChange(val)}
                    sx = {{
                        label: {
                          color: 'var(--fontColor)'
                        },
                        ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                            color: "var(--fontColor)",
                        },
                        ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                            border: "1px solid var(--borderColor)"
                        }
                    }}
                    ampm={false}
                    
                />
            </LocalizationProvider>
            <DeleteButton
                sx={{
                    padding: 2
                }}
                onClick={deleteDeadlineHandler}
            />
        </div>
    );
};

export default DeadlinePicker;