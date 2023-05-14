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

    const onChangeAvatarSubmit = async (): Promise<void> => {
        if (newAvatar) {
            const userParams: UpdateUserProfileParams = {avatar: newAvatar};
            await StorageService.uploadAvatar(newAvatar)
            dispatch(updateUserProfile(userParams));
            setDialogOpen(false);
        }
    }

    const onChangeFile = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.currentTarget.files) {
            const file: File = event.currentTarget.files[0];
            setNewAvatar(file);

            let filename: string = file.name;
            if (filename.length > 20)
                filename = filename.substring(0, 20) + "...";

            setUploadButtonText(filename);
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