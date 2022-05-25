import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {PoppinsNormalFiord14px} from "../styles/styledMixins";
import {Breadcrumbs, createTheme, ThemeProvider} from "@mui/material";
import {Link, Outlet, useLocation, useMatch, useOutletContext, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {selectActiveCarWasher, setActiveCarWasher, toggleLike} from "../redux/reducers/carWasherSlice";
import ImageCarousel from "../components/ImageCarousel";
import useSize from "../hooks/useSize";
import {useHeader} from "./MainPage";
import {CarWasher} from "../interfaces/CarWasher";


type ActiveCarWasherContext = {
    activeCarWasher: CarWasher
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  padding: 0 150px;
`

const StyledLink = styled(Link)`
  ${PoppinsNormalFiord14px};
  text-decoration: none;
`

const NavigationBreadcrumbs = styled(Breadcrumbs)`
  ${StyledLink} {
    color: var(--nobel);
  }
`

const Nav = styled.div`
  grid-area: nav;
  margin: 1.5em;
`

const Text = styled.span`
  ${PoppinsNormalFiord14px};
`

type BreadcrumbsSection = {
    to: string,
    text: string
}

const CarWasherDetails = () => {
    const dispatch = useAppDispatch()
    const activeCarWasher = useAppSelector(selectActiveCarWasher)
    const {id} = useParams()

    const initialSections: BreadcrumbsSection[] = [{to: '/', text: 'Home'} as BreadcrumbsSection]

    const [sections, setSections] = useState<BreadcrumbsSection[]>(initialSections)

    const location = useLocation()

    useEffect(() => {
        const locationParts = location.pathname.split('/')
        if (id && activeCarWasher) {
            if (locationParts.length >= 2) setSections([...initialSections, {to: `/${id}`, text: activeCarWasher.name}])
            if (locationParts.length >= 3) setSections([...sections, {to: `/${id}/reserve`, text: "Reserve"}])
        }
    }, [activeCarWasher, id, location])

    const {headerRef} = useHeader()
    const size = useSize(headerRef)

    const breadcrumbsTheme = createTheme({
        components: {
            MuiBreadcrumbs: {
                styleOverrides: {
                    separator: {
                        color: "var(--nobel)",
                        fontSize: 20,
                        margin: "0 .3em"
                    }
                }
            }
        }
    })


    useEffect(() => {
        id && dispatch(setActiveCarWasher(id))
    }, [dispatch, id])

    return (
        <Page style={{height: `calc(${window.innerHeight}px - ${size ? size.top + size.bottom : 0}px)`}}>
            <Nav>
                <ThemeProvider theme={breadcrumbsTheme}>
                    <NavigationBreadcrumbs sx={{
                        margin: '0 2em',
                    }}>
                        {sections.slice(0, sections.length - 1).map((link, index) => <StyledLink to={link.to} key={index}>{link.text}</StyledLink>)}
                        <Text>{sections[sections.length - 1].text}</Text>
                    </NavigationBreadcrumbs>
                </ThemeProvider>
            </Nav>
            <Outlet context={{activeCarWasher}}/>
        </Page>
    )
}

export const useActiveCarWasher = () => useOutletContext<ActiveCarWasherContext>()

export default CarWasherDetails;