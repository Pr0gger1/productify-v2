import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import useFilteredTasks from '../../../../hooks/useFilteredTasks';
import useGroupTasks from "../../../../hooks/useGroupTasks";
import useNotification from "../../../../hooks/useNotification";
import { setCurrentGroupTasks } from '../../../../store/reducers/TaskSlice';

import { baseGroupIds } from '../../../../store/defaultData/baseGroups';

import CompletedTasksAccordion from "./CompletedTasksAccordion";
import CreateTaskButton from '../../button/CreateTaskButton';
import Task from '../../cards/Task';

import CircularProgress from '@mui/material/CircularProgress';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as selectors from "../../../../store";

import '../../animations/Task/TaskAnimation.css';
import styles from '../styles/TaskContainer.module.scss';

const NoTasksMessage = () => {
    return (
        <div className={styles.no_tasks__message}>
            В этой группе нет задач. Вперед к приключениям :)
        </div>
    );
}

const TaskContainer = () => {
    const dispatch = useDispatch();

    const tasks = useSelector(selectors.tasksSelector);
    const filter = useSelector(selectors.filterSelector);

    const currentGroupTasks = useSelector(selectors.currentGroupTasksSelector);
    const selectedTaskGroup = useSelector(selectors.selectedTaskGroupSelector);

    // функция, которая фильтрует массив задач в соответствии с выбранной группой
    const setCurrentTasks = useGroupTasks(tasks, selectedTaskGroup);

    // Конечный массив с отсортированными задачами
    const sortedTasks = useFilteredTasks(currentGroupTasks, filter.taskFilter);
    const completedTasks = sortedTasks.filter(task => task.completed);

    const isCompletedGroup = selectedTaskGroup.id === baseGroupIds.completed;

    const taskLoading = useSelector(
        state => state.taskStates.loading
    );

    useNotification();
    useEffect(() => {
        dispatch(setCurrentGroupTasks({tasks: setCurrentTasks()}));
    }, [dispatch, selectedTaskGroup, setCurrentTasks, tasks]);

    return (
        <div className={styles.tasks__container}>
          {
              !isCompletedGroup
              && <CreateTaskButton />
          }

          {taskLoading ? <CircularProgress sx={{ margin: '0 auto' }} />
           : (
            <>
              { !isCompletedGroup && completedTasks.length !== 0 && (
                <CompletedTasksAccordion
                    completedTasks={completedTasks}
                />
              )}
              {!sortedTasks.length && <NoTasksMessage />}
              <TransitionGroup
                style={{
                  paddingLeft: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {sortedTasks.length > 0 &&
                  sortedTasks
                      .filter(task => {
                          return (isCompletedGroup && task.completed) || (!task.completed);
                      })
                    .map((task, index) => (
                      <CSSTransition
                        key={index}
                        timeout={500}
                        classNames="item"
                        mountOnEnter
                      >
                        <Task key={task.id} taskDataProps={task} />
                      </CSSTransition>
                    ))}
              </TransitionGroup>
            </>
          )}
    </div>
    );
};

export default TaskContainer;