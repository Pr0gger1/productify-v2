import React from 'react';
import InputField from './InputField';
import Checkbox from '@mui/material/Checkbox';

import styles from './styles/CheckboxInput.module.scss';

const CheckboxInputField = ({
    placeholder, inputValue, onChangeInput,
    checked, onChangeCheckbox,
    onInputKeyDown, inputStyle,
    checkboxDisabled = false
}) => {
    return (
        <div className={styles.checkbox_input__container}>
            <Checkbox
                checked={checked}
                onChange={onChangeCheckbox}
                disabled={checkboxDisabled}
                sx={{
                    color: "var(--checkboxColor)",
                    '& .MuiSvgIcon-root': {
                        fontSize: 30,
                        borderRadius: "15px"
                    },
                    '&.Mui-checked': {
                        color: '#68d96d',
                    }
                }}
            />
            
            <InputField customClasses={[styles.checkbox__input]}
                style={inputStyle}
                placeholder={placeholder}
                value={inputValue}
                onChange={onChangeInput}
                onKeyDown={onInputKeyDown}
            />
        </div>
    );
};

export default CheckboxInputField;