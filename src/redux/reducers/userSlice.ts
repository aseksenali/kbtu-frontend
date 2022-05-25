import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import UserService from "../../services/UserService";
import {UserStoreState} from "../interfaces/states";
import {PasswordCredentials, Tokens} from "../interfaces/authentication";
import {RootState} from "../store";

const initialState: UserStoreState = {
    tokens: undefined,
    status: 'idle'
}

export const login = createAsyncThunk<Tokens, PasswordCredentials>("user/login", async (credentials, thunkAPI) => {
    return await UserService.doLogin(credentials)
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
                state.tokens = undefined
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.tokens = {
                    access_token: action.payload.access_token,
                    refresh_token: action.payload.refresh_token
                }
            })
            .addCase(login.rejected, (state) => {
                state.status = 'failed'
                state.tokens = undefined
            })
    }
})

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
