import React, {useEffect, useState} from 'react';
import { ThemedDialog } from "./ThemedDialog";
import {
    Button, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { userDataSelector } from "../../../store";
import { ThemedTextField } from "../customComponents/CustomInputs";
import { updateUserProfile } from "../../../store/reducers/AuthSlice";

const EditUsernameDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const currentUsername = useSelector(userDataSelector).displayName;

    const [newUsername, setNewUsername] = useState(currentUsername || '');
    const [textFieldError, setTextFieldError] = useState(false);

    const onCloseDialogClick = () => {
        setOpen(false);
        setNewUsername('');
    }

    const onChangeUsernameSubmit = () => {
        dispatch(updateUserProfile({username: newUsername}));
        setOpen(false);
    }

    useEffect(() => {
       if (textFieldError && newUsername.length)
           setTextFieldError(false);
   }, [textFieldError, newUsername]);

    return (
        <ThemedDialog
            open={open}
            onClose={onCloseDialogClick}
        >
            <DialogTitle>
                Изменение имени пользователя
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Введите новое имя пользователя
                </DialogContentText>

                <ThemedTextField
                    value={newUsername}
                    helperText={textFieldError ? "Пустое поле" : ""}
                    onChange={e => setNewUsername(e.target.value)}
                    error={textFieldError}
                    variant='standard'
                    label='Имя пользователя'
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant='text'
                    onClick={onCloseDialogClick}
                >
                    Отмена
                </Button>
                <Button
                    variant='text'
                    color='error'
                    onClick={onChangeUsernameSubmit}
                >
                    Подтвердить
                </Button>
            </DialogActions>
        </ThemedDialog>
    );
};

export default EditUsernameDialog;