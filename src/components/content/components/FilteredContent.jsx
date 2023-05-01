import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentGroupTasks } from "../../../store/reducers/TaskSlice";
import { setSearchFilter } from "../../../store/reducers/FilterSlice";

import Task from "../../ui/cards/Task";
import SearchInput from "../../ui/input/SearchInput";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as selectors from "../../../store";

import styles from './FilteredContent.module.scss';
import BackButton from "../../ui/button/BackButton";

const FilteredContent = () => {
    const dispatch = useDispatch();

    const currentGroupTasks = useSelector(selectors.currentGroupTasksSelector);
    const searchFilter = useSelector(state => state.filterStates.searchFilter);
    const tasks = useSelector(selectors.tasksSelector);
    const isMobile = useSelector(selectors.mobileSelector);

    useEffect(() => {
        let currentTasks;
        if (searchFilter && searchFilter.length) {
            currentTasks = tasks.filter(
                task => task.taskName.includes(searchFilter)
            );
        }
        else currentTasks = [];

        dispatch(setCurrentGroupTasks({tasks: currentTasks}));

    }, [dispatch, searchFilter, tasks]);

    
    return (
        <div className={styles.tasks__container}>
            {
                isMobile &&
                <div className={styles.search__container}>
                    <BackButton/>
                    <SearchInput
                        value={searchFilter}
                        onChange={e => dispatch(setSearchFilter({
                            searchFilter: e.target.value
                        }))}
                    />
                </div>
            }
            <TransitionGroup style={{
                padding: isMobile ? '5rem 0 0 0' : '0 0 0 0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                {
                    currentGroupTasks.length > 0 && (
                    currentGroupTasks.map((task, index) =>
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