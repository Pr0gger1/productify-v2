import {AsyncThunk, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskService, TasksWithSelected} from "../../services/task.service";
import {UpdateSubTaskParams} from "../../interfaces/slices/UpdateSubTaskParams";
import {RootState} from "../store";
import {ITask, IUserTaskData} from "../../interfaces/TaskData";
import {ITaskStates} from "../../interfaces/slices/SliceStates";
import {DeleteSubTaskParams} from "../../interfaces/slices/DeleteSubTaskParams";

export const addTaskAsync = createAsyncThunk<ITask[], ITask>(
    "task/add",
    async (taskData: ITask, { getState }) => {
        try {
            const state = getState() as RootState;
            const { tasks } = state.taskStates;
            const userId: string = state.authStates.userData?.uid!;

            const newTasks: ITask[] = TaskService.addTask(tasks, taskData);

            await TaskService.updateUserTasks(newTasks, userId);
            return newTasks;
        }
        catch (error) { throw error }
    }
);

export const deleteTaskAsync = createAsyncThunk(
    "task/delete",
    async (taskId: string, { getState }) => {
        try {
            const state = getState() as RootState;
            const tasks: ITask[] = state.taskStates.tasks;
            const userId: string = state.authStates.userData?.uid!;

            const newTasks: ITask[] = TaskService.deleteTask(tasks, taskId);
            await TaskService.updateUserTasks(newTasks, userId);

            return newTasks;
        }
        catch (error) { throw error }
    }
);

export const deleteSubTaskAsync = createAsyncThunk(
    "subtask/delete",
    async (params: DeleteSubTaskParams, { getState }) => {
        try {
            const state = getState() as RootState;
            const { tasks } = state.taskStates;
            const userId: string = state.authStates.userData?.uid!;

            const newTasks = TaskService.deleteSubTask(tasks, params.taskId, params.subTaskId);
            await TaskService.updateUserTasks(newTasks.tasks, userId);

            return newTasks;
        }
        catch (error) { throw error }
    }
);

export const updateTaskAsync: AsyncThunk<TasksWithSelected, ITask, any> = createAsyncThunk<TasksWithSelected, ITask>(
    "task/update",
    async (taskData: ITask, { getState }) => {
        try {
            const state = getState() as RootState;
            const { tasks } = state.taskStates;
            const userId: string = state.authStates.userData?.uid!;

            const newTasks: TasksWithSelected = TaskService.updateTask(tasks, taskData);
            await TaskService.updateUserTasks(newTasks.tasks, userId);

            return newTasks;
        }
        catch (error: any) { throw error }
    }
)

export const updateSubTaskAsync = createAsyncThunk(
    "subtask/update",
    async (params: UpdateSubTaskParams, { getState }) => {
        try {
            const state = getState() as RootState;
            const { tasks } = state.taskStates;
            const userId = state.authStates.userData?.uid!;

            const newTasks = TaskService.updateSubTask(
                tasks, params.taskId, params.subTaskId, params.subTaskData
            );
            await TaskService.updateUserTasks(newTasks.tasks, userId)
            return newTasks;
        }
        catch (error) { throw error }
    }
);

export const getUserTasks = createAsyncThunk(
    "task/get",
    async (userId: string): Promise<IUserTaskData> => {
        try {
            return await TaskService.getUserTasks(userId);
        }
        catch (error) { throw error }
    }
)
const initialState: ITaskStates = {
    tasks: [],
    selectedTask: null,
    currentGroupTasks: [],
    loading: false,
    fetchError: null
}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setCurrentGroupTasks(state, action: PayloadAction<ITask[]>) {
            state.currentGroupTasks = action.payload;
        },

        setSelectedTask(state, action: PayloadAction<ITask | null>) {
            state.selectedTask = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(addTaskAsync.fulfilled, (state , action: PayloadAction<ITask[]>): void => {
                state.tasks = action.payload;
            })

            .addCase(addTaskAsync.rejected, (state, action): void => {
                state.fetchError = action.error;
            })

            .addCase(deleteTaskAsync.fulfilled, (state, action: PayloadAction<ITask[]>): void => {
                state.tasks = action.payload;
                state.selectedTask = null;
            })

            .addCase(deleteTaskAsync.rejected, (state, action): void => {
                console.log(action);
                state.fetchError = action.error;
            })

            .addCase(deleteSubTaskAsync.fulfilled, (state, action: PayloadAction<TasksWithSelected>): void => {
                state.tasks = action.payload.tasks;
                state.selectedTask = action.payload.selectedTask;
            })

            .addCase(deleteSubTaskAsync.rejected, (state, action): void => {
                state.fetchError = action.error;
            })

            .addCase(updateTaskAsync.fulfilled, (state, action: PayloadAction<TasksWithSelected>): void => {
                state.tasks = action.payload.tasks;
                state.selectedTask = action.payload.selectedTask;
            })

            .addCase(updateTaskAsync.rejected, (state, action): void => {
                if ('error' in action && action.error)
                    state.fetchError = action.error;
            })

            .addCase(updateSubTaskAsync.fulfilled, (state, action: PayloadAction<TasksWithSelected>): void => {
                state.tasks = action.payload.tasks;
                state.selectedTask = action.payload.selectedTask;
            })

            .addCase(updateSubTaskAsync.rejected, (state, action): void => {
                state.fetchError = action.error;
            })

            .addCase(getUserTasks.pending, state => {
                state.loading = true;
            })

            .addCase(getUserTasks.fulfilled, (state, action: PayloadAction<IUserTaskData>): void => {
                if (action.payload.taskData) {
                    state.tasks = action.payload.taskData;
                    state.loading = false;
                    // console.log(action);
                }
            })

            .addCase(getUserTasks.rejected, (state, action): void => {
                state.fetchError = action.error;
                state.loading = false;
                // console.log(action)
            })
    }
});

export const { setCurrentGroupTasks, setSelectedTask } = taskSlice.actions;

export default taskSlice.reducer;