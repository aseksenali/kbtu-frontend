import React from 'react'
import styled from "styled-components";
import {PoppinsSemiBoldFiord16px} from "../styles/styledMixins";

type RatingProps = {
    score: number
}

type Side = 'left' | 'right'
type StarHalfType = 'empty' | 'filled'
type StarType = 'empty' | 'half' | 'full'


const Stars = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 1ex;
`

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Text = styled.span`
  ${PoppinsSemiBoldFiord16px};
`

const StarHalf = styled.path.attrs<{ side: Side }, { d: string }>((props) => ({
    d: props.side === "left" ?
        "m12,18.6376l-5.09668,2.6294c-0.16513,0.0852 -0.35127,0.1235 -0.53738,0.1103c-0.18611,-0.0131 -0.36476,-0.0771 -0.51575,-0.1847c-0.15099,-0.1075 -0.26828,-0.2544 -0.33863,-0.424c-0.07034,-0.1696 -0.09092,-0.3551 -0.05941,-0.5355l0.97363,-5.5692l-4.124,-3.9441c-0.13358,-0.1278 -0.22804,-0.2897 -0.27271,-0.4674c-0.04466,-0.1778 -0.03775,-0.36424 0.01997,-0.53832c0.05771,-0.17408 0.16392,-0.32884 0.30662,-0.44678c0.14269,-0.11793 0.31617,-0.19432 0.50081,-0.22054l5.69824,-0.81257l2.54879,-5.06708c0.0919,-0.1532 0.2229,-0.28021 0.3802,-0.36845c0.1572,-0.08824 0.3352,-0.13466 0.5163,-0.13466l0,15.9736z" :
        "m17.5625,21.3801c-0.1623,-0.0001 -0.3222,-0.0389 -0.4658,-0.1131l-5.0967,-2.6294c-0.3591,-15.92718 -0.1811,-15.9736 0,-15.9736c0.1812,0 0.3592,0.04642 0.5164,0.13466c0.1573,0.08824 0.2883,0.21525 0.3801,0.36845l2.5489,5.06708l5.6982,0.81257c0.1847,0.02622 0.3581,0.10261 0.5008,0.22054c0.1427,0.11794 0.2489,0.2727 0.3066,0.44678c0.0578,0.17408 0.0647,0.36052 0.02,0.53832c-0.0447,0.1777 -0.1391,0.3396 -0.2727,0.4674l-4.124,3.9441l0.9736,5.5692c0.0246,0.1408 0.0175,0.2851 -0.0207,0.423c-0.0381,0.1378 -0.1065,0.2659 -0.2004,0.3751c-0.0938,0.1092 -0.2108,0.197 -0.3428,0.2573c-0.132,0.0603 -0.2758,0.0915 -0.4214,0.0916l-0.0001,0z"
}))<{ side: Side, type: StarHalfType }>`
  fill: ${props => {
    switch (props.type) {
      case 'filled':
        return '#ffd037'
      case 'empty':
        return '#b6b6b6'
    }
  }};
`

const renderStar = (type: StarType) => {
    let types: {
        left: StarHalfType,
        right: StarHalfType
    };
    switch (type) {
        case 'empty':
            types = {left: 'empty', right: 'empty'}
            break;
        case 'half':
            types = {left: 'filled', right: 'empty'}
            break;
        case 'full':
            types = {left: 'filled', right: 'filled'}
            break;
    }
    return (
        <>
            <StarHalf type={types.left} side="left"/>
            <StarHalf type={types.right} side="right"/>
        </>
    )
}

const Star = (props: { type: StarType }) =>
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none">
        <g>
            {renderStar(props.type)}
        </g>
    </svg>

const renderStars = (score: number) => {
    let types: StarType[] = [];
    const floorScore = Math.floor(score)
    const fraction = score - floorScore
    const fullAmount = fraction >= 0.75 ? floorScore + 1 : floorScore
    const isHalf = fraction >= 0.25 && fraction < 0.75
    for (let i = 0; i < fullAmount; i++) {
        types.push('full')
    }
    if (isHalf) types.push('half')
    for (let i = types.length; i < 5; i++) {
        types.push('empty')
    }
    return types.map((type, index) => <Star type={type} key={index}/>)
}

const Rating: React.FC<RatingProps> = (props) => {
    return (
        <RatingWrapper>
            <Stars>
                {renderStars(props.score)}
            </Stars>
            <Text>
                <span>{props.score}</span>
            </Text>
        </RatingWrapper>
    )
}

export default Rating;