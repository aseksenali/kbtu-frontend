import React, {RefObject, useState} from 'react'
import styled from "styled-components";
import useSize from "../hooks/useSize";

type ImageCarouselPropsType = {
    images: string[],
    cardRef: RefObject<HTMLDivElement>
}

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`

const MainImageWrapper = styled.div`
  border-radius: 40px;
  height: 75%;
  width: 100%;
  background: url(${(props: { imgUrl: string }) => props.imgUrl}) center/cover;
`

const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1.5em;
  height: 25%;
`

const ImageList = styled.div`
  display: flex;
  justify-content: center;
  white-space: nowrap;
  width: 60%;
  column-gap: 1.5em;

  & > img {
    display: inline-block;
    width: 30%;
    border-radius: 20px;
    cursor: pointer;

    &.active {
      box-shadow: 0 0 10px var(--endeavour-2);
      user-select: none;
    }
  }
`

const Arrow = styled.svg`
  &.disabled > path {
    fill: var(--nobel);
    stroke: var(--nobel);
  }
`

const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  
  &:disabled {
    cursor: auto;
  }
`

const ImageCarousel = (props: ImageCarouselPropsType) => {
    const size = useSize(props.cardRef)

    const [active, setActive] = useState(0)
    const nextIndex = active + 1
    const prevIndex = active - 1
    const lastIndex = props.images.length - 1

    const onImageClick = (image: number) => () => setActive(image)

    const onBackArrowClick = () => setActive(prevIndex)
    const onForwardArrowClick = () => setActive(nextIndex)

    return (
        <CarouselWrapper style={{height: size ? `${size.top + size.bottom}px` : '70%'}}>
            <MainImageWrapper imgUrl={props.images[active]}/>
            <BottomWrapper>
                <Button onClick={onBackArrowClick} disabled={prevIndex < 0}>
                    <Arrow width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg"
                           className={prevIndex < 0 ? 'disabled' : ''}>
                        <path
                            d="M12.7504 26.4434L1.37263 15.2653C1.04744 14.85 0.899994 14.4161 0.899994 14.0001C0.899994 13.5841 1.04744 13.1502 1.37263 12.7349L12.7504 1.55677L12.7504 1.55678L12.7535 1.55365C12.924 1.38317 13.0746 1.27519 13.2281 1.207C13.3793 1.13978 13.5583 1.1001 13.8 1.1001C14.0417 1.1001 14.2207 1.13978 14.3719 1.207C14.5253 1.27519 14.676 1.38317 14.8464 1.55365C15.4512 2.15839 15.4512 3.04181 14.8464 3.64654L14.8464 3.64653L14.8429 3.65013L5.04289 13.6501L4.69992 14.0001L5.04289 14.3501L14.8429 24.3501L14.8429 24.3501L14.8464 24.3537C15.4512 24.9584 15.4512 25.8418 14.8464 26.4465C14.2417 27.0513 13.3583 27.0513 12.7535 26.4465L12.7504 26.4434Z"
                            fill="black" stroke="#465564"/>
                    </Arrow>
                </Button>
                <ImageList>
                    {nextIndex > lastIndex && prevIndex - 1 >= 0 &&
                        <img src={props.images[prevIndex - 1]} onClick={onImageClick(prevIndex - 1)}
                             alt={`${prevIndex - 1}`}/>}
                    {prevIndex >= 0 &&
                        <img src={props.images[prevIndex]} onClick={onImageClick(prevIndex)} alt={`${prevIndex}`}/>}
                    <img src={props.images[active]} className={"active"} onClick={onImageClick(active)}
                         alt={`${active}`}/>
                    {nextIndex <= lastIndex &&
                        <img src={props.images[nextIndex]} onClick={onImageClick(nextIndex)} alt={`${nextIndex}`}/>}
                    {prevIndex < 0 && nextIndex + 1 <= lastIndex &&
                        <img src={props.images[nextIndex + 1]} onClick={onImageClick(nextIndex + 1)}
                             alt={`${nextIndex + 1}`}/>}
                </ImageList>
                <Button onClick={onForwardArrowClick} disabled={nextIndex > lastIndex}>
                    <Arrow width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg"
                           className={nextIndex > lastIndex ? 'disabled' : ''}>
                        <path
                            d="M3.40503 1.63217L3.40502 1.63218L3.40678 1.63394L14.7268 12.9339L15.08 12.5801L14.741 12.9476C14.8932 13.088 15.0148 13.2585 15.0979 13.4483C15.181 13.638 15.2239 13.8429 15.2239 14.0501C15.2239 14.2572 15.181 14.4621 15.0979 14.6519C15.0148 14.8416 14.8932 15.0121 14.741 15.1526L14.7338 15.1593L14.7268 15.1662L3.40678 26.4662L3.40676 26.4662L3.40295 26.4701C3.26403 26.6118 3.09836 26.7246 2.91555 26.8018C2.73337 26.8788 2.53779 26.919 2.34003 26.9201C2.14227 26.919 1.94668 26.8788 1.7645 26.8018C1.58169 26.7246 1.41602 26.6118 1.27711 26.4701L1.27463 26.4676C0.995252 26.1865 0.83844 25.8064 0.83844 25.4101C0.83844 25.014 0.995101 24.634 1.27422 24.353C1.27436 24.3528 1.27449 24.3527 1.27463 24.3526L11.1736 14.4536L11.5254 14.1018L11.1754 13.7483L1.27535 3.7483L1.27463 3.74757C0.995252 3.46653 0.83844 3.08635 0.83844 2.69007C0.83844 2.29379 0.995252 1.91362 1.27463 1.63257L1.27502 1.63217C1.41447 1.49158 1.58037 1.37999 1.76316 1.30384C1.94595 1.22768 2.14201 1.18848 2.34002 1.18848C2.53804 1.18848 2.7341 1.22768 2.91689 1.30384C3.09968 1.37999 3.26558 1.49158 3.40503 1.63217Z"
                            fill="black" stroke="#465564"/>
                    </Arrow>
                </Button>
            </BottomWrapper>
        </CarouselWrapper>
    )
}

export default ImageCarousel