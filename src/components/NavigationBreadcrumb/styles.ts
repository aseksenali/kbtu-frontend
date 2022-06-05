import styled from 'styled-components'
import { Breadcrumbs, createTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { PoppinsNormalFiord14px } from '../../styles/styledMixins'

const Nav = styled.div`
  grid-area: nav;
  margin: 1.5em;
`

const breadcrumbsTheme = createTheme({
    components: {
        MuiBreadcrumbs: {
            styleOverrides: {
                separator: {
                    color: 'var(--nobel)',
                    fontSize: 20,
                    margin: '0 .3em',
                },
            },
        },
    },
})

const StyledLink = styled(Link)`
  ${ PoppinsNormalFiord14px };
  text-decoration: none;
`

const NavigationBreadcrumbs = styled(Breadcrumbs)`
  ${ StyledLink } {
    color: var(--nobel);
  }
`

const Text = styled.span`
  ${ PoppinsNormalFiord14px };
`

export { Text, Nav, StyledLink, NavigationBreadcrumbs, breadcrumbsTheme }