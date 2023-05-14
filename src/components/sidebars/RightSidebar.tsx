import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {NavigateFunction, useNavigate} from "react-router-dom";
import { setRSidebarOpen } from "../../store/reducers/SidebarSlice";
import { setSelectedTask } from "../../store/reducers/TaskSlice";

import CloseIcon from "@mui/icons-material/Close";
import TaskNameSection from "../ui/TaskInfo/TaskNameSection";
import TaskCategorySection from "../ui/TaskInfo/TaskCategorySection";
import TaskNotesSection from "../ui/TaskInfo/TaskNotesSection";
import TaskDatesSection from "../ui/TaskInfo/TaskDatesSection";
import DeleteTaskButton from "../ui/button/DeleteTaskButton";

import {ITask, ITaskGroup} from "../../interfaces/TaskData";
import * as selectors from "../../store";

import "../ui/animations/Button/createListBtnAnimation.css"
import styles from "./styles/RightSidebar.module.scss";

const RightSidebar: FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const isRSidebarOpened: boolean = useAppSelector(selectors.rightSidebarSelector);
    const selectedTaskGroup: ITaskGroup = useAppSelector(selectors.selectedTaskGroupSelector);
    const selectedTask: ITask | null = useAppSelector(selectors.selectedTaskSelector);

    const sidebarStyles: string = `${styles.sidebar__right}${!isRSidebarOpened ? " " + styles["closed"] : ""}`;


    useEffect(() => {
        if (!isRSidebarOpened) {
            navigate(`/tasks/${selectedTaskGroup.id}`)
            dispatch(setSelectedTask(null))
        }
    }, [dispatch, isRSidebarOpened, navigate, selectedTaskGroup.id]);

    useEffect(() => {
        if (selectedTask && !Object.keys(selectedTask).length && isRSidebarOpened)
            dispatch(setRSidebarOpen());
    }, [selectedTask, isRSidebarOpened, dispatch]);


    return (
        <aside className={sidebarStyles}>
            <div className={styles.sidebar_container}>
                <div className={styles.sidebar_close__btn}>
                    <CloseIcon
                        onClick={() => dispatch(setRSidebarOpen())}
                    />
                </div>
                <TaskNameSection/>
                <TaskCategorySection/>
                <TaskDatesSection/>
                <TaskNotesSection/>
                {selectedTask &&
                    <div>
                        <DeleteTaskButton
                            selectedTask={selectedTask}
                        />
                    </div>
                }
            </div>
        </aside>
    );
};

export default RightSidebar;