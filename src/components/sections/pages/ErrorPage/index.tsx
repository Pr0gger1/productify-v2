import React, {FC, useContext, useEffect} from 'react';
import {Button, styled} from '@mui/material';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import styles from './styles.module.scss';
import {HeaderContext} from 'context/HeaderContext';

const ErrorPage: FC = (): JSX.Element => {
	const navigate: NavigateFunction = useNavigate();
	const { setShowHeader } = useContext(HeaderContext);

	const ColorButton = styled(Button)(() => ({
		backgroundColor: '#5359ff',
		'&:hover': {
			backgroundColor: '#4749ff'
		},
		width: '80%'
	}));

	useEffect(() => {
		setShowHeader(false);
	}, []);

	return (
		<div className={styles.error__page}>
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
					onClick={() => navigate('/')}
					variant="contained"
					size="large"
				>
                    Главная страница
				</ColorButton>
			</div>
		</div>
	);
};
export default ErrorPage;