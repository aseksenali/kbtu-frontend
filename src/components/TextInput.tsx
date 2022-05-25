import styled from "styled-components";
import {
    Border1pxNobel,
    PoppinsMediumFiord16px,
    PoppinsMediumNobel16px
} from "../styles/styledMixins";
import React, {ChangeEvent, useState} from "react";
import StringHelper from "../helpers/stringHelper";
import {ReactComponent as EyeIcon} from "../assets/img/icons/eye.svg"
import {ReactComponent as SlashEyeIcon} from "../assets/img/icons/eye_slash.svg"


type TextInputProps = {
    label: string,
    placeholder: string,
    type: string,
    onChange: (value: ChangeEvent<HTMLInputElement>) => void
}

type EyeProps = {
    toggleVisibility: () => void
}


const Eye: React.FC<EyeProps> = props => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        setVisible(!visible)
        props.toggleVisibility()
    }

    return (
        <EyeWrapper onClick={toggleVisible}>
            {visible ? <EyeIcon/> : <SlashEyeIcon/>}
        </EyeWrapper>
    )
}

const TextInput: React.FC<TextInputProps> = props => {
    const placeholder = StringHelper.capitalize(props.placeholder)
    const text = StringHelper.capitalize(props.label)
    const id = StringHelper.labelize(props.label)

    const [visible, setVisible] = useState(false)

    const type = visible ? "text" : props.type;

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <InputWrapper>
            <Label htmlFor={id}>{text}</Label>
            <Input type={type} placeholder={placeholder} id={id} onChange={props.onChange}/>
            {props.type === "password" && <Eye toggleVisibility={toggleVisibility}/>}
        </InputWrapper>
    );
}

const InputWrapper = styled.div`
  width: 421px;
  margin-top: 24px;
  display: grid;
  grid-template-columns: auto 30px;
  grid-template-rows: calc(1.5em + 4px) 1fr;
  grid-template-areas: 
          "label label"
          "input input";
  min-height: 84px;
`;

const Label = styled.label`
  ${PoppinsMediumFiord16px};
  grid-area: label;
  min-height: 24px;
`;

const Input = styled.input`
  ${Border1pxNobel};
  ${PoppinsMediumFiord16px};
  grid-area: input;
  width: 100%;
  height: 56px;
  position: relative;
  left: -16px;
  padding: 0 16px;
  border-radius: 40px;

  &::placeholder {
    ${PoppinsMediumNobel16px};
    min-height: 24px;
    min-width: 91px;
  }
`;

const EyeWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  grid-column: 2;
  grid-row: 2;
  z-index: 5;
  & svg {
    fill: var(--endeavour-2);
  };
`;

export default TextInput