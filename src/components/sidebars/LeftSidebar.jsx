import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLSidebarOpen } from "../../store/reducers/SidebarSlice";

import UserDataCard from "../ui/cards/UserDataCard";
import SearchInput from "../ui/input/SearchInput";
import TaskGroupContainer from "../ui/containers/TaskGroup/TaskGroupContainer";

import {leftSidebarSelector, userDataSelector} from "../../store";

import styles from "./styles/LeftSidebar.module.scss";

const LeftSidebar = () => {
    const dispatch = useDispatch();
    const isLSidebarOpened = useSelector(leftSidebarSelector);
    const [userAvatar, setUserAvatar] = useState(null);

    const userData = useSelector(userDataSelector);

    useEffect(() => {
      if (userData && userData.photoURL) {
          setUserAvatar(userData.photoURL);
      }
    }, [userData]);
    
    const searchClickHandler = () => {
        if (!isLSidebarOpened) dispatch(setLSidebarOpen());
    };

    return (
        <aside className={
            styles.sidebar__left
            + `${!isLSidebarOpened ? ' ' + styles.closed : ''}`
            }
        >
            <UserDataCard userAvatar={userAvatar}/>
            <SearchInput
                onClick={searchClickHandler}
                placeholder="Поиск..."
            />
            <TaskGroupContainer/>
        </aside>
    );
}
export default LeftSidebar;