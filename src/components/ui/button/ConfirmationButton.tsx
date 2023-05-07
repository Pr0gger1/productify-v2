import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import styles from "./styles/ConfirmationButton.module.scss";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ConfirmationButton = ({ variant = "ok", backgroundColor="", ...props }) => {
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
                {...props}
            />
            :
            <CloseRoundedIcon
                style={{backgroundColor}}
                className={
                [styles.confirmation__button, styles.cancel].join(" ")
            }
                {...props}
            />
        }
        </>
    );
};

export default ConfirmationButton;