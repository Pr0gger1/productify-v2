import React, { useEffect, useState } from "react";
import {loginWithGoogle} from "../../store/reducers/AuthSlice";

import AuthForm from "../forms/AuthForm";
import styles from "./styles/AuthPage.module.scss";
import {IAuthUserData} from "../../interfaces/User";
import {useAppDispatch} from "../../store/store";

import google_icon from "../../assets/img/icons/google.svg";
import logo  from"../../assets/img/logo/logo_vector_white.svg";

const AuthPage = ({ register = false }) => {
    const [authData, setAuthData] = useState<IAuthUserData>({
        email: "", password: "", repeatPassword: "", username: ""
    });

    useEffect(() => {
        if (register)
            setAuthData({
                email: "",
                password: "",
                repeatPassword: "",
                username: ""
            })
    }, [register]);

    const dispatch = useAppDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.login__form}>
                <h1 className={styles.auth__header}>
                    {register ? "Регистрация" : "Авторизация"}
                </h1>

                <AuthForm
                    register={register}
                    data={authData}
                    setData={setAuthData}
                />

                <button
                    className={styles.google_auth__button}
                    type="button"
                    onClick={() => dispatch(loginWithGoogle())}
                >
                    <img src={google_icon} alt="google authorization"/>
                    <span className={styles.google_auth__text}>
                        Авторизоваться через Google
                    </span>
                </button>
            </div>

            <div className={styles.introduce__block}>
                <div className={styles.logo}>
                    <img src={logo} alt="Productify"/>
                </div>
                <div className={styles.introduce__slogan}>
                    <p>Начните планировать свой день уже сегодня</p>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;