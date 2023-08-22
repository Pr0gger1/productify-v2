import { createSlice } from '@reduxjs/toolkit';

function getLeftSidebarOpen(): boolean {
	const leftSidebar: string | null = localStorage.getItem('LSidebarOpened');
	return leftSidebar ? JSON.parse(leftSidebar) : true;
}

export const sidebarSlice = createSlice({
	name: 'sidebarStates',
	initialState: {
		isLeftSidebarOpen: getLeftSidebarOpen(),
		isRightSidebarOpen: false,
	},
	reducers: {
		setLSidebarOpen(state): void {
			state.isLeftSidebarOpen = !state.isLeftSidebarOpen;
			localStorage.setItem(
				'LSidebarOpened',
				JSON.stringify(state.isLeftSidebarOpen),
			);
		},

		setRSidebarOpen(state): void {
			state.isRightSidebarOpen = !state.isRightSidebarOpen;
		},
	},
});

export const { setLSidebarOpen, setRSidebarOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
