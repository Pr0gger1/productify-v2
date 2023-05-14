import {IUserDataObject} from "../User";
import {SerializedError} from "@reduxjs/toolkit";
import {ITask, ITaskGroup, ITaskGroups} from "../TaskData";

interface IAuthStates extends IUserDataObject{
    authError: SerializedError | null,
    status: string | undefined
}

interface ITaskStates {
    tasks: ITask[],
    selectedTask: ITask | null,
    currentGroupTasks: ITask[],
    loading: boolean,
    fetchError: SerializedError | null
}

interface ITaskGroupStates {
    selectedTaskGroup: ITaskGroup,
    allTaskGroups: ITaskGroups,
    loading: boolean
}

interface ISidebarStates {
    isLeftSidebarOpened: boolean,
    isRightSidebarOpened: boolean
}

export type ThemeType = "light" | "dark";

interface IThemeState {
    theme: ThemeType
}

export type {
    IAuthStates, ITaskStates,
    ITaskGroupStates, ISidebarStates,
    IThemeState
}