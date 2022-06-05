import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export type SocialNetworkIconProps = {
    socialNetwork: string,
    url: string
}

const SocialNetworkIcon: React.FC<PropsWithChildren<SocialNetworkIconProps>> = props => {
    return (
        <Link to={ { pathname: props.url } } target="_top">
            <IconWrapper>
                { props.children }
            </IconWrapper>
        </Link>
    )
}

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  box-shadow: 0 0 5px darkgrey;
  transition: box-shadow .3s ease-in-out;

  &:hover {
    box-shadow: 0 0 20px darkgrey;
  }

  &:active {
    transition: box-shadow .1s ease-in-out;
    box-shadow: none;
  }
`

export default SocialNetworkIcon