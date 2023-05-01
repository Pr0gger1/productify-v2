import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { setRSidebarOpen } from '../../../store/reducers/SidebarSlice';
import { deleteTaskAsync, setSelectedTask, updateTaskAsync } from "../../../store/reducers/TaskSlice";

import StarButton from "../button/StarButton";

import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Checkbox from '@mui/material/Checkbox';

import { DateFormatter } from "../../../utils/DateFormatter";
import { repeatTaskData } from "../../../store/defaultData/repeatTaskData";
import { SnackbarContext, snackbarTypes } from "../../../context/SnackbarContext";

import * as selectors from "../../../store";
import { themes } from "../../../store/reducers/ThemeSlice";

import styles from './styles/Task.module.scss';

const Task = ({ taskDataProps }) => {
    const { setMessage, setType, setOpen, setHideDuration } = useContext(SnackbarContext);

    const [isTaskSelected, setIsTaskSelected] = useState(false);
    const [isFavorite, setIsFavorite] = useState(taskDataProps.favorite);
    const [isTaskCompleted, setIsTaskCompleted] = useState(taskDataProps.completed);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentTheme = useSelector(selectors.themeSelector);
    const isMobile = useSelector(selectors.mobileSelector);

    const isRSidebarOpen = useSelector(selectors.rightSidebarSelector);
    const selectedGroup = useSelector(selectors.selectedTaskGroupSelector);
    const selectedTask = useSelector(selectors.selectedTaskSelector);

    const taskStyle = {
        textDecoration: taskDataProps.completed ? 'line-through' : 'none',
    };

    const onTaskClick = () => {
        setIsTaskSelected(prev => !prev);
        if (selectedTask.id !== taskDataProps.id) {
            /* эта ветка нужна, чтобы при нажатии на другую задачу сайдбар
            не закрывался, а изменял данные внутри
            */

            // Изменяем состояние выбранной задачи, если нажмем на другую задачу
            dispatch(setSelectedTask({taskData: taskDataProps}));

            // если сайдбар был закрыт, то открываем его
            if (!isRSidebarOpen) dispatch(setRSidebarOpen());
        }
        else {
            dispatch(setRSidebarOpen());
            dispatch(setSelectedTask({taskData: taskDataProps}));
        }
        navigate(`/tasks/${selectedGroup.id}/${taskDataProps.id}`);
    }

    const favoriteToggleHandler = event => {
        event.stopPropagation();
        const favorite = !isFavorite;

        dispatch(updateTaskAsync({
            ...taskDataProps, favorite
        }));

        setIsFavorite(prev => !prev);
    }

    const onTaskCheckboxClick = event => {
        event.stopPropagation();
        const completed = !isTaskCompleted;

        dispatch(updateTaskAsync({
            ...taskDataProps, completed
        }));

        setIsTaskCompleted(completed);
    }

    useEffect(() => {
        const onTaskPressed = event => {
            if (event.key === 'Delete') {
                dispatch(deleteTaskAsync(taskDataProps.id));
                dispatch(setRSidebarOpen());
                
                setMessage('Задача удалена');
                setType(snackbarTypes.success);
                setHideDuration(2000)
                setOpen(true);
            }
        }

        if (isTaskSelected)
            window.addEventListener('keydown', onTaskPressed);

        return () => window.removeEventListener('keydown', onTaskPressed)
    }, [dispatch, isTaskSelected, setHideDuration, setMessage, setOpen, setType, taskDataProps.id]);


    return (
        <div className={styles.task}
            onClick={onTaskClick}
             style={
                isTaskCompleted &&
                 currentTheme === themes.light 
                 ? {backgroundColor: '#dcfce3'} 
                 : {}
                }
        >
            <div className={styles.task__checkbox_info}>
                <Checkbox 
                    sx={{
                        color: "var(--checkboxColor)",
                        '& .MuiSvgIcon-root': {
                            fontSize: 30,
                            borderRadius: "1rem"
                        },
                        '&.Mui-checked': {
                            color: '#68d96d',
                        }
                    }}
                    onClick={onTaskCheckboxClick}
                    checked={taskDataProps.completed || isTaskCompleted}
                />

                <div className={styles.task__info}>
                    <span 
                        style={taskStyle}
                        className={styles.task__title}
                    >
                        {taskDataProps.taskName}
                    </span>
                    

                    <div className={styles.task__tags}>
                        <span className={styles.group_title}>
                            {taskDataProps.category}
                        </span>

                        {
                            !isMobile &&
                            <>
                                {
                                    taskDataProps.repeat &&
                                    <span className={styles.task__repeat}>
                                        <SyncRoundedIcon className={styles.task__icons}/>
                                        {repeatTaskData[taskDataProps.repeat]}
                                    </span>
                                }
                                {
                                    taskDataProps.deadline &&
                                    <span className={styles.task__deadline}>
                                        <CalendarMonthOutlinedIcon className={styles.task__icons}/>
                                        {
                                            new Date(taskDataProps.deadline)
                                            .toDateString() === new Date().toDateString()
                                            ?
                                                'Сегодня'
                                            :
                                            new DateFormatter().getFullDate(taskDataProps.deadline)
                                        }
                                    </span>
                                }
                                {
                                    taskDataProps.reminder &&
                                    <span className={styles.task__reminder}>
                                        <NotificationsRoundedIcon/>
                                        {
                                            new Date(taskDataProps.reminder)
                                            .toDateString() === new Date().toDateString()
                                            ?
                                                'Сегодня'
                                            :
                                            new DateFormatter().getFullDate(taskDataProps.reminder)
                                        }
                                    </span>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>

            <StarButton
                onClick={favoriteToggleHandler}
                isFavorite={taskDataProps.favorite}
            />
        </div>
    )
}

export default Task;