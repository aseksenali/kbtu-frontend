import { Duration } from '../helpers/dateHelper'

export type Address = {
    street: string,
    house: string
}

export type CarWasher = {
    id: string
    isLiked?: boolean
    name: string
    description?: string
    address: Address
    rating: number
    distance: number
    workingHours: Duration
    price: number
    photo: string[]
    coordinates: {
        longitude: number,
        latitude: number
    }
    telephone: string
    instagram: string
}