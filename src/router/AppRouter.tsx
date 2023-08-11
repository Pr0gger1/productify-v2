import React, {FC, ReactElement} from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from 'store';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { User } from 'firebase/auth';

import { mobileSelector, userDataSelector } from 'store/selectors';
import AuthPage from 'components/sections/pages/AuthPage';
import ErrorPage from 'components/sections/pages/ErrorPage';
import HomePage from 'components/sections/pages/HomePage';

import TaskPage from 'components/sections/pages/mobile/TaskPage';
import TaskInfoPage from 'components/sections/pages/mobile/TaskInfoPage';
import FilteredContent from 'components/sections/content/FilteredContent';

interface AppRouterProps { isAuth: boolean }

const AppRouter: FC<AppRouterProps> = ({ isAuth = false }): ReactElement | null => {
	const mobileScreen: boolean =  useMediaQuery({maxWidth: 768});
	const isMobile: boolean = useAppSelector(mobileSelector) || mobileScreen;
	const userData: User | null = useAppSelector(userDataSelector);

	const unAuthorizedRoutes: RouteObject[] = [
		{ path: '/login', element: <AuthPage/> },
		{ path: '/register', element: <AuthPage register/> },
		{ path: '*', element: <Navigate to="/login"/> }
	];

	const authorizedRoutes: RouteObject[] = [
		{
			path: '/',
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
			path: '/login',
			element: <Navigate to="/"/>
		},
		{
			path: '/register',
			element: <Navigate to="/"/>
		},
		{
			path: '/search',
			element: isMobile ?
				<FilteredContent/> :
				<Navigate to="/error"/>
		},
		{
			path: '*',
			element: <ErrorPage/>,
		}
	];

	return useRoutes(isAuth && userData ? authorizedRoutes : unAuthorizedRoutes);
};

export default AppRouter;