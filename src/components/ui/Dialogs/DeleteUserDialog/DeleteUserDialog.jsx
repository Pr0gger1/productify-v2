import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Button, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle
} from "@mui/material";

import {deleteUser} from "../../../../store/reducers/AuthSlice";
import { ThemedDialog } from '../ThemedDialog';
import { ThemedTextField } from "../../customComponents/CustomInputs";
import './DeleteUserDialog.scss';
import CircularProgress from "@mui/material/CircularProgress";
import {SnackbarContext, snackbarTypes} from "../../../../context/SnackbarContext";

const DeleteUserDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const [passwordInput, setPasswordInput] = useState('');
    const [textFieldError, setTextFieldError] = useState(false);
    const { setMessage, setOpen: setToastOpen, setType } = useContext(SnackbarContext);

    const authStatus = useSelector(state => state.authStates.status);
    const deleteError = useSelector(state => state.authStates.authError);
    const onDeleteAccountSubmit = () => {
        if (passwordInput.length) {
            dispatch(deleteUser(passwordInput));
            setTextFieldError(false);
        }
        else {
            setTextFieldError(true)
        }
    }

    const onCloseDialogClick = () => {
        setOpen(false);
        setPasswordInput('');
    }
    
   useEffect(() => {
       if (textFieldError && passwordInput.length)
           setTextFieldError(false);
   }, [textFieldError, passwordInput]);

    useEffect(() => {
        if (deleteError) {
            setMessage(deleteError.message);
            setType(snackbarTypes.error);
            setToastOpen(true)
        }
    }, [deleteError, setMessage, setToastOpen, setType])

    return (
        <ThemedDialog
            open={open}
            onClose={onCloseDialogClick}
        >
            <DialogTitle>
                Подтверждение удаления аккаунта
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                   <strong>Внимание!</strong> Ваш аккаунт будет безвозвратно удален.
                    Введите пароль, чтобы продолжить
                </DialogContentText>

                <ThemedTextField
                    value={passwordInput}
                    type='password'
                    helperText={textFieldError ? "Пустое поле" : ""}
                    onChange={e => setPasswordInput(e.target.value)}
                    error={textFieldError}
                    variant='standard'
                    label='Пароль'
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
                {
                    authStatus === 'loading' ?
                        <CircularProgress/>
                        :
                    <Button
                        variant='text'
                        color='error'
                        onClick={onDeleteAccountSubmit}
                    >
                        Подтвердить
                    </Button>
                }
            </DialogActions>
        </ThemedDialog>
    );
};

export default DeleteUserDialog;