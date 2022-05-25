import React from 'react'
import styled from "styled-components";
import {PoppinsMediumBlack20px, PoppinsMediumFiord14px, PoppinsNormalFiord14px} from "../styles/styledMixins";
import StringHelper from "../helpers/stringHelper";
import Rating from "./Rating";
import Price from "./Price";
import HeartIcon, {HeartProps} from "./HeartIcon";
import {CarWasher} from "../interfaces/CarWasher";
import {Avatar} from "@mui/material";

export type CarWasherCardProps = CarWasher & {
    toggleLiked: () => void,
    onClick: () => void
}

const Card = styled.div`
  display: flex;
  &:not(:first-child) {
    margin-top: 1em;
  }
  height: fit-content;
  flex-direction: column;
  padding: 24px;
  &:hover {
    cursor: pointer;
    background-color: var(--black-haze);
  }
  border-radius: 30px;
  gap: 1ex;
`

const Title = styled.span`
  ${PoppinsMediumBlack20px};
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  ${PoppinsNormalFiord14px};
`

const AdditionalInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

const IconWithText = styled.div`
  display: flex;
  align-items: center;

  & > span {
    ${PoppinsMediumFiord14px};
    margin-left: 1ex;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  & > img {
    border-radius: 50px;
    width: 64px;
    height: 64px;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const CarWasherCard: React.FC<CarWasherCardProps> = (props) => {
    const heartProps: HeartProps = {
        liked: props.isLiked,
        toggleLiked: props.toggleLiked
    }

    return (
        <Card onClick={props.onClick}>
            <Row>
                <Title>
                    {props.name}
                </Title>
                <HeartIcon {...heartProps} />
            </Row>
            <Row>
                <Text>
                    {StringHelper.formatAddress(props.address)}
                </Text>
            </Row>
            <Row style={{marginTop: ".8em", alignItems: 'flex-end'}}>
                <Row style={{justifyContent: "flex-start"}}>
                    <Avatar sx={{ width: 64, height: 64 }} src ={props.photo[0]} alt="logo"/>
                    <Column style={{marginLeft: '1em', height: "64px"}}>
                        <Rating score={props.rating}/>
                        <AdditionalInfo>
                            <IconWithText>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M12.0038 0.998032C5.94056 0.998032 0.996102 5.9347 0.996094 11.9979C0.996079 18.0611 5.94055 23.0036 12.0038 23.0036C18.067 23.0036 23.0017 18.0611 23.0017 11.9979C23.0017 5.9347 18.067 0.998032 12.0038 0.998032ZM12.0038 2.99801C16.9861 2.99801 21.0017 7.01556 21.0017 11.9979C21.0017 16.9802 16.9861 21.0036 12.0038 21.0036C7.02141 21.0036 2.99606 16.9802 2.99607 11.9979C2.99608 7.01556 7.02143 2.99801 12.0038 2.99801ZM11.9881 4.98431C11.856 4.98559 11.7254 5.01305 11.6039 5.0651C11.4825 5.11715 11.3725 5.19276 11.2804 5.28756C11.1883 5.38237 11.116 5.49448 11.0675 5.61742C11.019 5.74036 10.9953 5.8717 10.9979 6.00383V11.9979C10.9985 12.1295 11.025 12.2597 11.0759 12.381C11.1268 12.5023 11.2012 12.6124 11.2948 12.7049L15.2947 16.7068C15.3872 16.8025 15.4977 16.8788 15.62 16.9312C15.7423 16.9836 15.8738 17.0111 16.0068 17.0121C16.1398 17.0131 16.2717 16.9875 16.3947 16.9369C16.5177 16.8863 16.6294 16.8116 16.7232 16.7173C16.817 16.6229 16.8911 16.5108 16.941 16.3876C16.991 16.2643 17.0158 16.1322 17.0141 15.9992C17.0124 15.8662 16.9842 15.7349 16.9311 15.6129C16.878 15.4909 16.8011 15.3808 16.7049 15.2889L12.9998 11.5838V6.00383C13.0025 5.86988 12.9781 5.73678 12.9283 5.61242C12.8785 5.48806 12.8042 5.37498 12.7098 5.27988C12.6155 5.18479 12.503 5.10962 12.379 5.05885C12.255 5.00808 12.1221 4.98273 11.9881 4.98431Z"
                                          fill="#465564"/>
                                </svg>
                                <span>today {StringHelper.formatWorkTime(props.workingHours)}</span>
                            </IconWithText>
                            <IconWithText style={{marginLeft: '1em'}}>
                                <svg width="18" height="22" viewBox="0 0 18 22" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3.35388 15.1268L3.35354 15.1264C1.85601 13.6289 1.01471 11.5978 1.01471 9.48C1.01471 7.36217 1.85601 5.33108 3.35354 3.83355C4.85107 2.33602 6.88216 1.49472 8.99999 1.49472C11.1178 1.49472 13.1489 2.33602 14.6464 3.83355C16.1373 5.32446 16.9749 7.34655 16.9749 9.455C16.9749 11.5634 16.1373 13.5855 14.6464 15.0764L14.6458 15.0771L9.33577 20.4071L9.33499 20.4079C9.28851 20.4548 9.23321 20.492 9.17228 20.5173C9.11135 20.5427 9.046 20.5558 8.97999 20.5558C8.91398 20.5558 8.84863 20.5427 8.7877 20.5173C8.72677 20.492 8.67147 20.4548 8.62499 20.4079L8.62388 20.4068L3.35388 15.1268ZM8.64567 18.9428L8.99999 19.2987L9.35431 18.9428L13.9237 14.3534C13.9238 14.3533 13.9239 14.3532 13.9239 14.3532C14.8965 13.3796 15.5587 12.1395 15.8267 10.7897C16.0948 9.43973 15.9566 8.04064 15.4296 6.76923C14.9026 5.49783 14.0105 4.4112 12.8661 3.64671C11.7217 2.88222 10.3763 2.47418 8.99999 2.47418C7.6237 2.47418 6.27831 2.88222 5.13388 3.64671C3.98946 4.4112 3.09737 5.49783 2.5704 6.76923C2.04343 8.04064 1.90522 9.43973 2.17326 10.7897C2.44128 12.1395 3.10344 13.3796 4.07605 14.3532C4.07613 14.3532 4.0762 14.3533 4.07628 14.3534L8.64567 18.9428ZM5.23939 9.46C5.23939 8.44945 5.63981 7.48009 6.35295 6.76415C6.70877 6.41222 7.1306 6.13404 7.59424 5.94559C8.05839 5.75692 8.55528 5.6619 9.05629 5.66601C9.55731 5.67012 10.0526 5.77326 10.5136 5.96951C10.9746 6.16576 11.3922 6.45124 11.7425 6.80952L11.7424 6.80957L11.7486 6.81569C12.1043 7.16707 12.3859 7.5862 12.5768 8.0483C12.7676 8.51019 12.8639 9.00565 12.86 9.50539C12.8521 10.2556 12.6228 10.9867 12.201 11.6071C11.7791 12.2277 11.1833 12.7099 10.4883 12.9931C9.79341 13.2764 9.03032 13.3481 8.29478 13.1993C7.55936 13.0506 6.88423 12.688 6.35409 12.157C5.64024 11.4409 5.23939 10.4711 5.23939 9.46ZM11.0462 11.4409L11.8843 10.59H11.6006C11.761 10.2422 11.8507 9.86208 11.8599 9.47178L11.86 9.47178L11.86 9.46108C11.8614 8.80516 11.6349 8.16912 11.2193 7.6617C10.8037 7.15428 10.2247 6.80698 9.58134 6.6792C8.93799 6.55141 8.27023 6.65107 7.69222 6.96113C7.11421 7.27119 6.66186 7.7724 6.41249 8.37907C6.16313 8.98573 6.13224 9.66018 6.3251 10.2871C6.51797 10.914 6.92261 11.4545 7.46985 11.8161C8.0171 12.1777 8.67295 12.338 9.32529 12.2695C9.97763 12.2011 10.5859 11.9082 11.0462 11.4409Z"
                                        fill="black" stroke="#465564"/>
                                </svg>
                                <span>{props.distance}km</span>
                            </IconWithText>
                        </AdditionalInfo>
                    </Column>
                </Row>
                <Price amount={props.price}/>
            </Row>
        </Card>
    )
}

export default CarWasherCard;