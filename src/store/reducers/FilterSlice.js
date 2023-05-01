import { createSlice } from '@reduxjs/toolkit';

const initialTaskFilter = {
    type: 'alphabet',
    desc: true
}

const filterSlice = createSlice({
    name: 'filterStates',
    initialState: {
        searchFilter: '',
        taskFilter: JSON.parse(localStorage.getItem('taskFilter')) || initialTaskFilter
    },
    reducers: {
        setSearchFilter(state, action) {
            state.searchFilter = action.payload.searchFilter;
        },

        setTaskFilter(state, action) {
            state.taskFilter = action.payload;
            localStorage.setItem('taskFilter', JSON.stringify(action.payload));
        }
    }
});

export const { setSearchFilter, setTaskFilter } = filterSlice.actions;
export default filterSlice.reducer;