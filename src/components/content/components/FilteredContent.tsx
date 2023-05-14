import React, {ChangeEvent, FC, useEffect} from "react";
import {RootState, useAppDispatch, useAppSelector} from "../../../store/store";
import {setCurrentGroupTasks} from "../../../store/reducers/TaskSlice";
import { setSearchFilter } from "../../../store/reducers/FilterSlice";

import Task from "../../ui/cards/Task";
import SearchInput from "../../ui/input/SearchInput";
import BackButton from "../../ui/button/BackButton";

import {ITask} from "../../../interfaces/TaskData";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as selectors from "../../../store";

import styles from "./FilteredContent.module.scss";

const FilteredContent: FC = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const currentGroupTasks: ITask[] = useAppSelector(selectors.currentGroupTasksSelector);
    const searchFilter: string = useAppSelector((state: RootState) => state.filterStates.searchFilter);
    const tasks: ITask[] = useAppSelector(selectors.tasksSelector);
    const isMobile: boolean = useAppSelector(selectors.mobileSelector);

    useEffect((): void => {
        let currentTasks: ITask[];
        if (searchFilter && searchFilter.length) {
            currentTasks = tasks.filter(
                (task: ITask) => task.taskName.includes(searchFilter)
            );
        }
        else currentTasks = [];

        dispatch(setCurrentGroupTasks(currentTasks));

    }, [dispatch, searchFilter, tasks]);

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(setSearchFilter({searchFilter: event.target.value}));
    }
    
    return (
        <div className={styles.tasks__container}>
            {
                isMobile &&
                <div className={styles.search__container}>
                    <BackButton/>
                    <SearchInput
                        value={searchFilter}
                        onChange={onSearchChange}
                    />
                </div>
            }
            <TransitionGroup style={{
                padding: isMobile ? "5rem 0 0 0" : "0 0 0 0.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
            }}>
                {
                    currentGroupTasks.length > 0 && (
                    currentGroupTasks.map((task: ITask, index: number) =>
                        <CSSTransition
                            key={index}
                            timeout={500}
                            classNames="item"
                            mountOnEnter
                        >
                            <Task
                                key={task.id}
                                taskDataProps={task}
                            />
                        </CSSTransition>
                    ))
                }
                </TransitionGroup>
        </div>
    );
};

export default FilteredContent;