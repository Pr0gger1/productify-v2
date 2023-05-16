import React, { ChangeEvent, CSSProperties, ReactNode } from "react";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";

import styles from "./styles/UploadFileButton.module.scss";

interface UploadFileButtonProps {
    children: ReactNode | JSX.Element,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    fileFilter: string,
    style?: CSSProperties
}

const UploadFileButton = (props: UploadFileButtonProps): JSX.Element => {
    const {
        children,
        onChange,
        fileFilter,
        style
    } = props;

    return (
        <label
            htmlFor="upload_file"
            className={styles.upload_file__btn}
            style={style}
        >
            <input
                id="upload_file"
                type="file"
                onChange={onChange}
                accept={fileFilter}
            />
            <UploadRoundedIcon/>
            {children}
        </label>
    );
}

export default UploadFileButton;