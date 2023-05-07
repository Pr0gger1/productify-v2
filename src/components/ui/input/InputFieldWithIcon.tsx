import React, {FC} from "react";
import InputField from "./InputField";
import styles from "./styles/InputFieldWithIcon.module.scss";

interface InputFieldWithIconProps {
    inputIcon: string,
    alt: string
}

const InputFieldWithIcon: FC<InputFieldWithIconProps> = ({ inputIcon, alt }) => {
    return (
        <div className={styles.input_field__with_icon}>
            <img className={styles.icon__input}
            src={inputIcon}
            alt={alt} 
            />
            
            <InputField/>
        </div>
    );
};

export default InputFieldWithIcon;