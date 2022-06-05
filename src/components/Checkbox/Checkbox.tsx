import React, { forwardRef } from 'react'
import StringHelper from '../../helpers/stringHelper'
import { CheckboxProps } from './types'
import * as styles from './styles'

const Checkbox = forwardRef((props: CheckboxProps, _) => {
    const text = StringHelper.capitalize(props.label)
    const id = StringHelper.labelize(props.label)

    return (
        <styles.CheckboxWrapper>
            <styles.Box { ...props } checked={ props.value } id={ id }/>
            <styles.Label htmlFor={ id }>
                <styles.SVG viewBox="0 0 100 100">
                    <path className="box"
                          d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z"/>
                    <polyline className="check" points="33.5,50.5 44.5,62.5 66.5,40.5 " strokeLinecap={ 'round' }
                              strokeLinejoin={ 'round' }/>
                </styles.SVG>
                <span>{ text }</span>
            </styles.Label>
        </styles.CheckboxWrapper>
    )
})

export default Checkbox