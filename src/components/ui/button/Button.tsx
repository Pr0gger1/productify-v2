import React, {ButtonHTMLAttributes, FC, ReactNode} from "react";
import styles from "./styles/Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode | JSX.Element,
    variant?: "white" | "long",
    cs?: any,
    customClass?: string
}

const Button: FC<ButtonProps> = ({
     children, variant = "white",
     customClass = "", cs = {}, ...props
}) => {
    return (
        <button
            className={[styles.button, styles[variant], customClass].join(" ")}
            style={cs}
            {...props}
        >
            {children}
        </button>
    );
}
export default Button