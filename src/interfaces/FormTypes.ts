export interface FormData {}

export interface ReservationFormData extends FormData {
    carRegistration: string
    carModel: string
    notes: string
    washTheInterior: boolean
    washTheThunk: boolean
}

export interface LoginFormData extends FormData {
    email: string
    password: string
    rememberMe: boolean
}
