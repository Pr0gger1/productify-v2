import React, { useEffect } from 'react';
import { getUserTasks } from 'store/reducers/TaskSlice';
import { setUser } from 'store/reducers/AuthSlice';
import { auth, getMessagingToken, onMessageListener } from './firebase.config';
import { onAuthStateChanged, User } from 'firebase/auth';

import AppRouter from './router/AppRouter';
import { getCustomTaskGroups } from 'store/reducers/TaskGroupSlice';

import { themeSelector, userDataSelector } from 'store/selectors';
import { MessagePayload } from 'firebase/messaging';
import { useAppDispatch, useAppSelector } from 'store';
import { IBrowserNotification } from 'types/Notification';
import { ThemeType } from 'types/slices/SliceStates';

const getUserFromLocalStorage = (): User | null => {
	const user: string | null = localStorage.getItem('userData');
	return user ? (JSON.parse(user) as User) : null;
};

function App(): JSX.Element {
	const dispatch = useAppDispatch();
	const userData: User | null =
    useAppSelector(userDataSelector) || getUserFromLocalStorage();

	const currentTheme: ThemeType = useAppSelector(themeSelector);
	const isAuth: boolean = !!userData;

	getMessagingToken().then(r => {
		if (r === null) console.log('No registration token');
		else console.log('Messaging token was received');
	});
	onMessageListener().then((payload: MessagePayload): void => {
		if (payload?.notification) {
			console.log(payload);
			const options: IBrowserNotification = {
				title: payload.notification?.title,
				body: payload.notification?.body,
			};
			if (options.title)
				new Notification(options.title, { body: options.body });
		}
	});

	// функция отслеживания изменения состояния авторизации
	useEffect(() => {
		return onAuthStateChanged(auth, (user: User | null) => {
			if (user) {
				dispatch(setUser(user));
				dispatch(getUserTasks(user.uid));
				dispatch(getCustomTaskGroups(user.uid));
			}
		});
	}, [dispatch]);

	useEffect(() => {
		// изменение значения атрибута data-theme при изменении темы в приложении
		document.documentElement.setAttribute('data-theme', currentTheme);

		// изменение цвета адресной строки для мобильных устройств
		const meta: Element | null = document.querySelector(
			'meta[name=\'theme-color\']',
		);

		let themeColor: string = '#dfdfdf';
		if (currentTheme === 'dark') themeColor = '#232323';

		if (meta) meta.setAttribute('content', themeColor);
	}, [currentTheme]);

	return <AppRouter isAuth={isAuth} />;
}

export default App;
