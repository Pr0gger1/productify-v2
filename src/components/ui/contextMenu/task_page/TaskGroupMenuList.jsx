import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import useToggleIconTheme from '../../../../hooks/useToggleIconTheme';

import { ContextMenuSelect } from '../../customComponents/ContextMenuSelect';
import { ThemedTextField } from "../../customComponents/CustomInputs";

import { MenuItem, Tooltip } from '@mui/material';
import { baseGroupIds } from '../../../../store/defaultData/baseGroups';
import Stack from '@mui/material/Stack';

import { setTaskFilter } from '../../../../store/reducers/FilterSlice';
import { deleteCustomTaskGroupAsync, renameCustomTaskGroupAsync } from '../../../../store/reducers/TaskGroupSlice';
import ConfirmationButton from "../../button/ConfirmationButton";

import deleteGroupIcon from '../../../../assets/img/icons/delete_icon.svg';
import filterIcon from '../../../../assets/img/icons/filter_icon.svg';
import upArrowFilterLight from '../../../../assets/img/icons/filter/up_arrow_dark.svg';
import downArrowFilterLight from '../../../../assets/img/icons/filter/down_arrow_dark.svg';
import upArrowFilterDark from '../../../../assets/img/icons/filter/up_arrow_light.svg';
import downArrowFilterDark from '../../../../assets/img/icons/filter/down_arrow_light.svg';
import editIcon from '../../../../assets/img/icons/edit_icon.svg';

import * as selectors from '../../../../store';

import styles from "./styles/TaskGroupMenuContainer.module.scss";

const TaskGroupMenuList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showEditInput, setShowEditInput] = useState(false);
    const [editInputText, setEditInputText] = useState('');

    const selectedTaskGroup = useSelector(selectors.selectedTaskGroupSelector);
    const taskFilter = useSelector(state => state.filterStates.taskFilter);
    const isMobile = useSelector(selectors.mobileSelector);

    const filterModeIconUp = useToggleIconTheme(
        upArrowFilterLight, upArrowFilterDark
    );
    const filterModeIconDown = useToggleIconTheme(
        downArrowFilterLight, downArrowFilterDark
    );

    const onFilterChange = event => {
        dispatch(setTaskFilter({
            type: event.target.value,
            desc: true
        }));
    }

    const onEditGroupTitleClick = () => {
        if (showEditInput) {
            dispatch(renameCustomTaskGroupAsync({
                ...selectedTaskGroup,
                title: editInputText,
                pageTitle: editInputText,
                webTitle: `Productify - ${editInputText}`
            }));
            setShowEditInput(false);
        }
    }

    const onEditTitleEnterPressed = event => {
        if (event.key === 'Enter')
            onEditGroupTitleClick();
    }

    const deleteCustomTaskGroupHandler = () => {
        dispatch(deleteCustomTaskGroupAsync(selectedTaskGroup.id));
        if (isMobile)
            navigate(`/`);

    }

    const toggleFilterModeHandler = () => {
        dispatch(setTaskFilter({
            ...taskFilter, desc: !taskFilter.desc
        }));
    }

    return (
        <Stack
            spacing={1}>
            <div className={styles.menu__item}>
                <img src={filterIcon} alt="Сортировка задач" />
                <div className={styles.select__container}>
                    <Tooltip
                        title={taskFilter.desc ? 'По возрастанию' : 'По убыванию'}
                    >
                        <span onClick={toggleFilterModeHandler}>
                            {
                                taskFilter.desc ?
                                    <img src={filterModeIconUp} alt="по возрастанию" />
                                    :
                                    <img src={filterModeIconDown} alt="по убыванию" />
                            }
                        </span>
                    </Tooltip>

                    <span>
                        <ContextMenuSelect
                            value={taskFilter.type}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        backgroundColor: 'var(--bgColorFirst)',
                                        color: 'var(--fontColor)'
                                    }
                                }
                            }}
                            onChange={onFilterChange}
                        >
                            <MenuItem value="alphabet">
                                По алфавиту
                            </MenuItem>

                            <MenuItem value="created_at">
                                По дате добавления
                            </MenuItem>

                            <MenuItem value="favorite">
                                По важности
                            </MenuItem>
                        </ContextMenuSelect>
                    </span>
                </div>
            </div>

            {
                !baseGroupIds[selectedTaskGroup.id] &&
                <>
                    <div className={styles.menu__item}
                        onClick={() => setShowEditInput(true)}
                    >
                        <img
                            src={editIcon}
                            alt="Переименовать список"
                            onClick={onEditGroupTitleClick}
                        />
                        {
                            showEditInput ?
                                <>
                                    <ThemedTextField
                                        variant='standard'
                                        value={editInputText}
                                        onChange={e => setEditInputText(e.target.value)}
                                        onKeyDown={onEditTitleEnterPressed}
                                        sx={{width: '100%'}}
                                    />

                                    <ConfirmationButton
                                        sx={{padding: 0.5, backgroundColor: 'var(--backgroundSecond)'}}
                                        variant={editInputText.length ? 'ok' : 'cancel'}
                                        onClick={(e) => {e.stopPropagation(); setShowEditInput(false)}}
                                    />
                                </>
                                :
                                <span>
                                    Переименовать список
                                </span>

                        }
                    </div>

                    <div className={styles.menu__item}
                        onClick={deleteCustomTaskGroupHandler}
                    >
                        <img src={deleteGroupIcon} alt="Удалить группу задач" />
                        <span style={{ color: '#ff634c' }}>
                            Удалить список
                        </span>
                    </div>
                </>
            }
        </Stack>
    );
};

export default TaskGroupMenuList;