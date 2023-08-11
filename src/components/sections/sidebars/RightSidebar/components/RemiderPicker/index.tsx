import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import { updateTaskAsync } from 'store/reducers/TaskSlice';

import DeleteButton from 'components/ui/buttons/DeleteButton';

import { sendRequestWithDelay } from 'utils/requests';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers';

import { selectedTaskSelector } from 'store/selectors';
import dayjs from 'dayjs';
import styles from '../sections/TaskDatesSection/styles.module.scss';
import { useAppDispatch, useAppSelector } from 'store/index';
import {ITask} from 'types/TaskData';

interface ReminderPickerProps {
    setShowReminderPicker: Dispatch<SetStateAction<boolean>>
}

const ReminderPicker: FC<ReminderPickerProps> = ({ setShowReminderPicker }) => {
	const dispatch = useAppDispatch();
	const selectedTask: ITask | null = useAppSelector(selectedTaskSelector);
	const [reminderDate, setReminderDate] = useState<number | null>(selectedTask ? selectedTask?.reminder : null);

	const onReminderChange = async (value: dayjs.Dayjs | null): Promise<void> => {
		if (value && selectedTask) {
			setReminderDate(value.toDate().getTime());

			const taskData: ITask = {
				...selectedTask,
				reminder: value.toDate().getTime(),
				isRemindNotified: false
			};

			await sendRequestWithDelay((): void => {
				dispatch(updateTaskAsync(taskData));
			}, 2000);
		}
	};

	const deleteReminderHandler = (): void => {
		if (selectedTask) {
			const taskData: ITask = {
				...selectedTask,
				reminder: null
			};

			delete taskData.isRemindNotified;

			dispatch(updateTaskAsync(taskData));
			setShowReminderPicker(false);
		}
	};

	return (
		<div className={styles.date__container}>
			<LocalizationProvider
				dateAdapter={AdapterDayjs}
				localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
			>
				<MobileDateTimePicker
					label={'Напоминание'}
					value={dayjs(reminderDate)}
					onChange={async (val: dayjs.Dayjs | null) => await onReminderChange(val)}
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
				sx={{ padding: 2 }}
				onClick={deleteReminderHandler}
			/>
		</div>
	);
};

export default ReminderPicker;