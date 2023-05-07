import React, {FC} from "react";
import { useMediaQuery } from "react-responsive";

import TaskGroup from "../../cards/TaskGroup";
import * as selectors from "../../../../store";

import styles from "../styles/TaskGroupContainer.module.scss";
import {ITaskGroup} from "../../../../interfaces/TaskData";
import {useAppSelector} from "../../../../store/store";

interface BaseGroupsProps {
    taskGroups: ITaskGroup[],
    onClick: (group: ITaskGroup) => void
}

const BaseGroups: FC<BaseGroupsProps> = ({ taskGroups, onClick }) => {
    const mobileScreen: boolean =  useMediaQuery({maxWidth: 768});
    const isMobile: boolean = useAppSelector(selectors.mobileSelector) || mobileScreen;
    const selectedTaskGroup: ITaskGroup = useAppSelector(selectors.selectedTaskGroupSelector);

    return (
        <div className={styles.base_group__container}>
        {
            taskGroups.map((group: ITaskGroup) =>
                <TaskGroup
                    key={group.id}
                    taskGroupData={{
                        id: group.id,
                        icon: group.icon,
                        title: group.title,
                        isActive: !isMobile && group.id === selectedTaskGroup.id
                        ? "active" : null
                    }}
                    onClick={() => onClick(group)}
                />
            )
        }
        </div>
    );
};

export default BaseGroups;