import { createSlice } from '@reduxjs/toolkit';

const mobileSlice = createSlice({
	name: 'mobileStates',
	initialState: {
		isMobile: /Mobi/i.test(navigator.userAgent)
	},
	reducers: {
		setIsMobile(state, action) {
			state.isMobile = action.payload;
		}
	}
});

export const { setIsMobile } = mobileSlice.actions;
export default mobileSlice.reducer;