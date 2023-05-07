import React, {ChangeEvent, KeyboardEvent, useState} from "react";
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
import {FC} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {ISubTask, ITask} from "../../../interfaces/TaskData";

export const TaskNameSection: FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const selectedTask: ITask | null = useAppSelector(selectedTaskSelector);

    const [taskName, setTaskName] = useState<string>(selectedTask?.taskName ?? "");

    const [subTaskNameInput, setSubTaskNameInput] = useState<string>("");

    const [showButton, setShowButton] = useState<boolean>(true);
    const [showInput, setShowInput] = useState<boolean>(false);


    const onTaskNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskName(event.target.value)
        if (selectedTask) {
            const taskData: ITask = {
                ...selectedTask,
                taskName: event.target.value
            }
            dispatch(updateTaskAsync(taskData))
        }
    }

    const onTaskCompletedChange = (event: ChangeEvent<HTMLInputElement>) => {
        const completed: boolean = event.target.checked;
        if (selectedTask) {
            const taskData: ITask = {
                ...selectedTask, completed
            }

            dispatch(updateTaskAsync(taskData));
        }
    }

    const favoriteToggleHandler = (): void => {
        if (selectedTask) {
            const taskData: ITask = {
                ...selectedTask,
                favorite: !selectedTask.favorite
            };

            dispatch(updateTaskAsync(taskData));
        }
    }

    const saveSubTaskHandler = (): void => {
        const subTaskData: ISubTask = {
            id: generateUniqueId("task", 12, true),
            taskName: subTaskNameInput,
            completed: false,
            createdAt: new Date().getTime()
        };

        if (selectedTask) {
            const taskData: ITask = {
                 ...selectedTask,
                subTasks: selectedTask.subTasks.concat(subTaskData)
            };

            dispatch(updateTaskAsync(taskData));

        }
        setShowInput(false);
        setSubTaskNameInput("");

    }

    const onSubTaskInputEnterPressed = (event: KeyboardEvent) => {
        if (event.key === "Enter" && subTaskNameInput.length)
            saveSubTaskHandler();
    }

    return (
        <section className={styles.task_name__section}>
            <div className={styles.main_taskName__container}>
                <CheckboxInputField
                    inputStyle={{
                        textDecoration:
                            selectedTask?.completed ? "line-through" : "none"
                    }}
                    inputValue={taskName || selectedTask?.taskName || ""}
                    onChangeInput={onTaskNameChange}
                    onChangeCheckbox={onTaskCompletedChange}
                    checked={selectedTask?.completed ?? false}
                />
                <StarButton
                    onClick={favoriteToggleHandler}
                    isFavorite={selectedTask?.favorite ?? false}
                    sx={{
                        backgroundColor: "var(--bgColorFirst)",
                        borderRadius: "0.5rem",
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
                            sx = {{
                                fontSize: 32,
                                color: "var(--addSubtaskIconColor)"
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
                            onChangeInput={(e: ChangeEvent<HTMLInputElement>) => setSubTaskNameInput(e.target.value)}
                            onInputKeyDown={onSubTaskInputEnterPressed}
                        />
                        {
                            subTaskNameInput.length ?
                            <ConfirmationButton
                                backgroundColor="var(--bgColorFirst)"
                                variant="ok"
                                onClick={saveSubTaskHandler}
                            />
                            :
                            <ConfirmationButton
                                backgroundColor="var(--bgColorFirst)"
                                variant="cancel"
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