import React, {FC} from "react";
import { useMediaQuery } from "react-responsive";

import Skeleton from "@mui/material/Skeleton";
import TaskGroup from "../../cards/TaskGroup";

import * as selectors from "../../../../store";

import styles from "../styles/TaskGroupContainer.module.scss";
import {ITaskGroup} from "../../../../interfaces/TaskData";
import {RootState, useAppSelector} from "../../../../store/store";

interface CustomGroupsProps {
    taskGroups: ITaskGroup[],
    onClick: (group: ITaskGroup) => void
}

const CustomGroups: FC<CustomGroupsProps> = ({ taskGroups, onClick }) => {
    const mobileScreen: boolean =  useMediaQuery({maxWidth: 768});
    const isMobile: boolean = useAppSelector(selectors.mobileSelector) || mobileScreen;

    const selectedTaskGroup: ITaskGroup = useAppSelector(selectors.selectedTaskGroupSelector);
    const isLSidebarOpened: boolean = useAppSelector(selectors.leftSidebarSelector);

    const taskGroupLoading = useAppSelector((state: RootState) => state.taskGroupStates.loading);

    const hideOverflow = !isLSidebarOpened ? {
    overflow: "hidden"
    } : {};

    return (
        <div className={styles.custom_group__container}
            style={hideOverflow}
         >
            {
            taskGroupLoading ?
                <>
                    <Skeleton animation="wave" width={"100%"}/>
                    <Skeleton animation="wave" width={"100%"}/>
                </>
            :
            taskGroups.map((group: ITaskGroup) =>
                <TaskGroup
                    key={group.id}
                    taskGroupData={{
                        id: group.id,
                        icon: group.icon,
                        title: group.title,
                        isActive: !isMobile && group.id === selectedTaskGroup?.id ? "active" : null
                    }}
                    onClick={() => onClick(group)}
                />
                )
            }
         </div>
    );
};

export default CustomGroups;