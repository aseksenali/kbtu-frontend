import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import NavigationBreadcrumb, { BreadcrumbSection } from '../components/NavigationBreadcrumb'
import { Outlet } from 'react-router-dom'
import { useHeader } from './MainPage'
import { useActiveCarWasher } from '../hooks/useActiveCarWasher'
import { useMatch } from 'react-router'
import { CarWasher } from '../interfaces/CarWasher'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  padding: 0 150px;
`

const carWasherBreadcrumbSection = (carWasher: CarWasher): BreadcrumbSection => ({
    to: `/${ carWasher.id }`,
    name: carWasher.name,
})

const reservationBreadcrumbSection = (carWasher: CarWasher): BreadcrumbSection => ({
    to: `/${ carWasher.id }/reserve`,
    name: 'Reserve',
})


const CarWasherDetails = () => {
    const { size } = useHeader()
    const { activeCarWasher, isLoading, error } = useActiveCarWasher()
    const initialSections: BreadcrumbSection[] = useMemo(() => [{ to: '/', name: 'Home' }], [])
    const [sections, setSections] = useState<BreadcrumbSection[]>(initialSections)
    const carWasherDetailsMatch = useMatch('/:id')
    const reservationStartMatch = useMatch('/:id/reserve')
    const reservationFinishMatch = useMatch('/:id/reserve/finalize')

    useEffect(() => {
        if (carWasherDetailsMatch && activeCarWasher) {
            setSections([...initialSections, carWasherBreadcrumbSection(activeCarWasher!)])
        } else if ((reservationStartMatch || reservationFinishMatch) && activeCarWasher) {
            setSections([...initialSections, carWasherBreadcrumbSection(activeCarWasher!), reservationBreadcrumbSection(activeCarWasher!)])
        }
    }, [activeCarWasher, carWasherDetailsMatch, initialSections, reservationFinishMatch, reservationStartMatch])

    return (
        <Page style={ { height: `calc(${ window.innerHeight }px - ${ size ? size.top + size.bottom : 0 }px)` } }>
            <NavigationBreadcrumb sections={ sections }/>
            <Outlet/>
        </Page>
    )
}

export default CarWasherDetails