import { CreateReservation } from '../../interfaces/Reservation'

type Tokens = {
    accessToken: string,
    refreshToken: string
}

type UserInfo = {
    sub: string,
    roles: string[],
    name: string,
    phone_number: string,
    email: string,
    picture: string
}

interface UserStoreState {
    isAuthenticated: boolean,
    tokens?: Tokens
}

interface ReservationStoreState {
    currentReservation: Partial<CreateReservation> | undefined,
    isUpdate: boolean
}

export type { ReservationStoreState, UserStoreState, Tokens, UserInfo }