import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
    PoppinsBoldEndeavour32px,
    PoppinsMediumFiord14px,
    PoppinsMediumWhite14px,
    PoppinsNormalFiord16px,
} from '../../styles/styledMixins'

const FormWrapper = styled.div`
  align-items: flex-start;
  background-color: var(--white);
  display: flex;
  width: 100%;
`

const StyledLink = styled(Link)`
  ${ PoppinsMediumFiord14px };
  color: var(--endeavour);
  text-decoration: none;
  display: inline-block;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    transform: scaleX(0);
    bottom: -2px;
    left: 0;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
    background-color: var(--endeavour);
    width: 100%;
    height: 2px;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

const Form = styled.form.attrs({ id: 'signInForm' })`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 50%;
  row-gap: 24px;
  padding: 15%;
  height: 100vh;
`

const Title = styled.h1`
  ${ PoppinsBoldEndeavour32px };
  min-height: 48px;
  margin: 0;
`

const WelcomeBackPleaseEnterYourDetails = styled.p`
  ${ PoppinsNormalFiord16px };
  margin: 0;
  white-space: nowrap;
`

const SocialNetworks = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  margin-top: 54px;
`

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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

const DontHaveAnAccountSignUp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 24px;
  min-width: 257px;
`

const OverlapGroup = styled.div`
  width: 100%;
  height: 21px;
  position: relative;
  margin-top: 32px;
  margin-left: 1px;
`

const OrWrapper = styled.div`
  ${ PoppinsMediumFiord14px };
  position: absolute;
  top: -.25em;
  left: 0;
  min-height: 21px;
  width: 100%;
  text-align: center;

  & span {
    background-color: white;
    padding: 0 10px;
  }
`

const ImageWrapper = styled.div`
  width: 50%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(134, 176, 198);
`

const Image = styled.img`
  width: 100%;
`

export {
    Image,
    ImageWrapper,
    OrWrapper,
    FormWrapper,
    Form,
    Button,
    FlexRow,
    OverlapGroup,
    DontHaveAnAccountSignUp,
    SocialNetworks,
    WelcomeBackPleaseEnterYourDetails,
    StyledLink,
    Title,
}