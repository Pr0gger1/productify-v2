import {useContext, useEffect, useState} from 'react';
import {SnackbarContext} from 'context/SnackbarContext';
import {SerializedError} from '@reduxjs/toolkit';

export const useAuthError = (authError: SerializedError | null): void => {
	const [errorMessage, setErrorMessage] = useState<string>('');
	const { setMessage, setType, setOpen } = useContext(SnackbarContext);

	useEffect((): void => {
		if (authError) {
			switch (authError.code) {
			case 'auth/invalid-email':
				setErrorMessage('Неверный адрес электронной почты');
				break;
			case 'auth/user-disabled':
				setErrorMessage('Пользователь недоступен');
				break;
			case 'auth/user-not-found':
				setErrorMessage('Пользователя не существует');
				break;
			case 'auth/wrong-password':
				setErrorMessage('Неправильный пароль');
				break;
			case 'auth/too-many-requests':
				setErrorMessage('Слишком много запросов!');
				break;

			case 'auth/requires-recent-login':
				setErrorMessage('Необходимо снова авторизоваться в аккаунт');
				break;
			default:
				if (authError.code)
					setErrorMessage(authError.code);
				break;
			}
			setMessage(errorMessage);
			setType('error');
			setOpen(true);
		}
	}, [authError, errorMessage, setMessage, setOpen, setType]);
};