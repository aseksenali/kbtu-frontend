import React, { useRef } from 'react'
import Header from '../components/Header'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Outlet, useOutletContext } from 'react-router-dom'
import useSize from '../hooks/useSize'

type HeaderSize = {
    size: DOMRect
}

const MainPage = () => {
    const ref = useRef<HTMLDivElement>(null)
    const size = useSize(ref)

    return (
        <>
            <Header ref={ ref }/>
            <Outlet context={ { size } }/>
        </>
    )
}

export const useHeader = () => {
    return useOutletContext<HeaderSize>()
}
export default MainPage