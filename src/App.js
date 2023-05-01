import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTasks } from "./store/reducers/TaskSlice";
import { setUser } from "./store/reducers/AuthSlice";
import { auth, getMessagingToken, onMessageListener } from "./firebase.config";
import { onAuthStateChanged } from "firebase/auth";

import AppRouter from "./router/AppRouter";
import SnackbarProvider from "./providers/SnackbarProvider";
import { getCustomTaskGroups } from "./store/reducers/TaskGroupSlice";

import { userDataSelector, themeSelector } from "./store";
function App() {
    const dispatch = useDispatch();
    const userData = useSelector(userDataSelector)
        || localStorage.getItem('userData');

    const currentTheme = useSelector(themeSelector);
    const isAuth = !!userData;


    const [messagingToken, setMessagingToken] = useState(false);
    getMessagingToken(setMessagingToken);

    // useEffect(() => {
    //     console.log(messagingToken)
    // }, [messagingToken]);

    onMessageListener()
        .then(payload => {
            const options = {
                title: payload.notification.title,
                body: payload.notification.body
            }
            new Notification(options.title, {
                body: options.body
            }
        )})

    // функция отслеживания изменения состояния авторизации
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
            dispatch(setUser({ data: user }));
            dispatch(getUserTasks(user.uid));
            dispatch(getCustomTaskGroups(user.uid));

            console.log(user)
        }
      });

        return unsubscribe;
    }, [dispatch]);


    useMemo(() => {
        // изменение значения атрибута data-theme при изменении темы в приложении
        document.documentElement.setAttribute("data-theme", currentTheme)
        localStorage.setItem('theme', currentTheme);

        // изменение цвета адресной строки для мобильных устройств
        const meta = document.querySelector('meta[name="theme-color"]');

        let themeColor = "#dfdfdf";
        if (currentTheme === "dark") themeColor = "#232323";

        if (meta) meta.setAttribute('content', themeColor);
    }, [currentTheme]);

    return (
        <SnackbarProvider>
            <AppRouter isAuth={isAuth} />
        </SnackbarProvider>
    );
}

export default App;
