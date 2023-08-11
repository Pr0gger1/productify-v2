// export * from './selectors';
import {AnyAction, configureStore, ThunkDispatch} from '@reduxjs/toolkit';

import sidebarReducer from './reducers/SidebarSlice';
import themeReducer from './reducers/ThemeSlice';
import mobileReducer from './reducers/MobileSlice';
import authReducer from './reducers/AuthSlice';
import filterReducer from './reducers/FilterSlice';
import taskGroupReducer from './reducers/TaskGroupSlice';
import taskReducer from './reducers/TaskSlice';
import notificationReducer from './reducers/NotificationSlice';
import errorReducer from './reducers/ErrorSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const store = configureStore({
	reducer: {
		mobileStates: mobileReducer,
		themeState: themeReducer,
		sidebarStates: sidebarReducer,

		authStates: authReducer,

		taskGroupStates: taskGroupReducer,

		filterStates: filterReducer,
		taskStates: taskReducer,

		notificationState: notificationReducer,
		errorState: errorReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware({
		serializableCheck: false,
		immutableCheck: false
	})
});

export type RootState = ReturnType<typeof store.getState>
export type TypedDispatch<T> = ThunkDispatch<T, never, AnyAction>

export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
