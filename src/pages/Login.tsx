import React, {ChangeEvent, useState} from "react";
import styled from "styled-components";
import "../styles/SignInPage.scss"
import rightImage from "../assets/img/shutterstock_1255335763 1.png"
import googleIcon from "../assets/img/icons/google.svg"
import twitterIcon from "../assets/img/icons/twitter.svg"
import facebookIcon from "../assets/img/icons/facebook.svg"

import {
    PoppinsBoldEndeavour32px,
    PoppinsNormalFiord16px,
    PoppinsMediumWhite14px,
    PoppinsMediumFiord14px,
} from "../styles/styledMixins";
import TextInput from "../components/TextInput";
import Checkbox from "../components/Checkbox";
import {Link, Navigate} from "react-router-dom";
import SocialNetworkIcon, {SocialNetworkIconProps} from "../components/SocialNetworkIcon";
import {login, selectUser} from "../redux/reducers/userSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";

export default function Login() {
    const google: SocialNetworkIconProps = {
        socialNetwork: "Google",
        url: "",
        icon: googleIcon,
    }
    const twitter: SocialNetworkIconProps = {
        socialNetwork: "Twitter",
        url: "",
        icon: twitterIcon
    }
    const facebook: SocialNetworkIconProps = {
        socialNetwork: "Facebook",
        url: "",
        icon: facebookIcon
    }

    const networks = [google, twitter, facebook]
    const dispatch = useAppDispatch()
    const authentication = useAppSelector(selectUser)
    const onLoginClick = () => {
        dispatch(login({username: email, password: password}))
    }
    const [email, setEmail] = useState("")
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const [password, setPassword] = useState("")
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    if (authentication.status === 'succeeded') {
        return <Navigate to={"/"} replace/>
    } else {
        return (
            <div className="desktop-6">
                <Form>
                    <Title>
                        Sign In
                    </Title>
                    <WelcomeBackPleaseEnterYourDetails>
                        Welcome back! Please enter your details
                    </WelcomeBackPleaseEnterYourDetails>
                    <TextInput type="text" label="Email" placeholder="Enter Email" onChange={onEmailChange}/>
                    <TextInput type="password" label="Password" placeholder="Enter Password"
                               onChange={onPasswordChange}/>
                    <FlexRow>
                        <Checkbox label="Remember me?"/>
                        <StyledLink to="/login/forgot">Forgot password</StyledLink>
                    </FlexRow>
                    <Button onClick={onLoginClick}>
                        <span className="poppins-medium-white-14px">Sign In</span>
                    </Button>
                    <DontHaveAnAccountSignUp>
                        <span className="poppins-medium-fiord-16px">Don’t have an account?</span>
                        <StyledLink to="/register">Sign Up</StyledLink>
                    </DontHaveAnAccountSignUp>
                    <OverlapGroup>
                        <hr/>
                        <OrWrapper>
                            <span className="poppins-medium-fiord-14px">OR</span>
                        </OrWrapper>
                    </OverlapGroup>
                    <SocialNetworks>
                        {networks.map(props => {
                            return <SocialNetworkIcon {...props} key={props.socialNetwork}/>
                        })}
                    </SocialNetworks>
                </Form>
                <ImageWrapper>
                    <Image src={rightImage}/>
                </ImageWrapper>
            </div>
        );
    }
}

const StyledLink = styled(Link)`
  ${PoppinsMediumFiord14px};
  color: var(--endeavour);
  text-decoration: none;
  display: inline-block;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    transform: scaleX(0);
    bottom: -2px;
    left: 0;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
    background-color: var(--endeavour);
    width: 100%;
    height: 2px;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

const Form = styled.form.attrs({id: "signInForm"})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100vh;
`;

const Title = styled.h1`
  ${PoppinsBoldEndeavour32px};
  min-height: 48px;
  margin-left: 3px;
`;

const WelcomeBackPleaseEnterYourDetails = styled.p`
  ${PoppinsNormalFiord16px};
  min-height: 24px;
  margin-top: 8px;
  margin-left: 2px;
`;

const SocialNetworks = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  margin-top: 54px;
`

const FlexRow = styled.div`
  margin-top: 20px;
  margin-left: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 419px;
`;

const Button = styled.button.attrs({type: "button", form: "signInForm"})`
  ${PoppinsMediumWhite14px};
  height: 56px;
  margin-top: 20px;
  margin-left: 1px;
  padding: 0 185.5px;
  background-color: var(--endeavour-2);
  border-radius: 40px;
  overflow: hidden;
  border: none;
  cursor: pointer;
  transition: box-shadow .3s ease-in-out;

  &:hover {
    box-shadow: 0 0 10px var(--endeavour-2);
  }

  &:active {
    transition: box-shadow .1s ease-in-out;
    box-shadow: none;
  }
`;

const DontHaveAnAccountSignUp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 24px;
  margin-top: 20px;
  margin-left: 1px;
  min-width: 257px;
`;

const OverlapGroup = styled.div`
  width: 419px;
  height: 21px;
  position: relative;
  margin-top: 32px;
  margin-left: 1px;
`;

const OrWrapper = styled.div`
  ${PoppinsMediumFiord14px};
  position: absolute;
  top: -.25em;
  left: 0;
  min-height: 21px;
  width: 100%;
  text-align: center;

  & span {
    background-color: white;
    padding: 0 10px;
  }
`;

const ImageWrapper = styled.div`
  width: 50%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(134, 176, 198);
`

const Image = styled.img`
    width: 100%;
`;