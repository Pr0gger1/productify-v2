import React, {FC, useEffect} from "react";
import useFilteredTasks from "../../../../hooks/useFilteredTasks";
import useGroupTasks from "../../../../hooks/useGroupTasks";
import useNotification from "../../../../hooks/useNotification";
import { setCurrentGroupTasks } from "../../../../store/reducers/TaskSlice";

import CompletedTasksAccordion from "./CompletedTasksAccordion";
import CreateTaskButton from "../../button/CreateTaskButton";
import Task from "../../cards/Task";

import CircularProgress from "@mui/material/CircularProgress";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import * as selectors from "../../../../store";

import "../../animations/Task/TaskAnimation.css";
import {RootState, useAppDispatch, useAppSelector} from "../../../../store/store";
import {ITask, ITaskGroup} from "../../../../interfaces/TaskData";
import {FilterStates} from "../../../../interfaces/Filter";
import styles from "../styles/TaskContainer.module.scss";

const NoTasksMessage: FC = (): JSX.Element => {
    return (
        <div className={styles.no_tasks__message}>
            В этой группе нет задач. Вперед к приключениям :)
        </div>
    );
}

const TaskContainer = () => {
    const dispatch = useAppDispatch();

    const tasks: ITask[] = useAppSelector(selectors.tasksSelector);
    const filter: FilterStates = useAppSelector(selectors.filterSelector);

    const currentGroupTasks: ITask[] = useAppSelector(selectors.currentGroupTasksSelector);
    const selectedTaskGroup: ITaskGroup = useAppSelector(selectors.selectedTaskGroupSelector);

    // функция, которая фильтрует массив задач в соответствии с выбранной группой
    const setCurrentTasks: () => ITask[] | undefined = useGroupTasks(tasks, selectedTaskGroup);

    // Конечный массив с отсортированными задачами
    const sortedTasks: ITask[] = useFilteredTasks(currentGroupTasks, filter.taskFilter);
    const completedTasks: ITask[] = sortedTasks.filter((task: ITask) => task.completed);

    const isCompletedGroup: boolean = selectedTaskGroup.id === "completed";

    const taskLoading: boolean = useAppSelector(
        (state: RootState) => state.taskStates.loading
    );

    useNotification();
    useEffect((): void => {
        dispatch(setCurrentGroupTasks(setCurrentTasks()!));
    }, [dispatch, selectedTaskGroup, setCurrentTasks, tasks]);

    return (
        <div className={styles.tasks__container}>
          {
              !isCompletedGroup
              && <CreateTaskButton />
          }

          {taskLoading ? <CircularProgress sx={{ margin: "0 auto" }} />
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
                  paddingLeft: "0.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {sortedTasks.length > 0 &&
                  sortedTasks
                      .filter((task: ITask) => {
                          return (isCompletedGroup && task.completed) || (!task.completed);
                      })
                    .map((task: ITask, index: number) => (
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