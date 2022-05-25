import React from "react";
import styled from "styled-components";
import {PoppinsMediumFiord14px} from "../styles/styledMixins";
import StringHelper from "../helpers/stringHelper";

type CheckboxProps = {
    label: string
}

const Checkbox: React.FC<CheckboxProps> = props => {
    const text = StringHelper.capitalize(props.label)
    const id = StringHelper.labelize(props.label)

    return (
        <CheckboxWrapper>
            <Box id={id}/>
            <Label htmlFor={id}>
                <SVG viewBox="0 0 100 100">
                    <path className="box"
                          d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z"/>
                    <polyline className="check" points="33.5,50.5 44.5,62.5 66.5,40.5 " strokeLinecap={"round"} strokeLinejoin={"round"}/>
                </SVG>
                <span>{text}</span>
            </Label>
        </CheckboxWrapper>
    )
}

const SVG = styled.svg`
  background-color: white;
  color: white;
`

const Label = styled.label`
  ${PoppinsMediumFiord14px};
  min-height: 24px;
  display: inline-flex;
  align-items: center;
  user-select: none;
`;

const Box = styled.input.attrs({type: "checkbox"})`
  display: none;
  pointer-events: none;

  & + ${Label} {
    cursor: pointer;

    ${SVG} {
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

  &:checked + ${Label} {
    .check {
      stroke-dashoffset: 0;
    }
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Checkbox