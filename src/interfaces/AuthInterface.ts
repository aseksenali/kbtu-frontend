interface RefreshTokenAuthenticationRequest {
    refreshToken: string
}

interface UserInfoRequest {
    accessToken: string
}

interface PasswordAuthenticationRequest {
    username: string,
    password: string
}

export type {
    PasswordAuthenticationRequest,
    RefreshTokenAuthenticationRequest,
    UserInfoRequest
}
