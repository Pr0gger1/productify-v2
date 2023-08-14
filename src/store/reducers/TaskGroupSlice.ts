import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {TaskGroupService, TaskGroupsWithSelected} from 'services/taskGroup.service';

import { deleteTaskAsync } from './TaskSlice';
import { initialGroup } from 'store/defaultData/baseGroups';
import defaultGroups from 'store/defaultData/baseGroups';
import {RootState} from 'store';
import {ITask, ITaskGroup} from 'types/TaskData';
import {DocumentData} from 'firebase/firestore';
import {ITaskGroupStates} from 'types/slices/SliceStates';


export const createCustomTaskGroup = createAsyncThunk<ITaskGroup[], string>(
	'taskGroup/add',
	async (groupName: string, { getState }) => {
		const state = getState() as RootState;
		const { custom: customGroups } = state.taskGroupStates.allTaskGroups;

		const userId = state.authStates.userData?.uid;
		const newGroups: ITaskGroup[] = TaskGroupService.createCustomGroup(
			customGroups, groupName
		);

		await TaskGroupService.updateTaskGroups(newGroups, userId!);
		return newGroups;
	}
);

export const getCustomTaskGroups = createAsyncThunk<DocumentData, string>(
	'taskGroup/get',
	async (userId: string) => {
		return TaskGroupService.getTaskGroups(userId)
			.then(res => res)
			.catch(error => { throw error; });
	}
);
export const deleteCustomTaskGroupAsync = createAsyncThunk(
	'taskGroup/delete',
	async (groupId: string, { getState, dispatch }) => {
		const state = getState() as RootState;
		const userId = state.authStates.userData?.uid;

		const { tasks } = state.taskStates;

		const { custom: taskGroups }  = state.taskGroupStates.allTaskGroups;

		const newTaskGroups = TaskGroupService
			.deleteTaskGroup(taskGroups, groupId);

		await TaskGroupService
			.updateTaskGroups(newTaskGroups.taskGroups, userId!);

		tasks.forEach((task: ITask) => {
			if (task.groupId === groupId)
				dispatch(deleteTaskAsync(task.id));
		});
		return newTaskGroups;
	}
);

export const renameCustomTaskGroupAsync = createAsyncThunk(
	'taskGroup/rename',
	async (groupData: ITaskGroup, { getState }) => {
		const state = getState() as RootState;
		const userId: string | undefined = state.authStates.userData?.uid;
		const { custom: taskGroups } = state.taskGroupStates.allTaskGroups;

		const newTaskGroups: TaskGroupsWithSelected = TaskGroupService
			.editTaskGroup(taskGroups, groupData);

		await TaskGroupService
			.updateTaskGroups(newTaskGroups.taskGroups, userId!);
		return newTaskGroups;
	}
);

function getSelectedTaskGroup(): ITaskGroup {
	const selectedTaskGroup: string | null = localStorage.getItem('selectedTaskGroup');

	return selectedTaskGroup ? JSON.parse(selectedTaskGroup) : initialGroup;
}

const initialState: ITaskGroupStates = {
	selectedTaskGroup: getSelectedTaskGroup(),
	allTaskGroups: {
		base: defaultGroups,
		custom: []
	},
	loading: false
};

const taskGroupSlice = createSlice({
	name: 'taskGroupsStates',
	initialState,
	reducers: {
		setSelectedGroup(state, action: PayloadAction<ITaskGroup>) {
			state.selectedTaskGroup = action.payload;
			localStorage.setItem('selectedTaskGroup', JSON.stringify(action.payload));
		}
	},

	extraReducers: builder => {
		builder
			.addCase(createCustomTaskGroup.fulfilled, (state, action: PayloadAction<ITaskGroup[]>) => {
				state.allTaskGroups.custom = action.payload;
			})

			.addCase(createCustomTaskGroup.rejected, (state, action) => {
				console.log(action);
			})

			.addCase(getCustomTaskGroups.pending, state => {
				state.loading = true;
			})

			.addCase(getCustomTaskGroups.fulfilled, (state, action) => {
				if (action.payload && action.payload.taskGroups) {
					state.allTaskGroups.custom = action.payload.taskGroups;
					state.loading = false;
				}
			})

			.addCase(getCustomTaskGroups.rejected, (state, action) => {
				console.log(action);
			})

			.addCase(deleteCustomTaskGroupAsync.fulfilled, (state, action: PayloadAction<TaskGroupsWithSelected>) => {
				state.allTaskGroups.custom = action.payload.taskGroups;
				if (action.payload.selectedTaskGroup)
					state.selectedTaskGroup = action.payload.selectedTaskGroup;
				// else state.selectedTaskGroup = null;

			})

			.addCase(deleteCustomTaskGroupAsync.rejected, (state, action) => {
				console.log(action);
			})

			.addCase(renameCustomTaskGroupAsync.fulfilled, (state, action) => {
				console.log(action);
				state.allTaskGroups.custom = action.payload.taskGroups;
				state.selectedTaskGroup = action.payload.selectedTaskGroup;
			})

			.addCase(renameCustomTaskGroupAsync.rejected, (state, action) => {
				console.log(action);
			});
	}
});

export const { setSelectedGroup } = taskGroupSlice.actions;
export default taskGroupSlice.reducer;