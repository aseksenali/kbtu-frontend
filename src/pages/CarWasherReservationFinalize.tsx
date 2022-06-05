import React, { useState } from 'react'
import styled from 'styled-components'
import {
    PoppinsBoldFiord20px,
    PoppinsMediumEndeavour24px,
    PoppinsMediumFiord14px,
    PoppinsMediumWhite14px,
    PoppinsNormalFiord14px,
} from '../styles/styledMixins'
import { Avatar } from '@mui/material'
import StringHelper from '../helpers/stringHelper'
import { DateHelper } from '../helpers/dateHelper'
import Price from '../components/Price'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import TextInput from '../components/TextInput'
import Checkbox from '../components/Checkbox/Checkbox'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { useActiveCarWasher } from '../hooks/useActiveCarWasher'
import {
    selectCurrentReservation,
    selectIsUpdate,
    updateCurrentReservation,
    useCreateReservationMutation,
    useUpdateReservationMutation,
} from '../redux/reducers/reservationSlice'
import { CreateReservation } from '../interfaces/Reservation'
import { ReservationFormData } from '../interfaces/FormTypes'
import ModalWindow from '../components/ModalWindow'


const Header = styled.h1`
  ${ PoppinsMediumEndeavour24px };
  margin: 0;
`

const ContainerWrapper = styled.div`
  grid-area: 1 / 1 / span 1 / span 2;
  display: flex;
  row-gap: 1em;
  flex-direction: column;
  padding: 0 0 0 5%;
`

const DetailsCard = styled.div`
  border: 1px solid var(--nobel);
  border-radius: 40px;
  display: flex;
  padding: 1em 2em;
  column-gap: 1em;
`

const DetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: .8em;
`

const Title = styled.h1`
  ${ PoppinsBoldFiord20px };
  display: flex;
  align-items: center;
  margin: 0;
`

const Text = styled.span`
  ${ PoppinsNormalFiord14px };
`

const IconWithText = styled.div`
  display: flex;
  align-items: center;

  & > span {
    ${ PoppinsMediumFiord14px };
  }

  & > span, & > h1 {
    margin-left: 1ex;
  }
`

const IconsWrapper = styled.div`
  display: flex;
  column-gap: 2em;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1.5em;
`

const FormRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  column-gap: 3em;
`

const Button = styled.button`
  ${ PoppinsMediumWhite14px };
  margin-top: 2em;
  height: 50px;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  transition: box-shadow .3s ease-in-out;

  &.left {
    grid-area: 2 / 1 / span 1 / span 1;
    margin-left: 4em;
    margin-right: 4em;
    background-color: white;
    border: 1px solid var(--nobel);
    color: var(--fiord);

    &:hover {
      box-shadow: 0 0 10px var(--nobel);
    }

    &:active {
      transition: box-shadow .1s ease-in-out;
      box-shadow: none;
    }
  }

  &.right {
    grid-area: 2 / 2 / span 1 / span 1;
    background-color: var(--endeavour-2);

    &:not(:disabled) {
      &:hover {
        box-shadow: 0 0 10px var(--endeavour-2);
      }
    }

    &:active {
      transition: box-shadow .1s ease-in-out;
      box-shadow: none;
    }

    &:disabled {
      background-color: var(--nobel);
      color: var(--fiord);
    }
  }
`

const CheckboxRow = styled.div`
  display: flex;
  column-gap: 1.5em;
`

type ModalInfo = {
    carRegistration: string
    carModel: string
    washTheInterior: boolean
    washTheThunk: boolean
}

const CarWasherReservationFinalize = () => {
    const dispatch = useAppDispatch()
    const { handleSubmit, formState: { errors }, control } = useForm<ReservationFormData>()
    const [isOpen, setOpen] = useState<boolean>(false)
    const [createReservation, { isLoading: isCreating }] = useCreateReservationMutation()
    const [updateReservation, { isLoading: isUpdating }] = useUpdateReservationMutation()
    const update = useAppSelector(selectIsUpdate)
    const { activeCarWasher, isLoading, error } = useActiveCarWasher()
    const [modalInfo, setModalInfo] = useState<ModalInfo | undefined>(undefined)
    const reservation = useAppSelector(selectCurrentReservation)
    const navigate = useNavigate()

    if (activeCarWasher && reservation) {
        const onBackClick = () => navigate('..')

        const onNextClick = handleSubmit((data) => {
            dispatch(updateCurrentReservation({ ...data }))
            setModalInfo(data)
            const request: CreateReservation = {
                carWasherId: activeCarWasher.id,
                time: reservation.time!,
                carModel: data.carModel,
                carRegistration: data.carRegistration,
                notes: data.notes,
                washTheInterior: data.washTheInterior,
                washTheThunk: data.washTheThunk,
            }
            update ? updateReservation({ ...request }) : createReservation({ ...request })
            setOpen(true)
        }, (errors) => {
            console.log(errors)
        })

        return (
            <>
                { modalInfo && reservation &&
                    <ModalWindow isOpen={ isOpen } setOpen={ setOpen }
                                 reservation={ reservation.time! } { ...modalInfo }/> }
                <ContainerWrapper>
                    <Header>Order</Header>
                    <DetailsCard>
                        <Avatar sx={ { width: 64, height: 64 } } src={ activeCarWasher.photo[0] } alt="logo"/>
                        <DetailsContent>
                            <Title>{ activeCarWasher.name }</Title>
                            <Text>{ activeCarWasher.description }</Text>
                            <IconsWrapper>
                                <IconWithText>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M12.0038 0.998047C5.94056 0.998047 0.996102 5.93472 0.996094 11.9979C0.996079 18.0611 5.94055 23.0036 12.0038 23.0036C18.067 23.0036 23.0017 18.0611 23.0017 11.9979C23.0017 5.93472 18.067 0.998047 12.0038 0.998047ZM12.0038 2.99802C16.9861 2.99802 21.0017 7.01557 21.0017 11.9979C21.0017 16.9802 16.9861 21.0037 12.0038 21.0037C7.02141 21.0037 2.99606 16.9802 2.99607 11.9979C2.99608 7.01557 7.02143 2.99802 12.0038 2.99802ZM11.9881 4.98432C11.856 4.9856 11.7254 5.01306 11.6039 5.06511C11.4825 5.11717 11.3725 5.19278 11.2804 5.28758C11.1883 5.38238 11.116 5.49449 11.0675 5.61744C11.019 5.74038 10.9953 5.87171 10.9979 6.00384V11.9979C10.9985 12.1295 11.025 12.2597 11.0759 12.381C11.1268 12.5023 11.2012 12.6124 11.2948 12.7049L15.2947 16.7068C15.3872 16.8025 15.4977 16.8788 15.62 16.9312C15.7423 16.9837 15.8738 17.0112 16.0068 17.0121C16.1398 17.0131 16.2717 16.9875 16.3947 16.9369C16.5177 16.8863 16.6294 16.8116 16.7232 16.7173C16.817 16.623 16.8911 16.5109 16.941 16.3876C16.991 16.2643 17.0158 16.1322 17.0141 15.9992C17.0124 15.8662 16.9842 15.7349 16.9311 15.6129C16.878 15.4909 16.8011 15.3808 16.7049 15.2889L12.9998 11.5839V6.00384C13.0025 5.8699 12.9781 5.7368 12.9283 5.61244C12.8785 5.48808 12.8042 5.37499 12.7098 5.2799C12.6155 5.18481 12.503 5.10964 12.379 5.05887C12.255 5.00809 12.1221 4.98274 11.9881 4.98432Z"
                                              fill="#465564"/>
                                    </svg>
                                    { reservation &&
                                        <Text>today at { DateHelper.convertToString(reservation.time!) }</Text> }
                                </IconWithText>
                                <IconWithText>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.05 5C16.0267 5.19057 16.9244 5.66826 17.6281 6.37194C18.3317 7.07561 18.8094 7.97326 19 8.95M15.05 1C17.0793 1.22544 18.9716 2.13417 20.4162 3.57701C21.8609 5.01984 22.772 6.91101 23 8.94M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
                                            stroke="#465564" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                    </svg>
                                    <Text>{ StringHelper.formatPhoneNumber(activeCarWasher.telephone) }</Text>
                                </IconWithText>
                                <IconWithText>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 2C9.87827 2 7.84344 2.84285 6.34315 4.34315C4.84285 5.84344 4 7.87827 4 10C4 15.4 11.05 21.5 11.35 21.76C11.5311 21.9149 11.7616 22.0001 12 22.0001C12.2384 22.0001 12.4689 21.9149 12.65 21.76C13 21.5 20 15.4 20 10C20 7.87827 19.1571 5.84344 17.6569 4.34315C16.1566 2.84285 14.1217 2 12 2ZM12 19.65C9.87 17.65 6 13.34 6 10C6 8.4087 6.63214 6.88258 7.75736 5.75736C8.88258 4.63214 10.4087 4 12 4C13.5913 4 15.1174 4.63214 16.2426 5.75736C17.3679 6.88258 18 8.4087 18 10C18 13.34 14.13 17.66 12 19.65ZM12 6C11.2089 6 10.4355 6.2346 9.77772 6.67412C9.11992 7.11365 8.60723 7.73836 8.30448 8.46927C8.00173 9.20017 7.92252 10.0044 8.07686 10.7804C8.2312 11.5563 8.61216 12.269 9.17157 12.8284C9.73098 13.3878 10.4437 13.7688 11.2196 13.9231C11.9956 14.0775 12.7998 13.9983 13.5307 13.6955C14.2616 13.3928 14.8864 12.8801 15.3259 12.2223C15.7654 11.5645 16 10.7911 16 10C16 8.93913 15.5786 7.92172 14.8284 7.17157C14.0783 6.42143 13.0609 6 12 6ZM12 12C11.6044 12 11.2178 11.8827 10.8889 11.6629C10.56 11.4432 10.3036 11.1308 10.1522 10.7654C10.0009 10.3999 9.96126 9.99778 10.0384 9.60982C10.1156 9.22186 10.3061 8.86549 10.5858 8.58579C10.8655 8.30608 11.2219 8.1156 11.6098 8.03843C11.9978 7.96126 12.3999 8.00087 12.7654 8.15224C13.1308 8.30362 13.4432 8.55996 13.6629 8.88886C13.8827 9.21776 14 9.60444 14 10C14 10.5304 13.7893 11.0391 13.4142 11.4142C13.0391 11.7893 12.5304 12 12 12Z"
                                            fill="black"/>
                                    </svg>
                                    <Text>{ StringHelper.formatAddress(activeCarWasher.address) }</Text>
                                </IconWithText>
                            </IconsWrapper>
                            <IconWithText>
                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.5 4V4.5H16H17C17.663 4.5 18.2989 4.76339 18.7678 5.23223C19.2366 5.70107 19.5 6.33696 19.5 7V15C19.5 15.663 19.2366 16.2989 18.7678 16.7678C18.2989 17.2366 17.663 17.5 17 17.5H3C2.33696 17.5 1.70107 17.2366 1.23223 16.7678C0.763392 16.2989 0.5 15.663 0.5 15V3C0.5 2.33696 0.763392 1.70107 1.23223 1.23223C1.70107 0.763392 2.33696 0.5 3 0.5H13C13.663 0.5 14.2989 0.763392 14.7678 1.23223C15.2366 1.70107 15.5 2.33696 15.5 3V4ZM14 4.5H14.5V4V3C14.5 2.60217 14.342 2.22064 14.0607 1.93934C13.7794 1.65804 13.3978 1.5 13 1.5H3C2.60217 1.5 2.22064 1.65804 1.93934 1.93934C1.65804 2.22064 1.5 2.60217 1.5 3C1.5 3.39783 1.65804 3.77936 1.93934 4.06066C2.22064 4.34196 2.60217 4.5 3 4.5H14ZM18 12.5H18.5V12V10V9.5H18H17C16.6022 9.5 16.2206 9.65804 15.9393 9.93934C15.658 10.2206 15.5 10.6022 15.5 11C15.5 11.3978 15.658 11.7794 15.9393 12.0607C16.2206 12.342 16.6022 12.5 17 12.5H18ZM18 8.5H18.5V8V7C18.5 6.60218 18.342 6.22064 18.0607 5.93934C17.7794 5.65804 17.3978 5.5 17 5.5L3 5.5L2.99926 5.5C2.71545 5.50042 2.43365 5.45251 2.16593 5.35833L1.5 5.12407V5.83V15C1.5 15.3978 1.65804 15.7794 1.93934 16.0607C2.22065 16.342 2.60218 16.5 3 16.5H17C17.3978 16.5 17.7794 16.342 18.0607 16.0607C18.342 15.7794 18.5 15.3978 18.5 15V14V13.5H18H17C16.337 13.5 15.7011 13.2366 15.2322 12.7678C14.7634 12.2989 14.5 11.663 14.5 11C14.5 10.337 14.7634 9.70107 15.2322 9.23223C15.7011 8.76339 16.337 8.5 17 8.5H18Z"
                                        fill="black" stroke="#0153AF"/>
                                </svg>
                                <Price showPerHour={ false } amount={ activeCarWasher.price }/>
                            </IconWithText>
                        </DetailsContent>
                    </DetailsCard>
                    <Header>Contact details</Header>
                    <Form>
                        <FormRow>
                            <Controller control={ control }
                                        name={ 'carRegistration' }
                                        rules={ { pattern: { value: /[A-Z]{3}/, message: 'Bad format' } } }
                                        defaultValue={ reservation?.carRegistration ?? '' }
                                        render={ ({ field }) => <TextInput { ...field }
                                                                           isSameLevel={ false }
                                                                           label={ 'Car registration' }
                                                                           placeholder={ 'Enter car registration' }
                                                                           type={ 'input' } errors={ errors }/> }/>
                            <Controller control={ control }
                                        name={ 'carModel' }
                                        defaultValue={ reservation?.carModel ?? '' }
                                        render={ ({ field }) => <TextInput { ...field }
                                                                           isSameLevel={ false }
                                                                           label={ 'Car model' }
                                                                           placeholder={ 'Enter model' }
                                                                           type={ 'input' } errors={ errors }/> }/>
                        </FormRow>
                        <Controller control={ control }
                                    name={ 'notes' }
                                    defaultValue={ reservation?.notes ?? '' }
                                    render={ ({ field }) => <TextInput { ...field }
                                                                       isSameLevel={ false }
                                                                       label={ 'Notes' }
                                                                       placeholder={ 'Write notes' }
                                                                       type={ 'textarea' }
                                                                       errors={ errors }/> }/>
                        <CheckboxRow>
                            <Controller control={ control }
                                        name={ 'washTheInterior' }
                                        defaultValue={ reservation?.washTheInterior ?? false }
                                        render={ ({ field }) => <Checkbox { ...field }
                                                                          label={ 'Wash the interior' }/> }/>
                            <Controller control={ control }
                                        name={ 'washTheThunk' }
                                        defaultValue={ reservation?.washTheThunk ?? false }
                                        render={ ({ field }) => <Checkbox { ...field }
                                                                          label={ 'Wash the thunk' }/> }/>
                        </CheckboxRow>
                    </Form>
                </ContainerWrapper>
                <Button className={ 'left' } onClick={ onBackClick }>Back</Button>
                <Button className={ 'right' } onClick={ onNextClick }>Next</Button>
            </>
        )
    } else return null
}

export default CarWasherReservationFinalize