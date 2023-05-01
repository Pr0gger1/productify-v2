import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {
    Button, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";

import { ThemedDialog } from "./ThemedDialog";
import { updateUserProfile } from "../../../store/reducers/AuthSlice";
import StorageService from "../../../services/storage.service";
import UploadFileButton from "../button/UploadFileButton";
import UserDataCard from "../cards/UserDataCard";

const EditAvatarDialog = ({ dialogOpen, setDialogOpen }) => {
    const dispatch = useDispatch();
    const [newAvatar, setNewAvatar] = useState(null);
    const [uploadButtonText, setUploadButtonText] = useState('Загрузить')

    const onCloseDialogClick = () => {
        setDialogOpen(false);
        setNewAvatar(null);
        setUploadButtonText('Загрузить');
    }

    const onChangeAvatarSubmit = () => {
        if (newAvatar) {
            dispatch(updateUserProfile({
                username: null,
                avatar: newAvatar
            }));

            setDialogOpen(false);
        }
    }

    const onChangeFile = async event => {
        if (event.target.files) {
            const file = event.target.files[0];
            console.log(URL.createObjectURL(file))
            setNewAvatar(file);
            setUploadButtonText(file.name);

            await StorageService.uploadAvatar(file)
        }
        else setUploadButtonText('Загрузить');
    }

    return (
        <ThemedDialog
            open={dialogOpen}
            onClose={onCloseDialogClick}
        >
            <DialogTitle>
                Изменение аватара пользователя
            </DialogTitle>
            <DialogContent sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <DialogContentText style={{color: '#dcdcdc'}}>
                    Выберите изображение для аватара
                </DialogContentText>
                <UploadFileButton
                    styles={{alignSelf: 'start', justifyContent: 'space-evenly'}}
                    onChange={onChangeFile}
                    fileFilter={'image/png, image/jpg, image/jpeg'}
                >
                    {uploadButtonText}
                </UploadFileButton>

                {
                    newAvatar !== null ?
                        <UserDataCard userAvatar={URL.createObjectURL(newAvatar)}/>
                        :
                        "Здесь будет превью аватара"
                }
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
                    onClick={onChangeAvatarSubmit}
                >
                    Подтвердить
                </Button>
            </DialogActions>
        </ThemedDialog>
    );
};

export default EditAvatarDialog;