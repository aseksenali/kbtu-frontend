import React, { StrictMode } from 'react'
import './App.css'
import Login from './pages/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import CarWasherDetails from './pages/CarWasherDetails'
import { Provider } from 'react-redux'
import store from './redux/store'
import CarWasherSearch from './pages/CarWasherSearch'
import CarWasherReservationStart from './pages/CarWasherReservationStart'
import CarWasherDetailsMainPart from './pages/CarWasherDetailsMainPart'
import CarWasherReservation from './pages/CarWasherReservation'
import CarWasherReservationFinalize from './pages/CarWasherReservationFinalize'
import Profile from './pages/Profile/Profile'

const AppWrapper = () => {
    return (
        <StrictMode>
            <Provider store={ store }>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </StrictMode>
    )
}

function App() {
    return (
        <Routes>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/" element={ <MainPage/> }>
                <Route index element={ <CarWasherSearch/> }/>
                <Route path="profile" element={ <Profile/> }/>
                <Route path=":id" element={ <CarWasherDetails/> }>
                    <Route index element={ <CarWasherDetailsMainPart/> }/>
                    <Route path="reserve" element={ <CarWasherReservation/> }>
                        <Route index element={ <CarWasherReservationStart/> }/>
                        <Route path="finalize" element={ <CarWasherReservationFinalize/> }/>
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default AppWrapper
