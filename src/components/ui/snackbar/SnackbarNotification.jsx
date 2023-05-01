import React from 'react';
import { Alert, Snackbar } from "@mui/material";

const SnackbarNotification = ({ open, onClose, type, hideDuration, position, children }) => {
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
              onClose={onClose}
              severity={type}
              sx={{ width: '100%' }}
          >
              {children}
          </Alert>
        </Snackbar>
    );
};

export default SnackbarNotification;