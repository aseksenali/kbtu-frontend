import styled from 'styled-components'
import {
    PoppinsBoldEndeavour32px,
    PoppinsMediumEndeavour20px,
    PoppinsMediumWhite14px,
    PoppinsNormalFiord14px,
    PoppinsRegularFiord20px,
} from '../../styles/styledMixins'
import { NavLink } from 'react-router-dom'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em 5%;
  row-gap: 1em;
  z-index: 1000;
`

const MainPart = styled.div`
  display: grid;
  grid-template-areas: 'left right';
  grid-template-columns: 40% auto;
`

const LeftSide = styled.div`
  padding-right: 12.5%;
  grid-area: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 2em;
  border-right: 1px solid var(--endeavour-4)
`

const Title = styled.span`
  ${ PoppinsBoldEndeavour32px };
  color: var(--fiord);
`

const Username = styled.span`
  ${ PoppinsMediumEndeavour20px };
`

const ImageWrapper = styled.div`
  width: 150px;
  height: 150px;
`

const Image = styled.img`
  border-radius: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const BasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  row-gap: .8em;
`

const PhoneNumber = styled.span`
  ${ PoppinsNormalFiord14px };
`

const TabList = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const TabBar = styled(NavLink)`
  width: 100%;
  text-decoration: none;
  
  .active {
    color: blue;
    &::after {
      content: '';
      height: 100%;
      width: 2px;
      display: inline-block;
      background-color: var(--endeavour);
    }
  }
`

const IconWithText = styled.div`
  padding: 1em 0;
  display: flex;
  align-items: center;
  width: 100%;

  & > span {
    ${ PoppinsRegularFiord20px };
    margin-left: 2ex;
  }
  
  & > svg {
    height: 20px;
  }
`

const Button = styled.button.attrs({ type: 'button', form: 'signInForm' })`
  ${ PoppinsMediumWhite14px };
  width: 100%;
  padding: 10px 0;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  transition: box-shadow .3s ease-in-out;

  background-color: var(--endeavour-2);

  &:not(:disabled) {
    &:hover {
      box-shadow: 0 0 10px var(--endeavour-2);
    }
  }

  &:active {
    transition: box-shadow .1s ease-in-out;
    box-shadow: none;
  }

  &:disabled {
    background-color: var(--nobel);
    color: var(--fiord);
  }
`

export {
    Page,
    LeftSide,
    Title,
    Username,
    ImageWrapper,
    Image,
    BasicInfo,
    PhoneNumber,
    TabList,
    TabBar,
    IconWithText,
    Button,
    MainPart,
}