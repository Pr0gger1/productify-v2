import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../store/store";
import {ITask} from "../../../interfaces/TaskData";

import DeadlinePicker from "./components/DeadlinePicker";
import ReminderPicker from "./components/ReminderPicker";
import RepeatComponent from "./components/RepeatComponent";
import { selectedTaskSelector } from "../../../store";

import styles from "./styles/TaskDatesSection.module.scss";

const TaskDatesSection: FC = (): JSX.Element => {
    const selectedTask: ITask | null = useAppSelector(selectedTaskSelector);

    const [showDeadlinePicker,
        setShowDeadlinePicker] = useState<boolean>(false);

    const [showReminderPicker,
        setShowReminderPicker] = useState<boolean>(false);

    useEffect((): void => {
        if (selectedTask) {
            if (!selectedTask.reminder)
                setShowReminderPicker(false);

            if (!selectedTask.deadline)
                setShowDeadlinePicker(false);
        }
    }, [selectedTask])

    return (
        <>
            <div className={styles.date_and_repeat}>
                {
                    selectedTask?.deadline ?? showDeadlinePicker ?
                    <DeadlinePicker
                        setShowDeadlinePicker={setShowDeadlinePicker}
                    />
                    :
                    <div className={styles.deadline__btn}
                        onClick={() => setShowDeadlinePicker(prev => !prev)}
                    >
                        Дата выполнения
                    </div>
                }
                <RepeatComponent/>
                {
                    selectedTask?.reminder ?? showReminderPicker ?
                    <ReminderPicker
                        setShowReminderPicker={setShowReminderPicker}
                    />
                    :
                    <div className={styles.reminder__btn}
                        onClick={() => setShowReminderPicker(prev => !prev)}
                    >
                        Напоминание
                    </div>
                }
            </div>

        </>
    );
};

export default TaskDatesSection;