import { User } from 'firebase/auth';


interface IAuthUserData {
    email: string,
    password: string,

}

export interface IRegisterUserData {
    email: string,
    password: string,
    repeatPassword: string,
    username: string
}

type IUserDataObject = {
    userData: User | null
}

export type {
	IAuthUserData, IUserDataObject
};