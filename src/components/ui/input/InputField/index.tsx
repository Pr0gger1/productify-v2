import React, {CSSProperties, FC, InputHTMLAttributes} from 'react';
import styles from './styles.module.scss';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    customStyles?: CSSProperties,
    customClasses?: string[],
}

const InputField: FC<InputFieldProps> = ({
	type = 'text', customStyles,
	customClasses = [], ...props}
) => {

	const customClassesVar: string = [styles.input__field, ...customClasses].join(' ');

	return (
		<input className={customClassesVar}
			type={type}
			style={customStyles}
			{...props}
		/>
	);
};
export default InputField;