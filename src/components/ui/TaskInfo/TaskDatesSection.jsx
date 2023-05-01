import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";

import DeadlinePicker from "./components/DeadlinePicker";
import ReminderPicker from "./components/ReminderPicker";
import RepeatComponent from "./components/RepeatComponent";
import { selectedTaskSelector } from "../../../store";

import styles from "./styles/TaskDatesSection.module.scss";

const TaskDatesSection = () => {
    const selectedTask = useSelector(selectedTaskSelector);

    const [showDeadlinePicker,
        setShowDeadlinePicker] = useState(false);

    const [showReminderPicker,
        setShowReminderPicker] = useState(false);

    useEffect(() => {
        if (!selectedTask.reminder)
            setShowReminderPicker(false);

        if (!selectedTask.deadline)
            setShowDeadlinePicker(false);
    }, [selectedTask])

    return (
        <>
            <div className={styles.date_and_repeat}>
                {
                    selectedTask.deadline || showDeadlinePicker ?
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
                    selectedTask.reminder || showReminderPicker ?
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