import React, {ChangeEvent, Dispatch, FC, SetStateAction, useState} from "react";
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
import {useAppDispatch} from "../../../store/store";
import {UpdateUserProfileParams} from "../../../interfaces/slices/UpdateUserProfileParams";

interface EditAvatarDialogProps {
    dialogOpen: boolean,
    setDialogOpen: Dispatch<SetStateAction<boolean>>
}

const EditAvatarDialog: FC<EditAvatarDialogProps> = ({ dialogOpen, setDialogOpen }) => {
    const dispatch = useAppDispatch();
    const [newAvatar, setNewAvatar] = useState<File | null>(null);
    const [uploadButtonText, setUploadButtonText] = useState<string>("Загрузить")

    const onCloseDialogClick = (): void => {
        setDialogOpen(false);
        setNewAvatar(null);
        setUploadButtonText("Загрузить");
    }

    const onChangeAvatarSubmit = (): void => {
        if (newAvatar) {
            const userParams: UpdateUserProfileParams = {avatar: newAvatar};
            dispatch(updateUserProfile(userParams));
            setDialogOpen(false);
        }
    }

    const onChangeFile = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (event.target.files) {
            const file: File = event.target.files[0];
            console.log(URL.createObjectURL(file))
            setNewAvatar(file);
            setUploadButtonText(file.name);

            await StorageService.uploadAvatar(file)
        }
        else setUploadButtonText("Загрузить");
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
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
            }}>
                <DialogContentText style={{color: "#dcdcdc"}}>
                    Выберите изображение для аватара
                </DialogContentText>
                <UploadFileButton
                    style={{alignSelf: "start", justifyContent: "space-evenly"}}
                    onChange={onChangeFile}
                    fileFilter={"image/png, image/jpg, image/jpeg"}
                >
                    {uploadButtonText}
                </UploadFileButton>

                {
                    newAvatar !== null ?
                        <UserDataCard userAvatar={URL.createObjectURL(new Blob([newAvatar], { type: "text/plain" }))}/>
                        :
                        "Здесь будет превью аватара"
                }
            </DialogContent>
            <DialogActions>
                <Button
                    variant="text"
                    onClick={onCloseDialogClick}
                >
                    Отмена
                </Button>
                <Button
                    variant="text"
                    color="error"
                    onClick={onChangeAvatarSubmit}
                >
                    Подтвердить
                </Button>
            </DialogActions>
        </ThemedDialog>
    );
};

export default EditAvatarDialog;