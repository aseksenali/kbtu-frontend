import CarWasherDetailsCard from "../components/CarWasherDetailsCard";
import ImageCarousel from "../components/ImageCarousel";
import React, {useRef} from "react";
import {toggleLike} from "../redux/reducers/carWasherSlice";
import {useAppDispatch} from "../hooks/redux";
import {useActiveCarWasher} from "./CarWasherDetails";
import styled from "styled-components";

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
    const dispatch = useAppDispatch()
    const cardRef = useRef<HTMLDivElement>(null)
    const toggleLiked = (id: string) => () => {
        dispatch(toggleLike(id))
    }
    const {activeCarWasher} = useActiveCarWasher()

    return (
        <MainPart>
            <LeftSide>
                {activeCarWasher && <CarWasherDetailsCard {...activeCarWasher} ref={cardRef}
                                                          toggleLiked={toggleLiked(activeCarWasher.id)}/>}
            </LeftSide>
            <RightSide>
                {activeCarWasher && <ImageCarousel cardRef={cardRef} images={activeCarWasher.photo}/>}
            </RightSide>
        </MainPart>
    )
}

export default CarWasherDetailsMainPart