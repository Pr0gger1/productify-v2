import React, {Dispatch, FC, SetStateAction} from 'react';
import { updateTaskAsync } from 'store/reducers/TaskSlice';

import DeleteButton from 'components/ui/buttons/DeleteButton';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { selectedTaskSelector } from 'store/selectors';

import styles from '../sections/TaskDatesSection/styles.module.scss';
import {useAppDispatch, useAppSelector} from 'store/index';
import {ITask} from 'types/TaskData';

interface DeadlinePickerProps {
    setShowDeadlinePicker: Dispatch<SetStateAction<boolean>>
}

const DeadlinePicker: FC<DeadlinePickerProps> = ({ setShowDeadlinePicker }) => {
	const dispatch = useAppDispatch();
	const selectedTask: ITask | null = useAppSelector(selectedTaskSelector);

	const onDeadlineChange = async (value: dayjs.Dayjs | null): Promise<void> => {
		if (selectedTask && value) {
			const taskData = {
				...selectedTask,
				deadline: value.toDate().getTime(),
				isDeadlineNotified: false
			};

			if (selectedTask.repeat)
				taskData.repeat = null;

			dispatch(updateTaskAsync(taskData));
		}
	};

	const deleteDeadlineHandler = (): void => {
		if (selectedTask) {
			const taskData: ITask = {
				...selectedTask,
				deadline: null
			};

			delete taskData.isDeadlineNotified;

			if (selectedTask.repeat)
				taskData.repeat = null;

			dispatch(updateTaskAsync(taskData));
			setShowDeadlinePicker(false);
		}
	};


	return (
		<div className={styles.date__container}>
			<LocalizationProvider
				dateAdapter={AdapterDayjs}
				localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
			>
				<MobileDateTimePicker
					label={'Дата выполнения'}
					value={dayjs(selectedTask?.deadline ?? new Date())}
					onChange={async (val: dayjs.Dayjs | null) => await onDeadlineChange(val)}
					sx = {{
						label: {
							color: 'var(--fontColor)'
						},
						'.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
							color: 'var(--fontColor)',
						},
						'.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
							border: '1px solid var(--borderColor)'
						}
					}}
					ampm={false}
                    
				/>
			</LocalizationProvider>
			<DeleteButton
				sx={{
					padding: 2
				}}
				onClick={deleteDeadlineHandler}
			/>
		</div>
	);
};

export default DeadlinePicker;