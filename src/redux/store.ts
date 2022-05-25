import {configureStore} from '@reduxjs/toolkit'
import userReducers from "./reducers/userSlice";
import carWasherReducers from "./reducers/carWasherSlice";

const saveToLocalStorage = (state: RootState) => {
    try {
        localStorage.setItem('state', JSON.stringify(state));
    } catch (e) {
        console.error(e);
    }
}

const loadFromLocalStorage = () => {
    try {
        const stateStr = localStorage.getItem('state');
        return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

const persistedStore = loadFromLocalStorage();

const store = configureStore({
    reducer: {
        user: userReducers,
        carWasher: carWasherReducers
    }, preloadedState: persistedStore
})

store.subscribe(() => {
    saveToLocalStorage(store.getState());
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store