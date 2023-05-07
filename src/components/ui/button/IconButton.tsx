import React, {FC, MouseEvent, ReactNode} from "react";
import styles from "./styles/IconButton.module.scss";

interface IconButtonProps {
    imgIcon?: string,
    children?: ReactNode | JSX.Element
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const IconButton: FC<IconButtonProps> = ({ onClick, children, imgIcon = "" }) => {
    return (
        <button className={styles.icon__button}
                type="button"
                onClick={onClick}
        >
            { imgIcon && <img src={imgIcon} alt=""/>}
            { children }
        </button>
    );
};

export default IconButton;