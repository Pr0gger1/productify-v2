import React, {MouseEvent, MutableRefObject, useRef, useState} from 'react';
import {Params, useParams} from 'react-router-dom';

import ContextMenu from 'components/ui/windows/contextMenu';
import IconButton from 'components/ui/buttons/IconButton';

import TaskGroupMenuList from 'components/ui/windows/contextMenu/task_page/TaskGroupMenuList';
import TaskPageMenuList from 'components/ui/windows/contextMenu/task_page/TaskPageMenuList';

import { mobileSelector } from 'store/selectors';

import styles from 'components/sections/content/ContentTopPanel/styles.module.scss';
import {useAppSelector} from 'store/index';

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