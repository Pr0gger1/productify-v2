import React from 'react';
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

import Skeleton from "@mui/material/Skeleton";
import TaskGroup from "../../cards/TaskGroup";

import * as selectors from '../../../../store';

import styles from "../styles/TaskGroupContainer.module.scss";

const CustomGroups = ({ taskGroups, onClick }) => {
    const mobileScreen =  useMediaQuery({maxWidth: 768});
    const isMobile = useSelector(selectors.mobileSelector) || mobileScreen;

    const selectedTaskGroup = useSelector(selectors.selectedTaskGroupSelector);
    const isLSidebarOpened = useSelector(selectors.leftSidebarSelector);

    const taskGroupLoading = useSelector(state => state.taskGroupStates.loading);

    const hideOverflow = !isLSidebarOpened ? {
    overflow: 'hidden'
    } : {};

    return (
        <div className={styles.custom_group__container}
            style={hideOverflow}
         >
            {
            taskGroupLoading ?
                <>
                    <Skeleton animation='wave' width={"100%"}/>
                    <Skeleton animation='wave' width={"100%"}/>
                </>
            :
            taskGroups.map(group =>
                <TaskGroup
                    key={group.id}
                    taskGroupData={{
                        id: group.id,
                        icon: group.icon,
                        title: group.title,
                        isActive: !isMobile && group.id === selectedTaskGroup.id ? 'active' : null
                    }}
                    onClick={() => onClick(group)}
                />
                )
            }
         </div>
    );
};

export default CustomGroups;