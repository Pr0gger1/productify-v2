import { createSlice } from '@reduxjs/toolkit';
import { FilterStates, TaskFilterType } from 'types/Filter';

function getLocalStorageTaskFilter(): TaskFilterType {
	const filterData: string | null = localStorage.getItem('taskFilter');
	const initialTaskFilter: TaskFilterType = {
		type: 'alphabet',
		desc: true,
	};
	if (filterData) return JSON.parse(filterData);
	else return initialTaskFilter;
}

const initialState: FilterStates = {
	searchFilter: '',
	taskFilter: getLocalStorageTaskFilter(),
};

const filterSlice = createSlice({
	name: 'filterStates',
	initialState,
	reducers: {
		setSearchFilter(state, action) {
			state.searchFilter = action.payload.searchFilter;
		},

		setTaskFilter(state, action) {
			state.taskFilter = action.payload;
			localStorage.setItem('taskFilter', JSON.stringify(action.payload));
		},
	},
});

export const { setSearchFilter, setTaskFilter } = filterSlice.actions;
export default filterSlice.reducer;
