import React, {
	useContext, useEffect, useState, FC, MouseEvent
} from 'react';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { useAuthError } from 'hooks/useAuthError';
import { SnackbarContext } from 'context/SnackbarContext';

import { login, register as registerHandler } from 'store/reducers/AuthSlice';

import { Link } from 'react-router-dom';

// import Button from 'components/ui/buttons/Button';
import { FormControl, IconButton, InputAdornment, TextField, Button } from '@mui/material';
import KeyTwoToneIcon from '@mui/icons-material/KeyTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { RootState, useAppDispatch, useAppSelector } from 'store/index';
import { SerializedError } from '@reduxjs/toolkit';
import LoginIcon from '@mui/icons-material/Login';

import styles from './styles.module.scss';

interface AuthFormProps {
    register: boolean
}

const AuthForm: FC<AuthFormProps> = ({ register = false}): JSX.Element => {
	const { setToast } = useContext(SnackbarContext);
	const { register: field, reset, handleSubmit, formState: { errors }} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
			username: '',
		},
		mode: 'onChange'
	});

	const mobileScreen: boolean = useMediaQuery({ maxWidth: 900 });
	const inputColorStyles: string = mobileScreen ? 'white' : '';

	// redux состояния
	const dispatch = useAppDispatch();

	const authError: SerializedError | null =  useAppSelector(
		(state: RootState) => state.authStates.authError
	);

	useAuthError(authError);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	useEffect(() => reset(), [register]);

	// обработчики
	const handleClickShowPassword = () => setShowPassword(show => !show);
	const handleMouseDownPassword = (event: MouseEvent): void => {
		event.preventDefault();
	};

	const onSubmitHandler = async (data: any) => {
		if (register) {
			if (data.password === data.repeatPassword) {
				dispatch(registerHandler(data));
				setToast({
					message: 'На вашу электронную почту было отправлено письмо с подтверждением',
					type: 'info',
					hideDuration: 5000
				});

			}
			else {
				setToast({
					message: 'Пароли не совпадают',
					type: 'error'
				});
			}
		}
		else {
			const { email, password } = data;
			dispatch(login({ email, password }));
		}
	};

	return (
		<form className={styles.auth__form} onSubmit={handleSubmit(onSubmitHandler)}>
			<div className={styles.form__fields}>
				{
					register &&
                    <FormControl>
                    	<TextField
                    		id="username"
                    		{...field('username', {
							 	required: 'Пустое поле'
                    		})}
                    		error={!!errors?.username ?? false}
                    		helperText={errors?.username?.message ?? ''}
                    		label="Ваш ник"
                    		InputProps={{
                    			style: {
                    				color: inputColorStyles
                    			},
                    			startAdornment:
                                <InputAdornment position="start">
                                	<BadgeTwoToneIcon
                                		sx={{color: inputColorStyles}}
                                	/>
                                </InputAdornment>
                    		}}
                    	/>
                    </FormControl>
				}
				<FormControl>
					<TextField
						id="email"
						label="Email"
						helperText={errors?.email?.message ?? ''}
						error={!!errors?.email ?? false}
						{...field('email', {
							required: 'Пустое поле',
							pattern: { value: /\S+@\S+\.\S+/, message: 'Некорректный email' }
						})}
						placeholder="example@example.com"
						autoComplete="off"
						InputProps={{
							style: {
								color: inputColorStyles,
							},
							startAdornment:
                            <InputAdornment position="start">
                            	<EmailTwoToneIcon
                            		sx={{color: inputColorStyles}}
                            	/>
                            </InputAdornment>
						}}
					/>
				</FormControl>
				<FormControl>
					<TextField
						type={showPassword ? 'text' : 'password'}
						id="password"
						label="Пароль"
						{...field('password', {
							required: 'Пустое поле',
							minLength: {
								value: 6, message: 'Пароль меньше 6 символов'
							}
						})}
						error={!!(errors?.password ?? false)}
						helperText={errors?.password?.message ?? ''}
						placeholder="Минимум 6 символов"
						InputProps={{
							style: { color: inputColorStyles },
							startAdornment:
                                <InputAdornment position="start">
                                	<KeyTwoToneIcon
                                		sx={{color: inputColorStyles}}
                                	/>
                                </InputAdornment>,
							endAdornment:
                              <InputAdornment position="end">
                              	<IconButton
                              		aria-label="toggle password visibility"
                              		onClick={handleClickShowPassword}
                              		onMouseDown={handleMouseDownPassword}
                              		sx={{color: inputColorStyles}}
                              		edge="end"
                              	>
                              		{showPassword ? <VisibilityOff /> : <Visibility />}
                              	</IconButton>
                              </InputAdornment>
						}}
					/>
				</FormControl>
				{
					register &&
                <FormControl>
                	<TextField
                		type={showPassword ? 'text' : 'password'}
                		id="repeatPassword"
                		label="Повторите пароль"
                		{...field('repeatPassword', {
                			required: 'Пустое поле'
                		})}
                		error={!!errors?.repeatPassword ?? false}
                		helperText={errors?.repeatPassword?.message ?? ''}
                		placeholder="Повторите ваш пароль"
                		InputProps={{
                			startAdornment:
                                <InputAdornment position="start">
                                	<KeyTwoToneIcon
                                		sx={{color: inputColorStyles}}
                                	/>
                                </InputAdornment>,
                			endAdornment:
                              <InputAdornment position="end">
                              	<IconButton
                              		aria-label="toggle password visibility"
                              		onClick={handleClickShowPassword}
                              		onMouseDown={handleMouseDownPassword}
                              		edge="end"
                              	>
                              		{showPassword ? <VisibilityOff /> : <Visibility />}
                              	</IconButton>
                              </InputAdornment>
                		}}
                	/>
                </FormControl>
				}
			</div>

			<Button
				type="submit"
				className={styles.login_button}
				variant="contained"
			>
				{register ? 'Зарегистрироваться' : 'Войти'}
				<LoginIcon/>
			</Button>

			{
				register ?
					<span id={styles['create_account']}>
						<b>Уже есть аккаунт? <Link to="/login">Войдите</Link></b>
					</span>
					:
					<span id={styles['create_account']}>
						<b>Еще нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link></b>
					</span>
			}
		</form>
	);
};

export default AuthForm;