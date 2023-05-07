import React, {ChangeEvent, FC, FormEvent} from "react";
import { updateTaskAsync } from "../../../store/reducers/TaskSlice";

import TextArea from "../input/TextArea";
import { selectedTaskSelector } from "../../../store";

import styles from "./styles/TaskNotesSection.module.scss";
import {ITask} from "../../../interfaces/TaskData";
import {useAppDispatch, useAppSelector} from "../../../store/store";

const TaskNotesSection: FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const selectedTask: ITask | null = useAppSelector(selectedTaskSelector);

    const onTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        if (selectedTask) {
            const taskData: ITask = {
                ...selectedTask,
                notes: event.target.value
            };

            dispatch(updateTaskAsync(taskData))
        }
    }

    const textAreaAdjust = (event: FormEvent<HTMLTextAreaElement>): void => {
        event.currentTarget.style.height = "auto";
        event.currentTarget.style.height = `${event.currentTarget.scrollHeight + 2}px`
    }

    return (
        <TextArea
            defaultValue={selectedTask?.notes ?? ""}
            className={styles.notes}
            placeholder="Ваши заметки"
            onInput={textAreaAdjust}
            onChange={onTextareaChange}
        />
    );
};

export default TaskNotesSection;