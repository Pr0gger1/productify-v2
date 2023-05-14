import { FC } from "react";
import { SxProps, Theme } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import styles from "./styles/ConfirmationButton.module.scss";

interface ConfirmationButtonProps {
    variant: "ok" | "cancel",
    backgroundColor?: string,
    sx?: SxProps<Theme>,
    onClick?: any
}

const ConfirmationButton: FC<ConfirmationButtonProps> = ({ variant = "ok", backgroundColor="", sx, onClick }) => {
    return (
        <>
        {
            variant === "ok"
            ?
            <CheckRoundedIcon
                style={{backgroundColor}}
                className={
                [styles.confirmation__button, styles.ok].join(" ")
            }
                sx={sx}
                onClick={onClick}
            />
            :
            <CloseRoundedIcon
                style={{backgroundColor}}
                className={
                [styles.confirmation__button, styles.cancel].join(" ")
            }
                sx={sx}
                onClick={onClick}
            />
        }
        </>
    );
};

export default ConfirmationButton;