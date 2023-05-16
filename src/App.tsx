import React, { useEffect, useMemo, useState } from "react";
import { getUserTasks } from "./store/reducers/TaskSlice";
import { setUser } from "./store/reducers/AuthSlice";
import { auth, getMessagingToken, onMessageListener } from "./firebase.config";
import {onAuthStateChanged, User} from "firebase/auth";

import AppRouter from "./router/AppRouter";
import { getCustomTaskGroups } from "./store/reducers/TaskGroupSlice";

import { userDataSelector, themeSelector } from "./store";
import {MessagePayload} from "firebase/messaging"
import {useAppDispatch, useAppSelector} from "./store/store";
import {IBrowserNotification} from "./interfaces/Notification";
import {ThemeType} from "./interfaces/slices/SliceStates";


const getUserFromLocalStorage = (): User | null => {
    const user: string | null = localStorage.getItem("userData");
    return user ? JSON.parse(user) as User : null;
}

function App(): JSX.Element {
    const dispatch = useAppDispatch();
    const userData: User | null = useAppSelector(userDataSelector)
        || getUserFromLocalStorage();

    const currentTheme: ThemeType = useAppSelector(themeSelector);
    const isAuth: boolean = !!userData;


    const [messagingToken, setMessagingToken] = useState<boolean>(false);
    getMessagingToken(setMessagingToken);

    onMessageListener()
        .then((payload: MessagePayload) : void => {
            if (payload?.notification) {
                const options: IBrowserNotification = {
                    title: payload.notification?.title,
                    body: payload.notification?.body,
                }
                if (options.title) new Notification(options.title,
                    {body: options.body});
            }
        })

    // функция отслеживания изменения состояния авторизации
    useEffect(() => {
        const authStateChange = onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
            dispatch(setUser(user));
            dispatch(getUserTasks(user.uid));
            dispatch(getCustomTaskGroups(user.uid));
        }
      });

        return authStateChange;
    }, [dispatch]);


    useMemo(() => {
        // изменение значения атрибута data-theme при изменении темы в приложении
        document.documentElement.setAttribute("data-theme", currentTheme)

        // изменение цвета адресной строки для мобильных устройств
        const meta: Element | null = document.querySelector("meta[name='theme-color']");

        let themeColor: string = "#dfdfdf";
        if (currentTheme === "dark") themeColor = "#232323";

        if (meta) meta.setAttribute("content", themeColor);
    }, [currentTheme]);

    return (<AppRouter isAuth={isAuth} />);
}

export default App;
