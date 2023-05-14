import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/store";
import { setLSidebarOpen } from "../../store/reducers/SidebarSlice";
import {leftSidebarSelector, userDataSelector} from "../../store";
import {User} from "firebase/auth";

import UserDataCard from "../ui/cards/UserDataCard";
import SearchInput from "../ui/input/SearchInput";
import TaskGroupContainer from "../ui/containers/TaskGroup/TaskGroupContainer";


import styles from "./styles/LeftSidebar.module.scss";

const LeftSidebar = () => {
    const dispatch = useAppDispatch();
    const isLSidebarOpened: boolean = useAppSelector(leftSidebarSelector);
    const [userAvatar, setUserAvatar] = useState<string>("");
    const userData: User | null = useAppSelector(userDataSelector);

    useEffect(() => {
      if (userData && userData.photoURL) {
          setUserAvatar(userData.photoURL);
      }
    }, [userData]);
    
    const searchClickHandler = (): void => {
        if (!isLSidebarOpened) dispatch(setLSidebarOpen());
    };

    return (
        <aside className={
            styles.sidebar__left
            + `${!isLSidebarOpened ? " " + styles.closed : ""}`
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