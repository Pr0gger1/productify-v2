import { RootState } from "./store";

export const userDataSelector = (state: RootState) => state.authStates.userData;

// сайдбары
export const leftSidebarSelector = (state: RootState) => state.sidebarStates.isLeftSidebarOpen;
export const rightSidebarSelector = (state: RootState) => state.sidebarStates.isRightSidebarOpen;

// адаптив и тема
export const themeSelector = (state: RootState) => state.themeState.theme;
export const mobileSelector = (state: RootState) => state.mobileStates.isMobile;

// выбранные объекты
export const selectedTaskGroupSelector = (state: RootState) => state.taskGroupStates.selectedTaskGroup;
export const selectedTaskSelector = (state: RootState) => state.taskStates.selectedTask;

// селекторы, связанные с задачами
export const taskGroupsSelector = (state: RootState) => state.taskGroupStates.allTaskGroups;
export const currentGroupTasksSelector = (state: RootState) => state.taskStates.currentGroupTasks;
export const tasksSelector = (state: RootState) => state.taskStates.tasks;

// уведомления
export const notificationSelector = (state: RootState) => state.notificationState.notifications;

// фильтры
export const filterSelector = (state: RootState) => state.filterStates;
