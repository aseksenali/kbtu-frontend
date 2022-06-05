import React from 'react'
import { ThemeProvider } from '@mui/material'
import * as styles from './styles'
import { NavigationBreadcrumbProps } from './types'

const NavigationBreadcrumb = ({ sections }: NavigationBreadcrumbProps) => {
    return (
        <styles.Nav>
            <ThemeProvider theme={ styles.breadcrumbsTheme }>
                <styles.NavigationBreadcrumbs sx={ {
                    margin: '0 2em',
                } }>
                    { sections.slice(0, sections.length - 1).map((section, index) => <styles.StyledLink
                        to={ section.to }
                        key={ index }>{ section.name }</styles.StyledLink>) }
                    <styles.Text>{ sections[sections.length - 1].name }</styles.Text>
                </styles.NavigationBreadcrumbs>
            </ThemeProvider>
        </styles.Nav>
    )
}

export default NavigationBreadcrumb