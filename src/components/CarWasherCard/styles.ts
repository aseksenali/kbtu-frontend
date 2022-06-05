import styled from 'styled-components'
import { PoppinsMediumBlack20px, PoppinsMediumFiord14px, PoppinsNormalFiord14px } from '../../styles/styledMixins'

const Card = styled.div`
  display: flex;

  &:not(:first-child) {
    margin-top: 1em;
  }

  height: fit-content;
  flex-direction: column;
  padding: 24px;

  &:hover {
    cursor: pointer;
    background-color: var(--black-haze);
  }

  border-radius: 30px;
  gap: 1ex;
`

const Title = styled.span`
  ${ PoppinsMediumBlack20px };
  display: flex;
  align-items: center;
`

const Text = styled.span`
  ${ PoppinsNormalFiord14px };
`

const AdditionalInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

const IconWithText = styled.div`
  display: flex;
  align-items: center;

  & > span {
    ${ PoppinsMediumFiord14px };
    margin-left: 1ex;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  & > img {
    border-radius: 50px;
    width: 64px;
    height: 64px;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export { Row, Column, Card, Text, IconWithText, Title, AdditionalInfo }