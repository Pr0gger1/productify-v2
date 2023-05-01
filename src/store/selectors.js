export const userDataSelector = state => state.authStates.userData;

// сайдбары
export const leftSidebarSelector = state => state.sidebarStates.isLeftSidebarOpen;
export const rightSidebarSelector = state => state.sidebarStates.isRightSidebarOpen;

// адаптив и тема
export const themeSelector = state => state.themeState.theme;
export const mobileSelector = state => state.mobileStates.isMobile;

// выбранные объекты
export const selectedTaskGroupSelector = state => state.taskGroupStates.selectedTaskGroup;
export const selectedTaskSelector = state => state.taskStates.selectedTask;

// селекторы, связанные с задачами
export const taskGroupsSelector = state => state.taskGroupStates.allTaskGroups;
export const currentGroupTasksSelector = state => state.taskStates.currentGroupTasks;
export const tasksSelector = state => state.taskStates.tasks;

// уведомления
export const notificationSelector = state => state.notificationState.notifications;

// фильтры
export const filterSelector = state => state.filterStates;
