import Time from '../helpers/dateHelper'

export type Reservation = {
    id: string,
    carWasherId: string,
    time: Time
}

export type CreateReservation = {
    time: Time,
    carWasherId: string,
    carRegistration: string,
    carModel: string,
    notes: string,
    washTheInterior: boolean,
    washTheThunk: boolean
}