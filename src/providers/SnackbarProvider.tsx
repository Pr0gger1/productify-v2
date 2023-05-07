import React, {SyntheticEvent, useState} from "react";
import {
    ISnackbarContext,
    SnackbarContext,
} from "../context/SnackbarContext";
import SnackbarNotification from "../components/ui/snackbar/SnackbarNotification";
import {Children} from "../interfaces/Children";
import {AlertColor, SnackbarCloseReason, SnackbarOrigin} from "@mui/material";

const SnackbarProvider: React.FC<Children> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [hideDuration, setHideDuration] = useState<number>(5000);
    const [type, setType] = useState<AlertColor>("success");
    const [message, setMessage] = useState<string>("");
    const [position, setPosition] = useState<SnackbarOrigin>({
        vertical: "top",
        horizontal: "center"
    });

    const handleClose = (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason): void => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const contextValue: ISnackbarContext = {
        hideDuration, setHideDuration,
        position, setPosition,
        message, setMessage,
        open, setOpen,
        type, setType,
    };

    return (
        <SnackbarContext.Provider value={contextValue}>
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
