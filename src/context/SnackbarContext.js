import { createContext } from "react";

export const snackbarTypes = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info'
}

export const snackbarPosition = {
    left: 'left',
    right: 'right',
    center: 'center',
    top: 'top',
    bottom: 'bottom'
}

export const SnackbarContext = createContext({
    open: false,
    setOpen: () => {},

    hideDuration: 5000,
    setHideDuration: () => {},

    type: snackbarTypes.success,
    setType: () => {},

    message: '',
    setMessage: () => {},

    position: {
        horizontal: snackbarPosition.center,
        vertical: snackbarPosition.top
    },
    setPosition: () => {},

    // handleClose: () => {}
});