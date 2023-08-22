import React, { FC, KeyboardEvent, MouseEvent, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import useToggleIconTheme from 'hooks/useToggleIconTheme';

import { ContextMenuSelect } from 'components/ui/custom/ContextMenuSelect';
import { ThemedTextField } from 'components/ui/custom/CustomInputs';

import { MenuItem, SelectChangeEvent, Tooltip } from '@mui/material';
import { baseGroupIds } from 'store/defaultData/baseGroups';
import Stack from '@mui/material/Stack';

import { setTaskFilter } from 'store/reducers/FilterSlice';
import {
	deleteCustomTaskGroupAsync,
	renameCustomTaskGroupAsync,
} from 'store/reducers/TaskGroupSlice';
import ConfirmationButton from 'components/ui/buttons/ConfirmationButton';
import { selectedTaskGroupSelector, mobileSelector } from 'store/selectors';

import styles from '../TaskGroupMenuContainer/TaskGroupMenuContainer.module.scss';
import { RootState, useAppDispatch, useAppSelector } from 'store';
import { ITaskGroup } from 'types/TaskData';
import { TaskFilterType } from 'types/Filter';

import deleteGroupIcon from 'assets/img/icons/delete_icon.svg';
import filterIcon from 'assets/img/icons/filter_icon.svg';
import upArrowFilterLight from 'assets/img/icons/filter/up_arrow_dark.svg';
import downArrowFilterLight from 'assets/img/icons/filter/down_arrow_dark.svg';
import upArrowFilterDark from 'assets/img/icons/filter/up_arrow_light.svg';
import downArrowFilterDark from 'assets/img/icons/filter/down_arrow_light.svg';
import editIcon from 'assets/img/icons/edit_icon.svg';

const TaskGroupMenuList: FC = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate: NavigateFunction = useNavigate();

	const [showEditInput, setShowEditInput] = useState<boolean>(false);
	const [editInputText, setEditInputText] = useState<string>('');

	const selectedTaskGroup: ITaskGroup | null = useAppSelector(
		selectedTaskGroupSelector,
	);
	const taskFilter: TaskFilterType = useAppSelector(
		(state: RootState) => state.filterStates.taskFilter,
	);
	const isMobile: boolean = useAppSelector(mobileSelector);

	const filterModeIconUp: string = useToggleIconTheme(
		upArrowFilterLight,
		upArrowFilterDark,
	);
	const filterModeIconDown: string = useToggleIconTheme(
		downArrowFilterLight,
		downArrowFilterDark,
	);

	const onFilterChange = (event: SelectChangeEvent<unknown>): void => {
		const target = event.target;
		dispatch(
			setTaskFilter({
				type: target?.value,
				desc: true,
			}),
		);
	};

	const onEditGroupTitleClick = (): void => {
		if (showEditInput && selectedTaskGroup) {
			dispatch(
				renameCustomTaskGroupAsync({
					...selectedTaskGroup,
					title: editInputText,
					pageTitle: editInputText,
					webTitle: `Productify - ${editInputText}`,
				}),
			);
			setShowEditInput(false);
		}
	};

	const onEditTitleEnterPressed = (event: KeyboardEvent): void => {
		if (event.key === 'Enter') onEditGroupTitleClick();
	};

	const onConfirmEditClick = (event: MouseEvent<HTMLElement>): void => {
		event.stopPropagation();
		setShowEditInput(false);
	};

	const deleteCustomTaskGroupHandler = (): void => {
		if (selectedTaskGroup) {
			dispatch(deleteCustomTaskGroupAsync(selectedTaskGroup.id));
			if (isMobile) navigate('/');
		}
	};

	const toggleFilterModeHandler = (): void => {
		dispatch(
			setTaskFilter({
				...taskFilter,
				desc: !taskFilter.desc,
			}),
		);
	};

	return (
		<Stack spacing={1}>
			<div className={styles.menu__item}>
				<img src={filterIcon} alt="Сортировка задач" />
				<div className={styles.select__container}>
					<Tooltip title={taskFilter.desc ? 'По возрастанию' : 'По убыванию'}>
						<span onClick={toggleFilterModeHandler}>
							{taskFilter.desc ? (
								<img src={filterModeIconUp} alt="по возрастанию" />
							) : (
								<img src={filterModeIconDown} alt="по убыванию" />
							)}
						</span>
					</Tooltip>

					<span>
						<ContextMenuSelect
							value={taskFilter.type}
							MenuProps={{
								PaperProps: {
									sx: {
										backgroundColor: 'var(--bgColorFirst)',
										color: 'var(--fontColor)',
									},
								},
							}}
							onChange={onFilterChange}
						>
							<MenuItem value="alphabet">По алфавиту</MenuItem>

							<MenuItem value="created_at">По дате добавления</MenuItem>

							<MenuItem value="favorite">По важности</MenuItem>
						</ContextMenuSelect>
					</span>
				</div>
			</div>

			{!Object.values(baseGroupIds).includes(selectedTaskGroup?.id) && (
				<>
					<div
						className={styles.menu__item}
						onClick={() => setShowEditInput(true)}
					>
						<img
							src={editIcon}
							alt="Переименовать список"
							onClick={onEditGroupTitleClick}
						/>
						{showEditInput ? (
							<>
								<ThemedTextField
									variant="standard"
									value={editInputText}
									onChange={e => setEditInputText(e.target.value)}
									onKeyDown={onEditTitleEnterPressed}
									sx={{ width: '100%' }}
								/>

								<ConfirmationButton
									sx={{
										padding: 0.5,
										backgroundColor: 'var(--backgroundSecond)',
									}}
									variant={editInputText.length ? 'ok' : 'cancel'}
									onClick={onConfirmEditClick}
								/>
							</>
						) : (
							<span>Переименовать список</span>
						)}
					</div>

					<div
						className={styles.menu__item}
						onClick={deleteCustomTaskGroupHandler}
					>
						<img src={deleteGroupIcon} alt="Удалить группу задач" />
						<span style={{ color: '#ff634c' }}>Удалить список</span>
					</div>
				</>
			)}
		</Stack>
	);
};

export default TaskGroupMenuList;
