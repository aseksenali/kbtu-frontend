import React from 'react';
import './App.css';
import Login from "./pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import MainPage from "./pages/MainPage";
import CarWasherDetails from "./pages/CarWasherDetails";
import {Provider} from "react-redux";
import store from "./redux/store";
import CarWasherSearch from "./pages/CarWasherSearch";
import CarWasherReservation from "./pages/CarWasherReservation";
import CarWasherDetailsMainPart from "./pages/CarWasherDetailsMainPart";

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    )
}

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<MainPage/>}>
                <Route index element={<CarWasherSearch/>}/>
                <Route path=":id" element={<CarWasherDetails/>}>
                    <Route index element={<CarWasherDetailsMainPart/>}/>
                    <Route path="reserve" element={<CarWasherReservation/>}/>
                </Route>
            </Route>
            <Route path="/logout" element={
                <RequireAuth allowedRoles={["USER"]}>
                    <p>Hi</p>
                </RequireAuth>
            }/>
        </Routes>
    );
}

export default AppWrapper;
