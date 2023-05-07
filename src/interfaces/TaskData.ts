
interface ISubTask {
    taskName: string,
    completed: boolean,
    id: string,
    createdAt: number
}

interface ITask {
    category: string,
    completed: boolean,
    favorite: boolean,
    createdAt: number,
    deadline: number | null,
    reminder: number | null,
    repeat: string | null,
    taskName: string,
    userId: string,
    groupId: string,
    id: string,
    notes: string,
    isDeadlineNotified?: boolean,
    isRemindNotified?: boolean,
    subTasks: ISubTask[]
}


interface ITaskGroup {
    title: string,
    icon: string,
    counter: number,
    id: string,
    pageTitle: string,
    webTitle: string
}

interface ITaskGroups {
    base: ITaskGroup[],
    custom: ITaskGroup[]
}

interface IUserTaskData {
    taskData: ITask[] | null,
    taskGroups: ITaskGroup[] | null
}

export type {
    ITask, ISubTask, IUserTaskData,
    ITaskGroup, ITaskGroups
}