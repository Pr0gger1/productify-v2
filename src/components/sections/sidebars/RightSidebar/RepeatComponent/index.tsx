import React, {FC, useEffect, useState} from 'react';
import { updateTaskAsync } from 'store/reducers/TaskSlice';

import {FormControl, InputLabel, MenuItem, SelectChangeEvent} from '@mui/material';
import { TaskCategorySelect } from 'components/ui/custom/TaskCategorySelect';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import {selectedTaskSelector} from 'store/selectors';
import {useAppDispatch, useAppSelector} from 'store';
import {ITask} from 'types/TaskData';

export const repeatType = {
	everyDay: 'daily',
	everyWeek: 'weekly',
	everyMonth: 'monthly'
};

const repeatItems = [
	{
		title: 'Каждый день',
		value: repeatType.everyDay
	},
	{
		title: 'Каждую неделю',
		value: repeatType.everyWeek
	},
	{
		title: 'Каждый месяц',
		value: repeatType.everyMonth
	}
];

const RepeatComponent: FC = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const selectedTask: ITask | null = useAppSelector(selectedTaskSelector);

	const [repeat, setRepeat] = useState<unknown>(selectedTask?.repeat ?? '');

	const onRepeatChange = (event: SelectChangeEvent<unknown>): void => {
		const value = event.target.value;
		const date: Date = new Date();

		setRepeat(value);
		if (selectedTask)
			switch (value) {
			case repeatType.everyDay:
				{
					const taskData: ITask = {
						...selectedTask,
						repeat: value,
						deadline: new Date(date.setDate(date.getDate() + 1)).getTime()
					};
					dispatch(updateTaskAsync(taskData));
				}
				break;
			case repeatType.everyWeek:
				{
					const taskData: ITask =  {
						...selectedTask,
						repeat: value,
						deadline: new Date(date.setDate(date.getDate() + 7)).getTime()
					};
					dispatch(updateTaskAsync(taskData));
				}
				break;
			case repeatType.everyMonth:
				{
					const taskData: ITask = {
						...selectedTask,
						repeat: value,
						deadline: new Date(date.setMonth(date.getMonth() + 1)).getTime()
					};
					dispatch(updateTaskAsync(taskData));
				}
				break;
			default:
				break;
			}
	};

	useEffect((): void => {
		if (selectedTask && !selectedTask.repeat)
			setRepeat('');
	}, [selectedTask]);

	return (
		<FormControl fullWidth>
			<InputLabel
				id="repeat_select__label"
				style={{color: 'var(--fontColor)'}}
			>
                Повтор
			</InputLabel>
			<TaskCategorySelect
				value={selectedTask?.repeat ?? repeat}
				onChange={onRepeatChange}
				labelId="repeat_select__label"
				IconComponent={CalendarMonthTwoToneIcon}
				MenuProps={{
					PaperProps: {
						sx: {
							backgroundColor: 'var(--bgColorFirst)',
							color: 'var(--fontColor)',
						}
					}
				}}
			>
				<MenuItem value="">Выберите период</MenuItem>
				{
					repeatItems.map(item =>
						<MenuItem key={item.value}
							value={item.value}
						>
							{item.title}
						</MenuItem>
					)
				}
			</TaskCategorySelect>
		</FormControl>
	);
};

export default RepeatComponent;