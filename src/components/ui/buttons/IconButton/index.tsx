import React, {ComponentProps, FC, MouseEvent, ReactNode} from 'react';
import styles from './styles.module.scss';

interface IconButtonProps extends ComponentProps<'button'>{
    imgIcon?: string,
    children?: ReactNode | JSX.Element
    onClick: (event: MouseEvent<HTMLButtonElement>) => void,
}

const IconButton: FC<IconButtonProps> = ({ onClick, children, imgIcon = '', ...props }) => {
	return (
		<button className={styles.icon__button}
			type="button"
			onClick={onClick}
			{...props}
		>
			{ imgIcon && <img src={imgIcon} alt=""/>}
			{ children }
		</button>
	);
};

export default IconButton;