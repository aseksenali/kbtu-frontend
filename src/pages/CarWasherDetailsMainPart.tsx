import CarWasherDetailsCard from '../components/CarWasherDetailsCard/CarWasherDetailsCard'
import ImageCarousel from '../components/ImageCarousel'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { useActiveCarWasher } from '../hooks/useActiveCarWasher'
import { useToggleLikeMutation } from '../redux/reducers/carWasherSlice'

const LeftSide = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding-left: 1.5em;
  row-gap: 1em;
  grid-area: card;
  z-index: 1;
`
const RightSide = styled.div`
  grid-area: carousel;
  padding-right: 1.5em;
`

const MainPart = styled.div`
  display: grid;
  grid-template-areas: 'card carousel';
  grid-template-columns: 40% auto;
`


const CarWasherDetailsMainPart = () => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [toggleLiked, { isLoading: isUpdating }] = useToggleLikeMutation()
    const { activeCarWasher, isLoading, error } = useActiveCarWasher()

    const toggleLike = () => {
        activeCarWasher && toggleLiked({ id: activeCarWasher.id, isLiked: !activeCarWasher.isLiked })
    }

    return (
        <MainPart>
            <LeftSide>
                { activeCarWasher &&
                    <CarWasherDetailsCard { ...activeCarWasher } isLiked={ activeCarWasher.isLiked } ref={ cardRef }
                                          toggleLiked={ toggleLike }/> }
            </LeftSide>
            <RightSide>
                { activeCarWasher && <ImageCarousel cardRef={ cardRef } images={ activeCarWasher.photo }/> }
            </RightSide>
        </MainPart>
    )
}

export default CarWasherDetailsMainPart