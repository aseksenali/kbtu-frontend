import {CarWasher} from "../../interfaces/CarWasher";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CarWasherStoreState} from "../interfaces/states";
import {RootState} from "../store";
import {v4 as uuidv4} from 'uuid'
import photo1 from '../../assets/1.jpeg'
import photo2 from '../../assets/2.png'


const initialState: CarWasherStoreState = {
    activeCarWasher: undefined,
    carWashers: [],
    status: 'idle'
}

export const toggleLike = createAsyncThunk<boolean, string>(
    'carWashers/like',
    async (id: string, thunkAPI): Promise<boolean> => {
        thunkAPI.dispatch(like(id))
        return true;
    }
)

export const fetchCarWashers = createAsyncThunk<Array<CarWasher>>(
    'carWashers/fetchAll',
    async (_) => {
        return ([{
            id: uuidv4(),
            isLiked: true,
            address: {house: "29/1", street: "Dostyk"},
            name: "Car washer name",
            description: "Car washing name description",
            price: 3000,
            rating: 4.9,
            distance: 1.4,
            workingHours: {start: {hours: 9, minutes: 0}, end: {hours: 18, minutes: 0}},
            photo: [photo1, photo2, photo1, photo2, photo1, photo2, photo1],
            coordinates: {
                longitude: 76.9286100,
                latitude: 43.2566700
            },
            telephone: "77470646867",
            instagram: "https://www.instagram.com/bubbles_carwash2022/"
        } as CarWasher, {
            id: uuidv4(),
            address: {house: "29/1", street: "Dostyk"},
            isLiked: true,
            name: "Car washer name",
            price: 2000,
            rating: 4.9,
            distance: 1.4,
            workingHours: {start: {hours: 9, minutes: 0}, end: {hours: 18, minutes: 0}},
            photo: [photo1, photo2, photo1, photo2, photo1, photo2, photo1],
            coordinates: {
                longitude: 76.9486100,
                latitude: 43.2566700
            },
            telephone: "77470646867",
            instagram: "https://www.instagram.com/bubbles_carwash2022/"
        } as CarWasher]);
    }
)

const carWasherSlice = createSlice({
    name: 'carWasher',
    initialState,
    reducers: {
        like: (state, action: PayloadAction<string>) => {
            state
                .carWashers
                .filter((carWasher) => carWasher.id === action.payload)
                .forEach(carWasher => carWasher.isLiked = !carWasher.isLiked)
            if (state.activeCarWasher && state.activeCarWasher.id === action.payload) {
                state.activeCarWasher.isLiked = !state.activeCarWasher.isLiked
            }
        },
        setActiveCarWasher: (state, action: PayloadAction<string>) => {
            state.activeCarWasher = state
                .carWashers
                .find((carWasher) => carWasher.id === action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarWashers.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchCarWashers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.carWashers = action.payload;
            })
            .addCase(fetchCarWashers.rejected, (state) => {
                state.status = 'failed'
            })
        builder
            .addCase(toggleLike.rejected, (_) => {
                alert("Like not accepted")
            })
    }
})

export const {like, setActiveCarWasher} = carWasherSlice.actions
export const selectCarWashers = (state: RootState) => state.carWasher.carWashers
export const selectActiveCarWasher = (state: RootState) => state.carWasher.activeCarWasher
export default carWasherSlice.reducer