import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskAsync } from '../../../store/reducers/TaskSlice';

import TextArea from '../input/TextArea';
import { selectedTaskSelector } from "../../../store";

import styles from './styles/TaskNotesSection.module.scss';

const TaskNotesSection = () => {
    const dispatch = useDispatch();
    const selectedTask = useSelector(selectedTaskSelector);

    const onTextareaChange = event => {
        const taskData = {
                ...selectedTask,
                notes: event.target.value
        };

        dispatch(updateTaskAsync(taskData))
    }

    const textAreaAdjust = event => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight + 2}px`
    }

    return (
        <TextArea
            defaultValue={selectedTask.notes || ''}
            className={styles.notes}
            placeholder="Ваши заметки"
            onInput={textAreaAdjust}
            onChange={onTextareaChange}
        />
    );
};

export default TaskNotesSection;