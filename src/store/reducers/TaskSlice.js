import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TaskService } from '../../services/task.service';

export const addTaskAsync = createAsyncThunk(
    'task/add',
    async (taskData, { getState }) => {
        try {
            const { tasks } = getState().taskStates;
            const { uid: userId } = getState().authStates.userData;

            const newTasks = TaskService.addTask(tasks, taskData);

            await TaskService.updateUserTasks(newTasks, userId);
            return newTasks;
        }
        catch (error) { throw error }
    }
);

export const deleteTaskAsync = createAsyncThunk(
    'task/delete',
    async (taskId, { getState }) => {
        try {
            const tasks = getState().taskStates.tasks;
            const userId = getState().authStates.userData.uid

            const newTasks = TaskService.deleteTask(tasks, taskId);
            await TaskService.updateUserTasks(newTasks.tasks, userId);

            return newTasks;
        }
        catch (error) { throw error }
    }
);

export const deleteSubTaskAsync = createAsyncThunk(
    'subtask/delete',
    async ({taskId, subTaskId}, { getState }) => {
        try {
            const { tasks } = getState().taskStates;
            const { uid: userId } = getState().authStates.userData;

            const newTasks = TaskService.deleteSubTask(tasks, taskId, subTaskId);
            await TaskService.updateUserTasks(newTasks.tasks, userId);

            return newTasks;
        }
        catch (error) { throw error }
    }
);

export const updateTaskAsync = createAsyncThunk(
    'task/update',
    async (taskData, { getState }) => {
        try {
            const { tasks } = getState().taskStates;
            const { uid: userId } = getState().authStates.userData;

            const newTasks = TaskService.updateTask(tasks, taskData);
            await TaskService.updateUserTasks(newTasks.tasks, userId);

            return newTasks;
        }
        catch (error) { throw error }
    }
)

export const updateSubTaskAsync = createAsyncThunk(
    'subtask/update',
    async ({taskId, subTaskId, subTaskData}, { getState }) => {
        try {
            let { tasks } = getState().taskStates;
            const { uid: userId } = getState().authStates.userData;

            const newTasks = TaskService.updateSubTask(tasks, taskId, subTaskId, subTaskData)
            await TaskService.updateUserTasks(newTasks.tasks, userId)
            return newTasks;
        }
        catch (error) { throw error }
    }
);

export const getUserTasks = createAsyncThunk(
    'task/get',
    async userId => {
        try {
            return await TaskService.getUserTasks(userId);
        }
        catch (error) { throw error }
    }
)

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        // массив всех задач
        tasks: [],

        // информация о выбранной задаче в контенте
        selectedTask: {},

        // массив задач активной группы
        currentGroupTasks: [],

        loading: false,
        fetchError: null
    },
    reducers: {
        setCurrentGroupTasks(state, action) {
            state.currentGroupTasks = action.payload.tasks;
        },

        setSelectedTask(state, action) {
            state.selectedTask = action.payload.taskData;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.tasks = action.payload;
            })

            .addCase(addTaskAsync.rejected, (state, action) => {
                state.fetchError = action.error;
            })

            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks;
                state.selectedTask = {};
            })

            .addCase(deleteTaskAsync.rejected, (state, action) => {
                console.log(action);
                state.fetchError = action.error;
            })

            .addCase(deleteSubTaskAsync.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks;
                state.selectedTask = action.payload.selectedTask;
            })

            .addCase(deleteSubTaskAsync.rejected, (state, action) => {
                state.fetchError = action.error;
            })

            .addCase(updateTaskAsync.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks;
                state.selectedTask = action.payload.selectedTask;
            })

            .addCase(updateTaskAsync.rejected, (state, action) => {
                // console.log(action);
                state.fetchError = action.error;
            })

            .addCase(updateSubTaskAsync.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks;
                state.selectedTask = action.payload.selectedTask;
            })

            .addCase(updateSubTaskAsync.rejected, (state, action) => {
                state.fetchError = action.error;
            })

            .addCase(getUserTasks.pending, state => {
                state.loading = true;
            })

            .addCase(getUserTasks.fulfilled, (state, action) => {
                if (action.payload && action.payload.taskData) {
                    state.tasks = action.payload.taskData;
                    state.loading = false;
                    // console.log(action);
                }
            })

            .addCase(getUserTasks.rejected, (state, action) => {
                state.fetchError = action.error;
                state.loading = false;
                // console.log(action)
            })
    }
});

export const { setCurrentGroupTasks, setSelectedTask } = taskSlice.actions;

export default taskSlice.reducer;