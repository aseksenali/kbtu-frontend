import styled from 'styled-components'
import { PoppinsMediumFiord16px, PoppinsMediumNobel16px, PoppinsNormalFiord14px } from '../styles/styledMixins'
import React, { forwardRef, useMemo, useState } from 'react'
import StringHelper from '../helpers/stringHelper'
import { ReactComponent as EyeIcon } from '../assets/img/icons/eye.svg'
import { ReactComponent as SlashEyeIcon } from '../assets/img/icons/eye_slash.svg'
import { ControllerRenderProps, FieldErrors} from 'react-hook-form'

type TextInputProps = {
    label: string
    placeholder: string
    type: string
    isSameLevel: boolean
    errors?: FieldErrors
} & ControllerRenderProps

type EyeProps = {
    toggleVisibility: () => void
}


const Eye = (props: EyeProps) => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        setVisible(!visible)
        props.toggleVisibility()
    }

    return (
        <EyeWrapper onClick={ toggleVisible }>
            { visible ? <EyeIcon/> : <SlashEyeIcon/> }
        </EyeWrapper>
    )
}

const TextInput = forwardRef((props: TextInputProps, _) => {
    const placeholder = useMemo(() => StringHelper.capitalize(props.placeholder), [props.placeholder])
    const text = useMemo(() => StringHelper.capitalize(props.label), [props.label])
    const id = useMemo(() => StringHelper.labelize(props.label), [props.label])
    const isInvalid: boolean = useMemo(() => props.errors && props.errors[props.name] && true, [props.errors, props.name])
    const [visible, setVisible] = useState(false)

    const type = useMemo(() => visible ? 'text' : props.type, [props.type, visible])

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <InputWrapper>
            <Label htmlFor={ id }>{ text }</Label>
            { type !== 'textarea' ?
                <Input { ...props } isValid={ !isInvalid } type={ type }
                       placeholder={ placeholder } id={ id }/> :
                <Textarea { ...props } isValid={ !isInvalid }
                          placeholder={ placeholder } id={ id } rows={ 4 }/> }
            { props.type === 'password' && <Eye toggleVisibility={ toggleVisibility }/> }
            { isInvalid && <ErrorWrapper>{ props.errors?.[props.name] }</ErrorWrapper> }
        </InputWrapper>
    )
})

const ErrorWrapper = styled.span`
  ${ PoppinsNormalFiord14px };
  color: var(--cinnabar);
`

const InputWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 30px;
  grid-template-rows: calc(1.5em + 4px) 1fr;
  grid-template-areas: 
          "label label"
          "input input";
  min-height: 84px;
`

const Label = styled.label`
  ${ PoppinsMediumFiord16px };
  grid-area: label;
  min-height: 24px;
`

type InputProps = {
    isSameLevel: boolean
    isValid: boolean
}

const Input = styled.input<InputProps>`
  ${ PoppinsMediumFiord16px };
  border: ${ props => `1px solid ${ props.isValid ? 'var(--nobel)' : 'var(--cinnabar)' }` };
  grid-area: input;
  position: ${ props => props.isSameLevel && 'relative' };
  left: ${ props => props.isSameLevel && '-16px' };
  width: ${ props => props.isSameLevel ? 'calc(100% + 32px)' : '100%' };
  height: 56px;
  padding: .7em 16px;
  box-sizing: border-box;
  border-radius: 40px;

  &:focus, &:focus-visible {
    outline: none;
    border: ${ props => `1px solid ${ props.isValid ? 'var(--endeavour)' : 'var(--cinnabar)' }` };

    &::placeholder {
      color: ${ props => `${ props.isValid ? 'var(--endeavour)' : 'var(--cinnabar)' }` };
    }
  }

  &::placeholder {
    ${ PoppinsMediumNobel16px };
    color: ${ props => `${ props.isValid ? 'var(--nobel)' : 'var(--cinnabar)' }` };
    min-height: 24px;
    min-width: 91px;
  }
`

const Textarea = styled.textarea<InputProps>`
  ${ PoppinsMediumFiord16px };
  box-sizing: border-box;
  grid-area: input;
  width: 100%;
  position: ${ props => props.isSameLevel && 'relative' };
  left: ${ props => props.isSameLevel && '-16px' };
  padding: .7em 16px;
  border: ${ props => `1px solid ${ props.isValid ? 'var(--nobel)' : 'var(--cinnabar)' }` };
  border-radius: 30px;
  resize: none;

  &:focus, &:focus-visible {
    outline: none;
    border: ${ props => `1px solid ${ props.isValid ? 'var(--endeavour)' : 'var(--cinnabar)' }` };

    &::placeholder {
      color: ${ props => `${ props.isValid ? 'var(--endeavour)' : 'var(--cinnabar)' }` };
    }
  }

  &::placeholder {
    ${ PoppinsMediumNobel16px };
    color: ${ props => `${ props.isValid ? 'var(--nobel)' : 'var(--cinnabar)' }` };
    min-height: 24px;
    min-width: 91px;
  }
`

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
  }
`

export default TextInput