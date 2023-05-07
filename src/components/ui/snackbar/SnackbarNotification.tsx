import React, {FC, ReactNode, SyntheticEvent} from "react";
import {Alert, AlertColor, Snackbar, SnackbarCloseReason, SnackbarOrigin} from "@mui/material";

interface SnackbarNotificationProps {
    open: boolean,
    children: ReactNode | JSX.Element,
    type: AlertColor,
    position: SnackbarOrigin,
    hideDuration: number,
    onClose: (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void
}

const SnackbarNotification: FC<SnackbarNotificationProps> = ({
         open, onClose, type, hideDuration,
         position, children
}): JSX.Element => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={hideDuration}
            anchorOrigin={{
                vertical: position.vertical,
                horizontal: position.horizontal
            }}
            onClose={onClose}
        >
          <Alert
              // onClose={onClose}
              severity={type}
              sx={{ width: "100%" }}
          >
              {children}
          </Alert>
        </Snackbar>
    );
};

export default SnackbarNotification;