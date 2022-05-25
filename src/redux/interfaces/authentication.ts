type PasswordCredentials = {
    username: string,
    password: string,
}

type RefreshTokenCredentials = {
    refresh_token: string
}

type Tokens = {
    access_token: string,
    refresh_token: string
}

export type {PasswordCredentials, RefreshTokenCredentials, Tokens}