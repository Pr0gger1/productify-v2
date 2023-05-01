import React, {useContext, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useAuthError } from '../../hooks/useAuthError';
import { SnackbarContext, snackbarTypes } from '../../context/SnackbarContext';

import { login, register as registerHandler } from '../../store/reducers/AuthSlice';

import { Link } from 'react-router-dom';

import Button from '../ui/button/Button';
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material';
import KeyTwoToneIcon from '@mui/icons-material/KeyTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import styles from './AuthForm.module.scss';

const AuthForm = ({ register = false, data, setData}) => {
    const { setMessage, setType, setOpen, setHideDuration } = useContext(SnackbarContext);

    const emailValidation = !/\S+@\S+\.\S+/.test(data.email)
        && data.email.length !== 0;

    const mobileScreen = useMediaQuery({maxWidth: 900});
    const inputColorStyles = mobileScreen ? 'white' : '';

    // redux состояния
    const dispatch = useDispatch();

    const authError =  useSelector(
        state => state.authStates.authError
    );

    useAuthError(authError);

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setHideDuration(3000);
    }, [setHideDuration]);

    // обработчики
    const handleClickShowPassword = () => setShowPassword(show => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const onChangeHandler = event => {
        setData({...data, [event.target.id]: event.target.value})
    }

    const onSubmitHandler = async event => {
        event.preventDefault();
        if (!data.email || !data.password || (register && !data.repeatPassword)) {
            setMessage('Остались пустые поля!');
            setType(snackbarTypes.error);
            setOpen(true);
        }
        else {
            if (register) {
                if (data.password === data.repeatPassword) {
                    dispatch(registerHandler(data));
                    setMessage("На вашу электронную почту было отправлено письмо с подтверждением");
                    setType(snackbarTypes.info);
                    setHideDuration(5000);
                    setOpen(true);
                }
                else {
                    setMessage('Пароли не совпадают');
                    setType(snackbarTypes.error);
                    setOpen(true);
                }
            }
            else dispatch(login(data));
        }
    }

    return (
        <form className={styles.auth__form}>
            <div className={styles.form__fields}>
                {
                    register &&
                    <FormControl>
                        <TextField
                            id='username'
                            label='Ваш ник'
                            value={data.username}
                            onChange={onChangeHandler}
                            InputProps={{
                                style: {
                                    color: inputColorStyles
                                },
                                startAdornment:
                                <InputAdornment position='start'>
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
                        id='email'
                        label='Email'
                        helperText={emailValidation ? 'Некорректный email' : ''}
                        error={emailValidation}
                        value={data.email}
                        onChange={onChangeHandler}
                        placeholder='example@example.com'
                        autoComplete='off'
                        InputProps={{
                            style: {
                                color: inputColorStyles,
                            },
                            startAdornment:
                            <InputAdornment position='start'>
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
                        InputProps={{
                            style: {
                              color: inputColorStyles
                            },
                            startAdornment:
                                <InputAdornment position='start'>
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
                        id='password'
                        label='Пароль'
                        value={data.password}
                        onChange={onChangeHandler}
                        placeholder='Минимум 6 символов'
                    />
                </FormControl>

                {
                    register &&
                <FormControl>
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position='start'>
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
                        id='repeatPassword'
                        label='Повторите пароль'
                        value={data.repeatPassword}
                        onChange={onChangeHandler}
                        placeholder='Повторите ваш пароль'
                    />
                </FormControl>
                }
            </div>

            <Button
                type='submit'
                customClass={styles.login_button}
                variant='long'
                onClick={onSubmitHandler}>
                {register ? 'Зарегистрироваться' : 'Войти'}
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </Button>

            {
                register ?
                <span id={styles['create_account']}>
                    <b>Уже есть аккаунт? <Link to='/login'>Войдите</Link></b>
                </span>
                    :
                <span id={styles['create_account']}>
                    <b>Еще нет аккаунта? <Link to='/register'>Зарегистрируйтесь</Link></b>
                </span>
            }
        </form>
    );
}

export default AuthForm;