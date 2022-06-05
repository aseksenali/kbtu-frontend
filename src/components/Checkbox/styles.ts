import styled from 'styled-components'
import { PoppinsMediumFiord14px } from '../../styles/styledMixins'

const SVG = styled.svg`
  background-color: white;
  color: white;
`

const Label = styled.label`
  ${ PoppinsMediumFiord14px };
  min-height: 24px;
  display: inline-flex;
  align-items: center;
  user-select: none;
`

const Box = styled.input.attrs({ type: 'checkbox' })`
  display: none;
  pointer-events: none;

  & + ${ Label } {
    cursor: pointer;

    ${ SVG } {
      width: 2em;
      stroke: var(--endeavour);
      stroke-width: 10;
      fill: white;

      .check {
        stroke-dasharray: 70;
        stroke-dashoffset: 70;
        fill: none;
        transition: stroke-dashoffset .2s linear;
      }
    }

    span {
      margin-left: .3em;
    }
  }

  &:checked + ${ Label } {
    .check {
      stroke-dashoffset: 0;
    }
  }
`

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export { SVG, Box, Label, CheckboxWrapper }