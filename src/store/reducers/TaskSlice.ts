import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from 'store';

import {TaskService, TasksWithSelected} from 'services/task.service';

import {UpdateSubTaskParams} from 'types/slices/UpdateSubTaskParams';
import {ITask, IUserTaskData} from 'types/TaskData';
import {ITaskStates} from 'types/slices/SliceStates';
import {DeleteSubTaskParams} from 'types/slices/DeleteSubTaskParams';

interface ITasksWithUser {
    tasks: ITask[],
    userId: string
}


export const addTaskAsync = createAsyncThunk<ITasksWithUser, ITask>(
	'task/add',
	async (taskData: ITask, { getState }) => {
		const state = getState() as RootState;
		const { tasks } = state.taskStates;
		const userId: string = state.authStates.userData?.uid as string | '';

		const newTasks: ITask[] = TaskService.addTask(tasks, taskData);
		return { tasks: newTasks, userId };
	}
);

export const deleteTaskAsync = createAsyncThunk<ITasksWithUser, string>(
	'task/delete',
	async (taskId: string, { getState }) => {
		const state = getState() as RootState;
		const tasks: ITask[] = state.taskStates.tasks;
		const userId: string = state.authStates.userData?.uid as string | '';

		const newTasks: ITask[] = TaskService.deleteTask(tasks, taskId);
		return {tasks: newTasks, userId};
	}
);

export const deleteSubTaskAsync = createAsyncThunk<{tasks: TasksWithSelected, userId: string}, DeleteSubTaskParams>(
	'subtask/delete',
	async (params: DeleteSubTaskParams, { getState }) => {
		const state = getState() as RootState;
		const { tasks } = state.taskStates;
		const userId: string = state.authStates.userData?.uid as string | '';

		const newTasks: TasksWithSelected = TaskService.deleteSubTask(tasks, params.taskId, params.subTaskId);
		return {tasks: newTasks, userId};
	}
);

export const updateTaskAsync = createAsyncThunk<{tasks: TasksWithSelected, userId: string}, ITask>(
	'task/update',
	async (taskData: ITask, { getState }) => {
		const state = getState() as RootState;
		const { tasks } = state.taskStates;
		const userId = state.authStates.userData?.uid as string | '';

		const newTasks: TasksWithSelected = TaskService.updateTask(tasks, taskData);
		return {tasks: newTasks, userId};
	}
);

export const updateSubTaskAsync = createAsyncThunk<{tasks: TasksWithSelected, userId: string}, UpdateSubTaskParams>(
	'subtask/update',
	async (params: UpdateSubTaskParams, { getState }) => {
		const state = getState() as RootState;
		const { tasks } = state.taskStates;
		const userId = state.authStates.userData?.uid as string | '';

		const newTasks = TaskService.updateSubTask(
			tasks, params.taskId, params.subTaskId, params.subTaskData
		);

		return {tasks: newTasks, userId};
	}
);

export const getUserTasks = createAsyncThunk(
	'task/get',
	async (userId: string): Promise<IUserTaskData> => {
		return TaskService.getUserTasks(userId)
			.then(res => res)
			.catch(error => error);
	}
);
const initialState: ITaskStates = {
	tasks: [],
	selectedTask: null,
	currentGroupTasks: [],
	loading: false,
	fetchError: null
};

const taskSlice = createSlice({
	name: 'tasks',
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
			.addCase(addTaskAsync.fulfilled,  (state , action: PayloadAction<ITasksWithUser>): void => {
				const oldTaskState = state.tasks;
				state.tasks = action.payload.tasks;

				TaskService.updateUserTasks(state.tasks, action.payload.userId)
					.catch(error => {
						console.log(error);
						state.tasks = oldTaskState;
					});
			})
			.addCase(addTaskAsync.rejected, (state, action): void => {
				state.fetchError = action.error;
			})

			.addCase(deleteTaskAsync.fulfilled, (state, action: PayloadAction<ITasksWithUser>): void => {
				const oldSelectedTaskState = state.selectedTask;
				const oldTaskState = state.tasks;

				state.tasks = action.payload.tasks;
				state.selectedTask = null;

				TaskService.updateUserTasks(state.tasks, action.payload.userId)
					.catch(error => {
						console.log(error);
						state.selectedTask = oldSelectedTaskState;
						state.tasks = oldTaskState;
					});
			})

			.addCase(deleteTaskAsync.rejected, (state, action): void => {
				console.log(action);
				state.fetchError = action.error;
			})

			.addCase(deleteSubTaskAsync.fulfilled, (state, action: PayloadAction<{tasks: TasksWithSelected, userId: string}>): void => {
				const oldTaskState = state.tasks;
				const oldSelectedTaskState = state.selectedTask;

				state.tasks = action.payload.tasks.tasks;
				state.selectedTask = action.payload.tasks.selectedTask;

				TaskService.updateUserTasks(state.tasks, action.payload.userId)
					.catch(error => {
						console.log(error);
						state.tasks = oldTaskState;
						state.selectedTask = oldSelectedTaskState;
					});
			})

			.addCase(deleteSubTaskAsync.rejected, (state, action): void => {
				state.fetchError = action.error;
			})

			.addCase(updateTaskAsync.fulfilled, (state, action: PayloadAction<{tasks: TasksWithSelected, userId: string}>): void => {
				const oldTaskState = state.tasks;
				const oldSelectedTask = state.selectedTask;

				state.tasks = action.payload.tasks.tasks;
				state.selectedTask = action.payload.tasks.selectedTask;

				TaskService.updateUserTasks(state.tasks, action.payload.userId)
					.catch(error => {
						console.log(error);
						state.tasks = oldTaskState;
						state.selectedTask = oldSelectedTask;
					});
			})

			.addCase(updateTaskAsync.rejected, (state, action): void => {
				if ('error' in action && action.error)
					state.fetchError = action.error;
			})

			.addCase(updateSubTaskAsync.fulfilled, (state, action: PayloadAction<{tasks: TasksWithSelected, userId: string}>): void => {
				const oldTaskState = state.tasks;
				const oldSelectedTaskState = state.selectedTask;

				state.tasks = action.payload.tasks.tasks;
				state.selectedTask = action.payload.tasks.selectedTask;

				TaskService.updateUserTasks(state.tasks, action.payload.userId)
					.catch(error => {
						console.log(error);
						state.tasks = oldTaskState;
						state.selectedTask = oldSelectedTaskState;
					});

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
			});
	}
});

export const { setCurrentGroupTasks, setSelectedTask } = taskSlice.actions;

export default taskSlice.reducer;