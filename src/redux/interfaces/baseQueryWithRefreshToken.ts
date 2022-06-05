import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query'
import {
    createRefreshTokenAuthenticationRequest,
    createUserInfoRequest,
    logout,
    selectRefreshToken,
    setToken,
} from '../reducers/userSlice'
import { Tokens } from './states'
import { RootState } from '../store'
import { authorizationServerAddress } from '../../constants/BackendConstants'

const authenticationBaseQuery = fetchBaseQuery({ baseUrl: authorizationServerAddress })
const baseQueryWithRefreshToken = (baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>): BaseQueryFn<string | FetchArgs,
    unknown,
    FetchBaseQueryError> => async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshToken = selectRefreshToken(api.getState() as RootState)
        if (refreshToken) {
            const { data: refreshResult } = await authenticationBaseQuery({
                url: '/token',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                body: new URLSearchParams(createRefreshTokenAuthenticationRequest({ refreshToken })),
            } as FetchArgs, api, extraOptions)
            if (refreshResult) {
                const tokens = (refreshResult as { access_token: string, refresh_token: string })
                api.dispatch(setToken({
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token,
                } as Tokens))
                const fetchArgs = args as FetchArgs
                result = await baseQuery({
                    ...fetchArgs,
                    body: new URLSearchParams(createUserInfoRequest({ accessToken: tokens.access_token })),
                }, api, extraOptions)
            } else {
                api.dispatch(logout())
            }
        }
    }
    return result
}

export default baseQueryWithRefreshToken