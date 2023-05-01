import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ContextMenu from "../ContextMenu";
import IconButton from "../../button/IconButton";

import TaskGroupMenuList from "./TaskGroupMenuList";
import TaskPageMenuList from "./TaskPageMenuList";

import { mobileSelector } from "../../../../store";

import styles from "../../../content/styles/ContentTopPanel.module.scss";

const TaskGroupMenuContainer = () => {
    const params = useParams();
    const isMobile = useSelector(mobileSelector);

    const menuContainerRef = useRef(null);
    const [anchorMenu, setAnchorMenu] = useState(null);

    const handleClick = (event) => {
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