import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { setRSidebarOpen } from "../../store/reducers/SidebarSlice";
import { setSelectedTask } from "../../store/reducers/TaskSlice";

import SidebarCloseButtonBlock from "../ui/rightSidebarComponents/SidebarCloseButtonBlock";
import TaskNameSection from "../ui/rightSidebarComponents/TaskNameSection";
import TaskCategorySection from "../ui/rightSidebarComponents/TaskCategorySection";
import TaskNotesSection from "../ui/rightSidebarComponents/TaskNotesSection";
import TaskDatesSection from "../ui/rightSidebarComponents/TaskDatesSection";
import TaskDateAndDeleteSection from "../ui/rightSidebarComponents/TaskDateAndDeleteSection";

import { ITask, ITaskGroup } from "../../interfaces/TaskData";
import * as selectors from "../../store";

import "../ui/animations/Button/createListBtnAnimation.css"
import styles from "./styles/RightSidebar.module.scss";

const RightSidebar: FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const isRSidebarOpened: boolean = useAppSelector(selectors.rightSidebarSelector);
    const selectedTaskGroup: ITaskGroup = useAppSelector(selectors.selectedTaskGroupSelector);
    const selectedTask: ITask | null = useAppSelector(selectors.selectedTaskSelector);

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
        <aside className={styles.sidebar__right}
            data-rsidebar-active={isRSidebarOpened}
        >
            <div className={styles.sidebar_container}>
                <SidebarCloseButtonBlock/>
                <TaskNameSection/>
                <TaskCategorySection/>
                <TaskDatesSection/>
                <TaskNotesSection/>
                <TaskDateAndDeleteSection/>
            </div>
        </aside>
    );
};

export default RightSidebar;