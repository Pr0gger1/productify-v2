import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskAsync } from "../../../store/reducers/TaskSlice";

import CheckboxInputField from "../input/CheckboxInputField";
import SubTaskContainer from "../containers/SubTaskContainer";
import Button from "../button/Button";
import ConfirmationButton from "../button/ConfirmationButton";
import StarButton from "../button/StarButton";

import { generateUniqueId } from "../../../utils/generateUniqueId";

import AddIcon from "@mui/icons-material/Add";
import { selectedTaskSelector } from "../../../store";

import { CSSTransition } from "react-transition-group";
import styles from "./styles/TaskNameSelection.module.scss";

export const TaskNameSection = () => {
    const dispatch = useDispatch();
    const selectedTask = useSelector(selectedTaskSelector);

    const [taskName, setTaskName] = useState(selectedTask.taskName || '')

    const [subTaskNameInput, setSubTaskNameInput] = useState('');

    const [showButton, setShowButton] = useState(true);
    const [showInput, setShowInput] = useState(false);


    const onTaskNameChange = event => {
        setTaskName(event.target.value)
        const taskData = {
            ...selectedTask,
            taskName: event.target.value
        }
        dispatch(updateTaskAsync(taskData))
    }

    const onTaskCompletedChange = event => {
        const completed = event.target.checked;
        const taskData = {
            ...selectedTask,
            completed
        }

        dispatch(updateTaskAsync(taskData));
    }

    const favoriteToggleHandler = () => {
        const taskData = {
            ...selectedTask,
            favorite: !selectedTask.favorite
        };

        dispatch(updateTaskAsync(taskData));
    }

    const saveSubTaskHandler = () => {
        const subTaskData = {
            id: generateUniqueId('task', 12, true),
            taskName: subTaskNameInput,
            completed: false,
            createdAt: new Date().getTime()
        };

        const taskData = {
             ...selectedTask,
            subTasks: selectedTask.subTasks.concat(subTaskData)
        };

        dispatch(updateTaskAsync(taskData));

        setShowInput(false);
        setSubTaskNameInput('');
    }

    const onSubTaskInputEnterPressed = event => {
        if (event.key === 'Enter' && subTaskNameInput.length)
            saveSubTaskHandler();
    }

    return (
        <section className={styles.task_name__section}>
            <div className={styles.main_taskName__container}>
                <CheckboxInputField
                    inputStyle={{
                        textDecoration:
                            selectedTask.completed ? 'line-through' : 'none'
                    }}
                    inputValue={taskName || selectedTask.taskName || ''}
                    onChangeInput={onTaskNameChange}
                    onChangeCheckbox={onTaskCompletedChange}
                    checked={selectedTask.completed || false}
                />
                <StarButton
                    onClick={favoriteToggleHandler}
                    isFavorite={selectedTask.favorite}
                    sx={{
                        backgroundColor: 'var(--bgColorFirst)',
                        borderRadius: '0.5rem',
                        padding: 1
                    }}
                />
            </div>

            <SubTaskContainer/>

            <div className={styles.add_subtask__btn}>
                {showButton && (
                    <Button onClick={() => setShowInput(true)}
                    >
                        <AddIcon
                            className={styles.add_subtask__icon}
                            sx = {{
                                fontSize: 32,
                                color: 'var(--addSubtaskIconColor)'
                            }}
                        />
                        <span>
                            Добавить подзадачу
                        </span>
                    </Button>
                )}

                <CSSTransition
                    in={showInput}
                    timeout={300}
                    classNames="input"
                    unmountOnExit
                    onEnter={() => setShowButton(false)}
                    onExited={() => setShowButton(true)}
                >
                    <>
                        <CheckboxInputField
                            checkboxDisabled
                            inputValue={subTaskNameInput}
                            onChangeInput={e => setSubTaskNameInput(e.target.value)}
                            onInputKeyDown={onSubTaskInputEnterPressed}
                        />
                        {
                            subTaskNameInput.length ?
                            <ConfirmationButton
                                backgroundColor='var(--bgColorFirst)'
                                variant='ok'
                                onClick={saveSubTaskHandler}
                            />
                            :
                            <ConfirmationButton
                                backgroundColor='var(--bgColorFirst)'
                                variant='cancel'
                                onClick={() => setShowInput(false)}
                            />
                        }
                    </>
                </CSSTransition>
            </div>
        </section>
    );
};

export default TaskNameSection;