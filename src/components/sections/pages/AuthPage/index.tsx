import React, { FC, useContext, useEffect } from 'react';
import { loginWithGoogle } from 'store/reducers/AuthSlice';

import AuthForm from 'components/forms/AuthForm';
import { useAppDispatch } from 'store';

import google_icon from 'assets/img/icons/google.svg';
import logo from 'assets/img/logo/logo_vector_white.svg';

import { HeaderContext } from 'context/HeaderContext';
import styles from './styles.module.scss';

interface AuthPageProps {
	register?: boolean;
}

const AuthPage: FC<AuthPageProps> = ({ register = false }): JSX.Element => {
	const { setShowHeader } = useContext(HeaderContext);

	useEffect(() => {
		setShowHeader(false);
	}, []);

	const dispatch = useAppDispatch();

	return (
		<div className={styles.container}>
			<div className={styles.login__form}>
				<h1 className={styles.auth__header}>
					{register ? 'Регистрация' : 'Авторизация'}
				</h1>

				<AuthForm register={register} />

				<button
					className={styles.google_auth__button}
					type="button"
					onClick={() => dispatch(loginWithGoogle())}
				>
					<img src={google_icon} alt="google authorization" />
					<span className={styles.google_auth__text}>
						Авторизоваться через Google
					</span>
				</button>
			</div>

			<div className={styles.introduce__block}>
				<div className={styles.logo}>
					<img src={logo} alt="Productify" />
				</div>
				<div className={styles.introduce__slogan}>
					<p>Начните планировать свой день уже сегодня</p>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
