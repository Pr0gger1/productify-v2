import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import {
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';

import { deleteUser } from 'store/reducers/AuthSlice';
import { ThemedDialog } from '../ThemedDialog';
import { ThemedTextField } from 'components/ui/custom/CustomInputs';
import './styles.scss';
import CircularProgress from '@mui/material/CircularProgress';
import { SnackbarContext } from 'context/SnackbarContext';
import { DialogProps } from 'types/Dialog';
import { RootState, useAppDispatch, useAppSelector } from 'store';
import { SerializedError } from '@reduxjs/toolkit';

const DeleteUserDialog: FC<DialogProps> = ({ open, setOpen }): JSX.Element => {
	const dispatch = useAppDispatch();
	const [passwordInput, setPasswordInput] = useState<string>('');
	const [textFieldError, setTextFieldError] = useState<boolean>(false);
	const { setToast } = useContext(SnackbarContext);

	const authStatus: string | undefined = useAppSelector(
		(state: RootState) => state.authStates.status,
	);
	const deleteError: SerializedError | null = useAppSelector(
		(state: RootState) => state.authStates.authError,
	);

	const onDeleteAccountSubmit = (): void => {
		if (passwordInput.length) {
			dispatch(deleteUser(passwordInput));
			setTextFieldError(false);
		} else setTextFieldError(true);
	};

	const onCloseDialogClick = (): void => {
		setOpen(false);
		setPasswordInput('');
	};

	useEffect((): void => {
		if (textFieldError && passwordInput.length) setTextFieldError(false);
	}, [textFieldError, passwordInput]);

	useEffect((): void => {
		if (deleteError) {
			const message: string = deleteError.message ?? '';
			setToast({
				message,
				type: 'error',
			});
		}
	}, [deleteError]);

	return (
		<ThemedDialog open={open} onClose={onCloseDialogClick}>
			<DialogTitle>Подтверждение удаления аккаунта</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<strong>Внимание!</strong> Ваш аккаунт будет безвозвратно удален.
					Введите пароль, чтобы продолжить
				</DialogContentText>

				<ThemedTextField
					value={passwordInput}
					type="password"
					helperText={textFieldError ? 'Пустое поле' : ''}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setPasswordInput(e.target.value)
					}
					error={textFieldError}
					variant="standard"
					label="Пароль"
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button variant="text" onClick={onCloseDialogClick}>
					Отмена
				</Button>
				{authStatus === 'loading' ? (
					<CircularProgress />
				) : (
					<Button variant="text" color="error" onClick={onDeleteAccountSubmit}>
						Подтвердить
					</Button>
				)}
			</DialogActions>
		</ThemedDialog>
	);
};

export default DeleteUserDialog;
