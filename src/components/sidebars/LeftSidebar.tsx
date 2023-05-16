import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setLSidebarOpen } from "../../store/reducers/SidebarSlice";
import { leftSidebarSelector } from "../../store";

import UserDataCard from "../ui/cards/UserDataCard";
import SearchInput from "../ui/input/SearchInput";
import TaskGroupContainer from "../ui/containers/TaskGroup/TaskGroupContainer";

import styles from "./styles/LeftSidebar.module.scss";

const LeftSidebar = () => {
    const dispatch = useAppDispatch();
    const isLSidebarOpened: boolean = useAppSelector(leftSidebarSelector);

    const searchClickHandler = (): void => {
        if (!isLSidebarOpened) dispatch(setLSidebarOpen());
    };

    return (
        <aside className={styles.sidebar__left}
               data-lsidebar-active={isLSidebarOpened}
        >
            <UserDataCard/>
            <SearchInput
                onClick={searchClickHandler}
                placeholder="Поиск..."
            />
            <TaskGroupContainer/>
        </aside>
    );
}
export default LeftSidebar;