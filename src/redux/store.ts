import { configureStore } from '@reduxjs/toolkit'
import { carWashersApi } from './reducers/carWasherSlice'
import reservationReducers, { reservationApi } from './reducers/reservationSlice'
import userReducers, { userApi } from './reducers/userSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query/react'
import { ReservationStoreState, UserStoreState } from './interfaces/states'

const saveToLocalStorage = (name: string, state: UserStoreState | ReservationStoreState) => {
    try {
        localStorage.setItem(name, JSON.stringify(state))
    } catch (e) {
        console.error(e)
    }
}

const loadFromLocalStorage = () => {
    try {
        const stateStr = [{ name: 'user', item: localStorage.getItem('user') }, {
            name: 'reservation',
            item: localStorage.getItem('reservation'),
        }]
        const objects = stateStr.map(str => ({ name: str.name, item: str.item ? JSON.parse(str.item) : undefined }))
        return objects
            .reduceRight((previousValue, currentValue) => ({
                ...previousValue,
                [currentValue['name']]: currentValue['item'],
            }), {})
    } catch (e) {
        console.error(e)
        return undefined
    }
}

const persistedStore = loadFromLocalStorage()

const store = configureStore({
    reducer: {
        reservation: reservationReducers,
        user: userReducers,
        [reservationApi.reducerPath]: reservationApi.reducer,
        [carWashersApi.reducerPath]: carWashersApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    }, preloadedState: persistedStore,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(carWashersApi.middleware)
        .concat(reservationApi.middleware)
        .concat(userApi.middleware),
})

setupListeners(store.dispatch)

store.subscribe(() => {
    saveToLocalStorage('reservation', store.getState().reservation)
    saveToLocalStorage('user', store.getState().user)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store