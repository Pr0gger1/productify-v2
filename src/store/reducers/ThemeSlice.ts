import { createSlice } from '@reduxjs/toolkit';
import { IThemeState, ThemeType } from 'types/slices/SliceStates';

const initialState: IThemeState = {
	theme: (localStorage.getItem('theme') as ThemeType) || 'light',
};

const themeSlice = createSlice({
	name: 'themeState',
	initialState,
	reducers: {
		setTheme(state): void {
			const currentTheme: ThemeType | null = localStorage.getItem(
				'theme',
			) as ThemeType;

			if (currentTheme === 'light') state.theme = 'dark';
			else state.theme = 'light';

			localStorage.setItem('theme', state.theme);
		},
	},
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
