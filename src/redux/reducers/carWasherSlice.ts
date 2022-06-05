import { CarWasher } from '../../interfaces/CarWasher'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const carWashersApi = createApi({
    reducerPath: 'carWashersApi',
    tagTypes: ['CarWasher'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: builder => ({
        getAllCarWashers: builder.query<CarWasher[], void>({
            query: () => 'carWashers',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'CarWasher' as const, id })),
                        { type: 'CarWasher', id: 'LIST' },
                    ]
                    : [{ type: 'CarWasher', id: 'LIST' }],
        }),
        getCarWasherById: builder.query<CarWasher, string>({
            query: (id) => `carWashers/${ id }`,
            providesTags: (result) => [{ type: 'CarWasher', id: result?.id }],
        }),
        toggleLike: builder.mutation<void, Pick<CarWasher, 'id'> & Partial<CarWasher>>({
            query: ({ id, ...patch }) => ({
                url: `carWashers/${ id }`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'CarWasher', id }],
        }),
    }),
})

export const {useToggleLikeMutation, useGetCarWasherByIdQuery, useGetAllCarWashersQuery} = carWashersApi