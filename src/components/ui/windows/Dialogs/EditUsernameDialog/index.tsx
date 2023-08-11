import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import { ThemedDialog } from '../ThemedDialog';
import {
	Button, DialogActions,
	DialogContent, DialogContentText,
	DialogTitle
} from '@mui/material';

import { userDataSelector } from 'store/selectors';
import { ThemedTextField } from 'components/ui/custom/CustomInputs';
import { updateUserProfile } from 'store/reducers/AuthSlice';
import { useAppDispatch, useAppSelector } from 'store/index';
import { User } from 'firebase/auth';

interface EditUsernameDialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const EditUsernameDialog: FC<EditUsernameDialogProps> = ({ open, setOpen }) => {
	const dispatch = useAppDispatch();
	const currentUser: User | null = useAppSelector(userDataSelector);

	const [newUsername, setNewUsername] = useState<string>(currentUser?.displayName ?? '');
	const [textFieldError, setTextFieldError] = useState<boolean>(false);

	const onCloseDialogClick = (): void => {
		setOpen(false);
		setNewUsername('');
	};

	const onChangeUsernameSubmit = () => {
		dispatch(updateUserProfile({username: newUsername}));
		setOpen(false);
	};

	useEffect(() => {
		if (textFieldError && newUsername.length)
			setTextFieldError(false);
	}, [textFieldError, newUsername]);

	return (
		<ThemedDialog
			open={open}
			onClose={onCloseDialogClick}
		>
			<DialogTitle>
                Изменение имени пользователя
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
                    Введите новое имя пользователя
				</DialogContentText>

				<ThemedTextField
					value={newUsername}
					helperText={textFieldError ? 'Пустое поле' : ''}
					onChange={e => setNewUsername(e.target.value)}
					error={textFieldError}
					variant="standard"
					label="Имя пользователя"
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button
					variant="text"
					onClick={onCloseDialogClick}
				>
                    Отмена
				</Button>
				<Button
					variant="text"
					color="error"
					onClick={onChangeUsernameSubmit}
				>
                    Подтвердить
				</Button>
			</DialogActions>
		</ThemedDialog>
	);
};

export default EditUsernameDialog;