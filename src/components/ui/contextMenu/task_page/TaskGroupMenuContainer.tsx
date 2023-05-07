import React, {MouseEvent, MutableRefObject, useRef, useState} from "react";
import {Params, useParams} from "react-router-dom";

import ContextMenu from "../ContextMenu";
import IconButton from "../../button/IconButton";

import TaskGroupMenuList from "./TaskGroupMenuList";
import TaskPageMenuList from "./TaskPageMenuList";

import { mobileSelector } from "../../../../store";

import styles from "../../../content/styles/ContentTopPanel.module.scss";
import {useAppSelector} from "../../../../store/store";

const TaskGroupMenuContainer = () => {
    const params: Readonly<Params> = useParams();
    const isMobile: boolean = useAppSelector(mobileSelector);

    const menuContainerRef: MutableRefObject<null> = useRef(null);
    const [anchorMenu, setAnchorMenu] = useState<HTMLElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorMenu(event.currentTarget);
    };

    return (
        <div className={styles.context__container} ref={menuContainerRef}>
            <IconButton
                onClick={handleClick}
            >
                •••
            </IconButton>

            <ContextMenu
                anchorEl={anchorMenu}
                setAnchorEl={setAnchorMenu}
            >
                {
                    isMobile && params.task_id ?
                    <TaskPageMenuList/>
                        :
                    <TaskGroupMenuList/>
                }
            </ContextMenu>
        </div>
    );
};

export default TaskGroupMenuContainer;