import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";
import { Navigate, useRoutes } from 'react-router-dom';

import { mobileSelector, userDataSelector } from "../store";
import AuthPage from '../components/pages/AuthPage';
import ErrorPage from '../components/pages/ErrorPage';
import HomePage from '../components/pages/HomePage';

import TaskPage from "../components/pages/mobile/TaskPage";
import TaskInfoPage from "../components/pages/mobile/TaskInfoPage";
import FilteredContent from "../components/content/components/FilteredContent";


const AppRouter = ({ isAuth = false }) => {
    const mobileScreen =  useMediaQuery({maxWidth: 768});
    const isMobile = useSelector(mobileSelector) || mobileScreen;
    const userData = useSelector(userDataSelector);

    const unAuthorizedRoutes = [
        { path: "/login", element: <AuthPage/> },
        { path: "/register", element: <AuthPage register/> },
        { path: "*", element: <Navigate to="/login"/> }
    ];

    const authorizedRoutes = [
        {
            path: "/",
            element: <HomePage/>
        },
        {
            path: '/tasks/:task_group_id',
            element: isMobile ? <TaskPage/> : <HomePage/>
        },
        {
            path: '/tasks/:task_group_id/:task_id',
            element: isMobile ? <TaskInfoPage/> : <HomePage/>
        },
        {
            path: "/login",
            element: <Navigate to='/'/>
        },
        {
            path: "/register",
            element: <Navigate to='/'/>
        },
        {
            path: '/search',
            element: isMobile ?
                <FilteredContent/> :
                <Navigate to='/error'/>
        },
        {
            path: "/error",
            element: <ErrorPage/>
        },
        {
            path: "*",
            element: <Navigate to="/error"/>
        }
    ];

    return useRoutes(isAuth && userData ? authorizedRoutes : unAuthorizedRoutes);
}

export default AppRouter;