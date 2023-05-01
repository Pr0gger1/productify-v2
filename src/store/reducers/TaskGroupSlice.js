import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TaskGroupService } from "../../services/taskGroup.service";

import { deleteTaskAsync } from "./TaskSlice";
import { initialGroup } from "../defaultData/baseGroups";
import defaultGroups from '../defaultData/baseGroups';


export const createCustomTaskGroup = createAsyncThunk(
    'taskGroup/add',
    async (groupName, { getState }) => {
        try {
            const { custom: customGroups } = getState()
                .taskGroupStates.allTaskGroups;

            const { uid: userId } = getState().authStates.userData;
            const newGroups = TaskGroupService.createCustomGroup(
                customGroups, groupName
            );

            await TaskGroupService.updateTaskGroups(newGroups, userId);
            return newGroups;
        }
        catch (error) { throw error }
    }
);

export const getCustomTaskGroups = createAsyncThunk(
    'taskGroup/get',
    async (userId) => {
        try {
            return await TaskGroupService.getTaskGroups(userId);
        }
        catch (error) { throw error }
    }
)
export const deleteCustomTaskGroupAsync = createAsyncThunk(
     'taskGroup/delete',
    async (groupId, { getState, dispatch }) => {
         try {
            const { uid: userId } = getState()
                .authStates.userData;

            const { tasks } = getState().taskStates;

            const { custom: taskGroups }  = getState()
                .taskGroupStates.allTaskGroups;

            const newTaskGroups = TaskGroupService
                .deleteTaskGroup(taskGroups, groupId);

            await TaskGroupService
                .updateTaskGroups(newTaskGroups.taskGroups, userId);

            tasks.forEach(task => {
                if (task.groupId === groupId)
                    dispatch(deleteTaskAsync(task.id));
            })
            return newTaskGroups;
         }
         catch (error) { throw error }
    }
);

export const renameCustomTaskGroupAsync = createAsyncThunk(
     'taskGroup/rename',
    async (groupData, { getState }) => {
         try {
            const { uid: userId } = getState().authStates.userData;
            const { custom: taskGroups } = getState()
                .taskGroupStates.allTaskGroups;

            const newTaskGroups = TaskGroupService.editTaskGroup(
                taskGroups,
                groupData
            );

            await TaskGroupService
                .updateTaskGroups(newTaskGroups.taskGroups, userId);
            return newTaskGroups;
         }
         catch (error) { throw error }
    }
);

const taskGroupSlice = createSlice({
    name: 'taskGroupsStates',
    initialState: {
        selectedTaskGroup: JSON.parse(
                localStorage.getItem('selectedTaskGroup')
            ) || initialGroup,

        allTaskGroups: {
            base: defaultGroups,
            custom: []
        },

        loading: false
    },
    reducers: {
        setSelectedGroup(state, action) {
            state.selectedTaskGroup = action.payload.group;
            localStorage.setItem('selectedTaskGroup', JSON.stringify(action.payload.group));
        }
    },

    extraReducers: builder => {
        builder
            .addCase(createCustomTaskGroup.fulfilled, (state, action) => {
                state.allTaskGroups.custom = action.payload;
            })

            .addCase(createCustomTaskGroup.rejected, (state, action) => {
                console.log(action)
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

             .addCase(deleteCustomTaskGroupAsync.fulfilled, (state, action) => {
                state.allTaskGroups.custom = action.payload.taskGroups;
                state.selectedTaskGroup = action.payload.selectedTaskGroup;

            })

            .addCase(deleteCustomTaskGroupAsync.rejected, (state, action) => {
                console.log(action)
            })

            .addCase(renameCustomTaskGroupAsync.fulfilled, (state, action) => {
                console.log(action);
                state.allTaskGroups.custom = action.payload.taskGroups;
                state.selectedTaskGroup = action.payload.selectedTaskGroup;
            })

            .addCase(renameCustomTaskGroupAsync.rejected, (state, action) => {
                console.log(action)
            })
    }
});

export const { setSelectedGroup } = taskGroupSlice.actions;
export default taskGroupSlice.reducer;