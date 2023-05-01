import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setRSidebarOpen } from '../../store/reducers/SidebarSlice';
import { setSelectedTask } from '../../store/reducers/TaskSlice';

import CloseIcon from '@mui/icons-material/Close';
import TaskNameSection from "../ui/TaskInfo/TaskNameSection";
import TaskCategorySection from "../ui/TaskInfo/TaskCategorySection";
import TaskNotesSection from "../ui/TaskInfo/TaskNotesSection";
import TaskDatesSection from "../ui/TaskInfo/TaskDatesSection";
import DeleteTaskButton from "../ui/button/DeleteTaskButton";

import * as selectors from '../../store';

import '../ui/animations/Button/createListBtnAnimation.css'
import styles from './styles/RightSidebar.module.scss';

const RightSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isRSidebarOpened = useSelector(selectors.rightSidebarSelector);
    const selectedTaskGroup = useSelector(selectors.selectedTaskGroupSelector);
    const selectedTask = useSelector(selectors.selectedTaskSelector);

    const sidebarStyles = `${styles.sidebar__right}${!isRSidebarOpened ? ' ' + styles['closed'] : ''}`;


    useEffect(() => {
        if (!isRSidebarOpened) {
            navigate(`/tasks/${selectedTaskGroup.id}`)
            dispatch(setSelectedTask({taskData: {}}))
        }
    }, [dispatch, isRSidebarOpened, navigate, selectedTaskGroup.id]);

    useEffect(() => {
        if (!Object.keys(selectedTask).length && isRSidebarOpened)
            dispatch(setRSidebarOpen());
    }, [selectedTask, isRSidebarOpened, dispatch]);


    return (
        <aside className={sidebarStyles}>
            <div className={styles.sidebar_container}>
                <div className={styles.sidebar_close__btn}>
                    <DeleteTaskButton
                        selectedTask={selectedTask}
                    />
                    <CloseIcon
                        onClick={() => dispatch(setRSidebarOpen())}
                    />
                </div>
                <TaskNameSection/>
                <TaskCategorySection/>
                <TaskDatesSection/>
                <TaskNotesSection/>
            </div>
        </aside>
    );
};

export default RightSidebar;