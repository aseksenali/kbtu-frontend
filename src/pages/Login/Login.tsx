import React, { useEffect, useMemo } from 'react'
import rightImage from '../../assets/img/shutterstock_1255335763 1.png'

import TextInput from '../../components/TextInput'
import Checkbox from '../../components/Checkbox/Checkbox'
import { useNavigate } from 'react-router-dom'
import SocialNetworkIcon from '../../components/SocialNetworkIcon'
import { useAppDispatch } from '../../hooks/redux'
import { Controller, useForm } from 'react-hook-form'
import { LoginFormData } from '../../interfaces/FormTypes'
import { setToken, useLoginMutation } from '../../redux/reducers/userSlice'
import { Tokens } from '../../redux/interfaces/states'
import * as styles from './styles'


const Login = () => {
    const { handleSubmit, formState: { errors }, control } = useForm<LoginFormData>()
    const [login, result] = useLoginMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onLoginClick = handleSubmit((data) => {
        data.email && data.password && login({
            username: data.email,
            password: data.password,
        })
    })

    const token = useMemo<Tokens | undefined>(() => {
        return result.data && { accessToken: result.data.accessToken, refreshToken: result.data.refreshToken }
    }, [result])

    useEffect(() => {
        if (token) {
            dispatch(setToken(token))
            navigate('/')
        }
    }, [dispatch, navigate, token])

    useEffect(() => {
        const listener = async (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.preventDefault()
                e.stopPropagation()
                await onLoginClick()
            }
        }
        document.addEventListener('keydown', listener)
        return () => {
            document.removeEventListener('keydown', listener)
        }
    }, [onLoginClick])

    return (
        <styles.FormWrapper>
            <styles.Form>
                <styles.Title>
                    Sign In
                </styles.Title>
                <styles.WelcomeBackPleaseEnterYourDetails>
                    Welcome back! Please enter your details
                </styles.WelcomeBackPleaseEnterYourDetails>
                <Controller control={ control }
                            name={ 'email' }
                            rules={ {
                                required: true,
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Invalid email address',
                                },
                            } }
                            defaultValue={ '' }
                            render={ ({ field }) => <TextInput { ...field }
                                                               isSameLevel={ true }
                                                               type="text"
                                                               label="Email" placeholder="Enter Email"
                                                               errors={ errors }/> }/>
                <Controller control={ control }
                            name={ 'password' }
                            defaultValue={ '' }
                            render={ ({ field }) => <TextInput { ...field }
                                                               isSameLevel={ true }
                                                               type="password"
                                                               label="Password" placeholder="Enter Password"
                                                               errors={ errors }/> }/>
                <styles.FlexRow>
                    <Controller control={ control } name={ 'rememberMe' }
                                render={ ({ field }) => <Checkbox { ...field }
                                                                  label="Remember me?"/> }/>
                    <styles.StyledLink to="/login/forgot">Forgot password</styles.StyledLink>
                </styles.FlexRow>
                <styles.Button onClick={ onLoginClick }>
                    <span className="poppins-medium-white-14px">Sign In</span>
                </styles.Button>
                <styles.DontHaveAnAccountSignUp>
                    <span className="poppins-medium-fiord-16px">Don’t have an account?</span>
                    <styles.StyledLink to="/register">Sign Up</styles.StyledLink>
                </styles.DontHaveAnAccountSignUp>
                <styles.OverlapGroup>
                    <hr/>
                    <styles.OrWrapper>
                        <span className="poppins-medium-fiord-14px">OR</span>
                    </styles.OrWrapper>
                </styles.OverlapGroup>
                <styles.SocialNetworks>
                    <SocialNetworkIcon socialNetwork={ 'google' } url={ '' }>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_31_2003)">
                                <path
                                    d="M24.4873 12.5097C24.4873 11.5035 24.4057 10.7693 24.229 10.0078H12.739V14.5493H19.4834C19.3475 15.6779 18.6132 17.3776 16.9815 18.5198L16.9586 18.6718L20.5915 21.4862L20.8432 21.5113C23.1547 19.3765 24.4873 16.2354 24.4873 12.5097Z"
                                    fill="#4285F4"/>
                                <path
                                    d="M12.739 24.4757C16.0432 24.4757 18.817 23.3879 20.8431 21.5115L16.9814 18.5199C15.948 19.2406 14.561 19.7437 12.739 19.7437C9.50282 19.7437 6.75615 17.6089 5.77703 14.6582L5.63352 14.6704L1.85598 17.5939L1.80658 17.7312C3.81899 21.7289 7.95265 24.4757 12.739 24.4757Z"
                                    fill="#34A853"/>
                                <path
                                    d="M5.77705 14.6582C5.5187 13.8967 5.36919 13.0808 5.36919 12.2378C5.36919 11.3947 5.5187 10.5789 5.76346 9.81743L5.75662 9.65526L1.93173 6.68481L1.80659 6.74434C0.977171 8.40326 0.501251 10.2662 0.501251 12.2378C0.501251 14.2094 0.977171 16.0723 1.80659 17.7312L5.77705 14.6582Z"
                                    fill="#FBBC05"/>
                                <path
                                    d="M12.7391 4.7319C15.037 4.7319 16.5871 5.72451 17.471 6.55402L20.9248 3.18182C18.8036 1.21018 16.0433 0 12.7391 0C7.95268 0 3.819 2.74667 1.80658 6.74431L5.76347 9.81739C6.75618 6.86673 9.50287 4.7319 12.7391 4.7319Z"
                                    fill="#EB4335"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_31_2003">
                                    <rect width="24" height="24.56" fill="white" transform="translate(0.5)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </SocialNetworkIcon>
                    <SocialNetworkIcon socialNetwork={ 'twitter' } url={ '' }>
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_31_2009)">
                                <path
                                    d="M12.5001 24C19.1275 24 24.5001 18.6274 24.5001 12C24.5001 5.37259 19.1275 0 12.5001 0C5.87262 0 0.500031 5.37259 0.500031 12C0.500031 18.6274 5.87262 24 12.5001 24Z"
                                    fill="#2DAAE1"/>
                                <path
                                    d="M20.1942 7.22662C19.6282 7.47778 19.0202 7.64757 18.381 7.72389C19.0334 7.33326 19.5331 6.71423 19.7691 5.97749C19.1494 6.34555 18.4712 6.60466 17.764 6.74357C17.1884 6.13009 16.3677 5.74707 15.4597 5.74707C13.7168 5.74707 12.3034 7.15996 12.3034 8.90383C12.3034 9.15092 12.3312 9.39198 12.3847 9.62342C9.76105 9.49156 7.43502 8.23482 5.87808 6.32518C5.60622 6.79157 5.45061 7.33383 5.45061 7.91239C5.45061 9.00745 6.00798 9.97364 6.8549 10.5396C6.35354 10.5241 5.86318 10.3887 5.42481 10.1449V10.1848C5.42481 11.7145 6.51279 12.9899 7.95703 13.28C7.69172 13.3527 7.4133 13.3906 7.12526 13.3906C6.92161 13.3906 6.72403 13.3714 6.53101 13.3351C6.93273 14.5888 8.09858 15.5014 9.47957 15.5272C8.39917 16.3741 7.03782 16.879 5.55924 16.879C5.30457 16.879 5.05288 16.8638 4.80579 16.834C6.20304 17.7299 7.86205 18.2529 9.64484 18.2529C15.4511 18.2529 18.6266 13.4427 18.6266 9.27125C18.6266 9.1343 18.6236 8.99837 18.617 8.86292C19.2357 8.41543 19.7697 7.86135 20.1942 7.22662Z"
                                    fill="white"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_31_2009">
                                    <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </SocialNetworkIcon>
                    <SocialNetworkIcon socialNetwork={ 'facebook' } url={ '' }>
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_31_2013)">
                                <path
                                    d="M24.5 12C24.5 5.37258 19.1274 0 12.5 0C5.87258 0 0.5 5.37258 0.5 12C0.5 17.9895 4.88823 22.954 10.625 23.8542V15.4688H7.57812V12H10.625V9.35625C10.625 6.34875 12.4165 4.6875 15.1576 4.6875C16.4705 4.6875 17.8438 4.92188 17.8438 4.92188V7.875H16.3306C14.8399 7.875 14.375 8.8 14.375 9.749V12H17.7031L17.1711 15.4688H14.375V23.8542C20.1118 22.954 24.5 17.9895 24.5 12Z"
                                    fill="#1877F2"/>
                                <path
                                    d="M17.1711 15.4688L17.7031 12H14.375V9.749C14.375 8.8 14.8399 7.875 16.3306 7.875H17.8438V4.92188C17.8438 4.92188 16.4705 4.6875 15.1576 4.6875C12.4165 4.6875 10.625 6.34875 10.625 9.35625V12H7.57812V15.4688H10.625V23.8542C11.8674 24.0486 13.1326 24.0486 14.375 23.8542V15.4688H17.1711Z"
                                    fill="white"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_31_2013">
                                    <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </SocialNetworkIcon>
                </styles.SocialNetworks>
            </styles.Form>
            <styles.ImageWrapper>
                <styles.Image src={ rightImage }/>
            </styles.ImageWrapper>
        </styles.FormWrapper>
    )
}

export default Login