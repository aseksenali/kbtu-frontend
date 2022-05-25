import React, {RefObject, useRef} from 'react'
import Header from "../components/Header";
import "mapbox-gl/dist/mapbox-gl.css"
import {Outlet, useOutletContext} from "react-router-dom";

type HeaderRef = {
    headerRef?: RefObject<HTMLDivElement>
}

const MainPage = () => {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <>
            <Header ref={ref}/>
            <Outlet context={{ref}}/>
        </>
    )
}

export const useHeader = () => {
    return useOutletContext<HeaderRef>()
}
export default MainPage;