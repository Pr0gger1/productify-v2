import React, { useState } from 'react';
import { SnackbarContext, snackbarPosition, snackbarTypes } from "../context/SnackbarContext";
import SnackbarNotification from "../components/ui/snackbar/SnackbarNotification";


const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [hideDuration, setHideDuration] = useState(5000);
    const [type, setType] = useState(snackbarTypes.success);
    const [message, setMessage] = useState('');
    const [position, setPosition] = useState({
        vertical: snackbarPosition.top,
        horizontal: snackbarPosition.center
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setOpen(false);
    }

    return (
        <SnackbarContext.Provider
            value={{
                open, setOpen,
                hideDuration,
                setHideDuration,
                type, setType,
                message, setMessage,
                position, setPosition
            }}
        >
            <SnackbarNotification
                open={open}
                hideDuration={hideDuration}
                type={type}
                onClose={handleClose}
                position={position}
            >
                {message}
            </SnackbarNotification>
            {children}

        </SnackbarContext.Provider>
    );
};

export default SnackbarProvider;