import styled from 'styled-components'
import {
    PoppinsBoldFiord20px,
    PoppinsMediumWhite14px,
    PoppinsNormalFiord14px,
    PoppinsSemiBoldFiord16px,
} from '../../styles/styledMixins'

export const MapWrapper = styled.div`
  display: block;
  width: 100%;
  height: 10vh;
  min-height: 200px;
`

export const Button = styled.button.attrs({ type: 'submit', form: 'signInForm' })`
  ${ PoppinsMediumWhite14px };
  height: 50px;
  width: 100%;
  margin-top: 20px;
  background-color: var(--endeavour-2);
  border-radius: 40px;
  overflow: hidden;
  border: none;
  cursor: pointer;
  transition: box-shadow .3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 0 0 10px var(--endeavour-2);
  }

  &:active {
    transition: box-shadow .1s ease-in-out;
    box-shadow: none;
  }
`

export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const IconWithText = styled.div`
  display: flex;
  align-items: center;

  & > span {
    ${ PoppinsNormalFiord14px };
    margin-left: 1ex;
  }
`

export const Title = styled.span`
  ${ PoppinsBoldFiord20px };
  display: flex;
  align-items: center;
`

export const Subtitle = styled.span`
  ${ PoppinsSemiBoldFiord16px };
  display: flex;
  align-items: center;
`

export const CarWasherCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  border: 1px solid var(--nobel);
  border-radius: 40px;
  row-gap: 1em;
  margin: 0 2em;
`

export const Text = styled.span`
  ${ PoppinsNormalFiord14px };
`