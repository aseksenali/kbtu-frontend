import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReservationStoreState } from '../interfaces/states'
import { RootState } from '../store'
import { CreateReservation, Reservation } from '../../interfaces/Reservation'

export const reservationApi = createApi({
    reducerPath: 'reservationApi',
    tagTypes: ['Reservation'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: builder => ({
        getReservationsByCarWasherId: builder.query<Reservation[], string>({
            query: (id) => `carWashers/${ id }/reservations`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(() => ({ type: 'Reservation' as const })),
                        { type: 'Reservation', id: 'LIST' },
                    ]
                    : [{ type: 'Reservation', id: 'LIST' }],
        }),
        updateReservation: builder.mutation<void, CreateReservation>({
            query: ({ carWasherId, ...reservation }) => ({
                url: `/carWashers/${ carWasherId }/reservations`,
                method: 'PUT',
                body: reservation,
            }),
            invalidatesTags: [{ type: 'Reservation', id: 'LIST' }],
        }),
        createReservation: builder.mutation<void, CreateReservation>({
            query: ({ carWasherId, ...reservation }) => ({
                url: `/carWashers/${ carWasherId }/reservations`,
                method: 'POST',
                body: reservation,
            }),
            invalidatesTags: [{ type: 'Reservation', id: 'LIST' }],
        }),
    }),
})

const initialState: ReservationStoreState = {
    currentReservation: {} as Partial<CreateReservation>,
    isUpdate: false,
}

const reservationSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetCurrentReservation: (state) => {
            state.currentReservation = {} as Partial<CreateReservation>
            state.isUpdate = false
        },

        updateCurrentReservation: (state, action: PayloadAction<Partial<CreateReservation>>) => {
            state.currentReservation = {...state.currentReservation, ...action.payload}
        },

        setUpdate: (state) => {
            state.isUpdate = true
        },
    },
})

export const { resetCurrentReservation, updateCurrentReservation, setUpdate } = reservationSlice.actions
export const {useUpdateReservationMutation, useCreateReservationMutation, useGetReservationsByCarWasherIdQuery} = reservationApi

export const selectCurrentReservation = (state: RootState) => state.reservation.currentReservation
export const selectIsUpdate = (state: RootState) => state.reservation.isUpdate
export default reservationSlice.reducer
