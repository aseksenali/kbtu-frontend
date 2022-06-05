import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Page = styled.div`
  display: grid;
  grid-template-columns: 45% auto;
  padding: 0 10%;
`

const CarWasherReservation = () => {
    return (
        <Page>
            <Outlet/>
        </Page>
    )
}

export default CarWasherReservation