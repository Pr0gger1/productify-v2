import { createContext } from 'react';
import { AlertColor, SnackbarOrigin } from '@mui/material';

export interface ISnackbarContext {
	setToast: (options: IToastOptions) => void;
}

export interface IToastOptions {
	position?: SnackbarOrigin;
	message: string;
	hideDuration?: number;
	type?: AlertColor;
}

export const SnackbarContext = createContext<ISnackbarContext>({
	setToast: () => {},
});
