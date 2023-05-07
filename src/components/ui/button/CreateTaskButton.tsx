import React, {useState, KeyboardEvent, ChangeEvent, useEffect} from "react";
import { addTaskAsync } from "../../../store/reducers/TaskSlice";

import Button from "./Button";
import ConfirmationButton from "./ConfirmationButton";

import { baseGroupIds } from "../../../store/defaultData/baseGroups";
import { CSSTransition } from "react-transition-group";

import * as selectors from "../../../store";

import styles from "./styles/CreateTaskButton.module.scss";
import "../animations/Button/createTaskBtnAnimation.css";
import "../animations/Input/InputAnimation.css";
import {ITask, ITaskGroup} from "../../../interfaces/TaskData";
import {generateUniqueId} from "../../../utils/generateUniqueId";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {User} from "firebase/auth";
import {TextField} from "@mui/material";

const CreateTaskButton = () => {
    const dispatch = useAppDispatch();
    const [showInput, setShowInput] = useState<boolean>(false);
    const [showButton, setShowButton] = useState<boolean>(true);
    const [taskName, setTaskName] = useState<string>("");

    const selectedTaskGroup: ITaskGroup = useAppSelector(selectors.selectedTaskGroupSelector);
    const userData: User | null = useAppSelector(selectors.userDataSelector);

    useEffect(() => {
        console.log(taskName)
    }, [taskName])

    const addTaskHandler = (): void => {
        if (userData && userData.uid) {
            let taskData: ITask = {
                taskName,
                completed: false,
                favorite: false,
                createdAt: new Date().getTime(),
                subTasks: [],
                notes: "",
                groupId: selectedTaskGroup.id,
                userId: userData.uid,
                id: generateUniqueId("task", 12, true),
                category: selectedTaskGroup.title,
                deadline: null,
                reminder: null,
                repeat: null
                };

            if (selectedTaskGroup.id === baseGroupIds.favorite)
                taskData.favorite = true;

            dispatch(addTaskAsync(taskData));
            setTaskName("");
        }
    }

    const onInputKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
        const currentValue: string = event.currentTarget.getElementsByTagName("input")[0].value;
        if (event.key === "Enter" && currentValue.length)
            addTaskHandler();
        else if (event.key === "Escape")
            setShowInput(false);
    }

    const onInputTaskChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTaskName(event.currentTarget.value)
    }

    return (
        <>
            <CSSTransition
                in={showButton}
                timeout={300}
                classNames="create_task_btn_animation"
                unmountOnExit
            >
                <Button
                    className={styles.create_task__btn}
                    onClick={() => setShowInput(true)}
                >
                    Добавить задачу
                </Button>
            </CSSTransition>

            <CSSTransition
                in={showInput}
                timeout={700}
                classNames="input_animation"
                onEnter={() => setShowButton(false)}
                onExited={() => setShowButton(true)}
                unmountOnExit
            >
                <div className={styles.add_task_input__container}>
                    {
                        taskName.length ?
                            <ConfirmationButton
                                variant="ok"
                                onClick={addTaskHandler}
                            />
                        :
                            <ConfirmationButton
                                variant="cancel"
                                onClick={() => setShowInput(false)}
                            />
                    }
                    <TextField
                        className={styles.add_task__btn}
                        value={taskName}
                        onChange={onInputTaskChange}
                        onKeyDown={onInputKeyDown}
                        sx={{
                            width: "100%",
                            border: "1px solid transparent",
                            "& .MuiInputBase-input": {
                                color: "var(--fontColor)"
                            }
                        }}
                    />
                    {/*<InputField*/}
                    {/*    customClasses={[styles.add_task__btn]}*/}
                    {/*    value={taskName}*/}
                    {/*    onChange={onInputTaskChange}*/}
                    {/*    onKeyDown={onInputKeyDown}*/}
                    {/*    // onClose={() => setShowInput(false)}*/}
                    {/*/>*/}
                </div>
            </CSSTransition>
        </>
    );
};

export default CreateTaskButton;