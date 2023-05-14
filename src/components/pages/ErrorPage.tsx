import React, {FC} from "react";
import {Button, styled} from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router-dom";
import styles from "./styles/ErrorPage.module.scss";

const ErrorPage: FC = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();

    const ColorButton = styled(Button)(() => ({
        backgroundColor: "#5359ff",
        "&:hover": {
            backgroundColor: "#4749ff"
        },
        width: "80%"
    }))

    return (
        <main className={styles.error__page}>
            <div className={styles.error__block}>
                <span className={styles.error__code}>
                    404.
                </span>
                <span className={styles.error__message}>
                    Not Found
                </span>
            </div>
            <div className={styles.error__comment}>
                <p>К сожалению, такая страница не найдена</p>
                <ColorButton
                    onClick={() => navigate("/")}
                    variant="contained"
                    size="large"
                >
                    Главная страница
                </ColorButton>
            </div>
        </main>
    )
}
export default ErrorPage;