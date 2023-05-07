import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { auth } from "../../firebase.config";
import {signOut, User} from "firebase/auth";
import { AuthService } from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {IAuthUserData, IUserDataObject} from "../../interfaces/User";
import {IAuthStates} from "../../interfaces/slices/SliceStates";
import {RootState} from "../store";
import {UpdateUserProfileParams} from "../../interfaces/slices/UpdateUserProfileParams";


export const login = createAsyncThunk(
    "auth/login",
    async (data: IAuthUserData) => {
        return await AuthService.login(data.email, data.password);
    }
);

export const loginWithGoogle = createAsyncThunk(
    "auth/loginWithGoogle",
    async () => {
        return await AuthService.loginWithGoogle();
    }
)
export const register = createAsyncThunk<IUserDataObject | null, IAuthUserData>(
    "auth/register",
    async (data: IAuthUserData) => {
        return await AuthService.register(
            data.email, data.password, data.username
        );
    }
);

export const deleteUser = createAsyncThunk(
    "auth/delete",
    async (password: string): Promise<IUserDataObject | undefined> => {
        const response =  await AuthService.deleteUser(password);
        signOut(auth).then((): void => {
            localStorage.removeItem("userData");
            window.location.pathname = "/login";
        })
        return response;
    }
);

export const updateUserProfile = createAsyncThunk(
    "user/update",
    async (params: UpdateUserProfileParams, {getState}) => {
        const state = getState() as RootState;
        const user: User | null = state.authStates.userData;
        if (user && params.avatar)
            return await UserService.updateUser(user, params.username, params.avatar);
        return null;
    }
);

function getLocalStorageData(): User | null {
    const localStorageData: string | null = localStorage.getItem("userData");
    return localStorageData ? JSON.parse(localStorageData) : null;
}

const initialState: IAuthStates = {
    userData: getLocalStorageData(),
    authError: null,
    status: undefined
}

const authSlice = createSlice({
    name: "authStates",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.userData = action.payload;
            localStorage.setItem(
                "userData",
                JSON.stringify(state.userData)
            );
        },

        logoutHandler(state) {
             signOut(auth)
                .then(() => {
                    state.userData = null;
                    localStorage.removeItem("userData");
                    window.location.pathname = "/login";
            })
                .catch(error => state.authError = error);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, state => {
                state.status = "loading";
            })

            .addCase(login.fulfilled, (state, action) => {
                state.status = "success";
                state.userData = action.payload;
                window.location.pathname = "/";
            })

            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.authError = action.error;
            })

            .addCase(register.pending, state => {
                state.status = "loading";
            })

            .addCase(register.fulfilled, (state, action: PayloadAction<IUserDataObject | null>) => {
                state.status = "success";
                if (action.payload?.userData)
                    state.userData = action.payload.userData;
                else state.userData = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = "failed";
                state.authError = action.error;
            })

            .addCase(loginWithGoogle.pending, state => {
                state.status = "loading";
            })

            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.status = "success";
            })

            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.authError = action.error;
                state.status = "failed";
            })

            .addCase(deleteUser.pending, state => {
                state.status = "loading";
            })

            .addCase(deleteUser.fulfilled, (state, action) => {
                console.log(action)
                if (action.payload && action.payload.userData) {
                    state.userData = action.payload.userData;
                    state.status = "success";

                }
            })

            .addCase(deleteUser.rejected, (state, action) => {
                console.log(action)
                state.authError = action.error
                state.status = "failed"
            })

            .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User | null>) => {
                console.log(action)
                localStorage.setItem("userData", JSON.stringify(action.payload))
                state.userData = action.payload;
                window.location.reload();
            })

            .addCase(updateUserProfile.rejected, (state, action) => {
                console.log(action)
            })
    }
})

export const { setUser, logoutHandler } = authSlice.actions;
export default authSlice.reducer;