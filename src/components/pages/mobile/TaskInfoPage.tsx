import React, { useEffect } from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

import TaskNameSection from "../../ui/rightSidebarComponents/TaskNameSection";
import TaskDatesSection from "../../ui/rightSidebarComponents/TaskDatesSection";
import TaskNotesSection from "../../ui/rightSidebarComponents/TaskNotesSection";
import TaskCategorySection from "../../ui/rightSidebarComponents/TaskCategorySection";
import BackButton from "../../ui/button/BackButton";
import Header from "../../header/Header";

import * as selectors from "../../../store";

import styles from "./styles/TaskInfoPage.module.scss";
import {ITask, ITaskGroup} from "../../../interfaces/TaskData";
import {useAppSelector} from "../../../store/store";


const TaskInfoPage = () => {
    const navigate: NavigateFunction = useNavigate();
    const selectedTask: ITask | null = useAppSelector(selectors.selectedTaskSelector);
    const selectedTaskGroup: ITaskGroup = useAppSelector(selectors.selectedTaskGroupSelector);

    useEffect((): void => {
        if (selectedTask && !Object.keys(selectedTask).length)
            navigate(`/tasks/${selectedTaskGroup.id}`);
    }, [navigate, selectedTaskGroup, selectedTask]);

    return (
        <main className={styles.main__container}>
            <Header/>

            <div className={styles.content}>
                <BackButton to={`/tasks/${selectedTaskGroup.id}`}/>
                <TaskNameSection/>
                <TaskCategorySection/>
                <TaskDatesSection/>
                <TaskNotesSection/>
            </div>
        </main>
    );
};

export default TaskInfoPage;