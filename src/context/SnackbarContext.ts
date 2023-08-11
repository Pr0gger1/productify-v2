import { Context, createContext, Dispatch, SetStateAction } from 'react';
import {AlertColor, SnackbarOrigin} from '@mui/material';

export interface ISnackbarContext {
  open: boolean;
  hideDuration: number;
  message: string;
  type: AlertColor;
  position: SnackbarOrigin;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setHideDuration: Dispatch<SetStateAction<number>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setPosition: Dispatch<SetStateAction<SnackbarOrigin>>;
  setType: Dispatch<SetStateAction<AlertColor>>;
}

export const SnackbarContext: Context<ISnackbarContext> =
  createContext<ISnackbarContext>({
  	open: false,
  	setOpen: (): void => {},

  	hideDuration: 5000,
  	setHideDuration: (): void => {},

  	type: 'success',
  	setType: (): void => {},

  	message: '',
  	setMessage: (): void => {},

  	position: {
  		horizontal: 'center',
  		vertical: 'top',
  	},
  	setPosition: (): void => {},
  });
