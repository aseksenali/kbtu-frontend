import React, {forwardRef} from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";
import logo from "../assets/img/clickWash-3 1.png"
import HeartIcon from "./HeartIcon";
import {PoppinsNormalEndeavour14px} from "../styles/styledMixins";
import {useAppSelector} from "../hooks/redux";
import {selectUser} from "../redux/reducers/userSlice";
import {Avatar} from "@mui/material";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10%;
  height: 104px;
  box-shadow: rgba(0, 0, 0, .14) 0 1px 5px;
`

const Button = styled.button`
  ${PoppinsNormalEndeavour14px};
  padding: .5em 1.5em;
  background-color: white;
  border: 1px solid var(--endeavour-2);
  border-radius: 10px;
  transition: all .1s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: var(--endeavour-2);
    color: white;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 20px;
  width: 13%;
`

const ProfileButtons = () => {
    const authentication = useAppSelector(selectUser)

    if (authentication && authentication.status === 'succeeded' && authentication.tokens) {
        return (
            <ButtonWrapper>
                <Link to={"/liked"}>
                    <HeartIcon liked={false} />
                </Link>
                <Link to={"/profile"}>
                    <Avatar sx={{ width: 60, height: 60 }} src={authentication.tokens.access_token} alt={"profilePic"} />
                </Link>
            </ButtonWrapper>
        )
    } else {
        return (
            <ButtonWrapper style={{minWidth: '205px'}}>
                <Link to={"/login"}>
                    <Button>Sign in</Button>
                </Link>
                <Link to={"/sign_up"}>
                    <Button>Sign up</Button>
                </Link>
            </ButtonWrapper>
        )
    }
}

const Header = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <HeaderWrapper style={{boxSizing: 'content-box'}} ref={ref}>
            <Link to={"/"}>
                <img src={logo}  alt={"logo"}/>
            </Link>
            <ProfileButtons />
        </HeaderWrapper>
    )
})

export default Header;