import React, { FC, KeyboardEventHandler } from 'react';
import InputField from '../InputField';
import Checkbox from '@mui/material/Checkbox';
import { CSSProperties } from 'react';
import { ChangeEvent } from 'react';

import styles from './styles.module.scss';

interface ICheckboxInputProps {
	placeholder?: string;
	checked?: boolean;
	inputValue?: string;
	onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
	onChangeCheckbox?: (
		event: ChangeEvent<HTMLInputElement>,
		checked: boolean,
	) => void;
	onInputKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
	inputStyle?: CSSProperties;
	checkboxDisabled?: boolean;
}

const CheckboxInputField: FC<ICheckboxInputProps> = ({
	placeholder = '',
	inputValue = '',
	onChangeInput,
	checked = false,
	onChangeCheckbox,
	onInputKeyDown,
	inputStyle,
	checkboxDisabled = false,
}) => {
	return (
		<div className={styles.checkbox_input__container}>
			<Checkbox
				checked={checked}
				onChange={onChangeCheckbox}
				disabled={checkboxDisabled}
				sx={{
					color: 'var(--checkboxColor)',
					'& .MuiSvgIcon-root': {
						fontSize: 30,
						borderRadius: '15px',
					},
					'&.Mui-checked': {
						color: '#68d96d',
					},
				}}
			/>

			<InputField
				customClasses={[styles.checkbox__input]}
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
