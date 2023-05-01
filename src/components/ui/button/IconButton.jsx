import React from "react";

import styles from "./styles/IconButton.module.scss";

const IconButton = ({ onClick, children, imgIcon = '' }) => {
    return (
        <button className={styles.icon__button}
                type='button'
                onClick={onClick}
        >
            { imgIcon && <img src={imgIcon} alt=""/>}
            { children }
        </button>
    );
};

export default IconButton;