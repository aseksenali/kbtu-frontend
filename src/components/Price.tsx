import React from 'react'
import styled from "styled-components";
import {PoppinsMediumFiord14px, PoppinsNormalEndeavour24px} from "../styles/styledMixins";

type PriceProps = {
    amount: number
}

const PriceWrapper = styled.span`
  ${PoppinsMediumFiord14px};
  white-space: nowrap;
  &>.price {
    ${PoppinsNormalEndeavour24px};
  }
`

const Price: React.FC<PriceProps> = (props) => {
    return (
        <>
            <PriceWrapper>per hour / <span className={"price"}>{props.amount}₸</span></PriceWrapper>
        </>
    )
}

export default Price;