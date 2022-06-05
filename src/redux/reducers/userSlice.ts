import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import {
    PasswordAuthenticationRequest,
    RefreshTokenAuthenticationRequest,
    UserInfoRequest,
} from '../../interfaces/AuthInterface'
import { Tokens, UserInfo, UserStoreState } from '../interfaces/states'
import { RootState } from '../store'
import { authorizationServerAddress, client_id } from '../../constants/BackendConstants'
import baseQueryWithRefreshToken from '../interfaces/baseQueryWithRefreshToken'

export const createPasswordAuthenticationRequest = ({ username, password }: PasswordAuthenticationRequest) => ({
    grant_type: 'password',
    client_id,
    username,
    password,
})

export const createRefreshTokenAuthenticationRequest = ({ refreshToken: refresh_token }: RefreshTokenAuthenticationRequest) => ({
    grant_type: 'refresh_token',
    client_id,
    refresh_token,
})

export const createUserInfoRequest = ({ accessToken: access_token }: UserInfoRequest) => ({
    client_id,
    access_token,
})

const initialState: UserStoreState = {
    tokens: undefined,
    isAuthenticated: false,
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithRefreshToken(fetchBaseQuery({ baseUrl: authorizationServerAddress })),
    tagTypes: ['User'],
    endpoints: builder => ({
        login: builder.mutation<Tokens, PasswordAuthenticationRequest>({
            query: (request) => ({
                url: '/token',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                body: new URLSearchParams(createPasswordAuthenticationRequest(request)),
            }),
            transformResponse: (baseQueryReturnValue: { access_token: string, refresh_token: string }) => ({
                accessToken: baseQueryReturnValue.access_token,
                refreshToken: baseQueryReturnValue.refresh_token,
            } as Tokens),
        }),
        getUserInfo: builder.query<UserInfo, Pick<Tokens, 'accessToken'>>({
            query: (request) => ({
                url: '/userinfo',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                body: new URLSearchParams(createUserInfoRequest({ accessToken: request.accessToken })),
            }),
        }),
    }),
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<Tokens>) => {
            if (action.payload) {
                state.tokens = action.payload
                state.isAuthenticated = true
            }
        },
        logout: (state) => {
            state.tokens = undefined
            state.isAuthenticated = false
        },
    },
})

export const { useLoginMutation, useGetUserInfoQuery } = userApi

export const { setToken, logout } = userSlice.actions
export const selectRefreshToken = (state: RootState): string | undefined => state.user.tokens?.refreshToken
export const selectAccessToken = (state: RootState): string | undefined => {
    return state.user.tokens?.accessToken
}
export default userSlice.reducer