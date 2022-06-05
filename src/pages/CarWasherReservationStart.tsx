import React, { useMemo } from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components'
import { PoppinsMediumWhite14px } from '../styles/styledMixins'
import Time, { DateHelper } from '../helpers/dateHelper'
import TimeSection from '../components/TimeSection'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
    resetCurrentReservation,
    selectCurrentReservation,
    selectIsUpdate,
    setUpdate,
    updateCurrentReservation,
    useGetReservationsByCarWasherIdQuery,
} from '../redux/reducers/reservationSlice'
import { useActiveCarWasher } from '../hooks/useActiveCarWasher'
import { CreateReservation } from '../interfaces/Reservation'

const CalendarWrapper = styled.div`
  display: flex;
  margin: 0 1.5em;
  padding: 0 2em;
  grid-area: 1 / 1 / span 1 / span 1;

  .react-calendar {
    &__navigation {
      display: flex;
    }
  }
`

const TimeScheduleWrapper = styled.div`
  display: flex;
  grid-area: 1 / 2 / span 1 / span 1;
  border: 1px solid var(--nobel);
  border-radius: 30px;
`

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 30px;
  row-gap: 1.5em;
`

const Line = styled.hr`
  width: 100%;
  color: var(--nobel);
  background-color: var(--nobel);
  border: none;
  height: 1px;
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

const CarWasherReservationStart = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()
    if (!id) throw new Error()
    const location = useLocation()
    const update = useAppSelector(selectIsUpdate)
    const { activeCarWasher, error: carWasherError, isLoading: isCarWasherLoading } = useActiveCarWasher()
    const navigate = useNavigate()
    const reservation = useAppSelector(selectCurrentReservation)
    const {
        data: activeReservations,
        error: reservationsError,
        isLoading: isReservationsLoading,
    } = useGetReservationsByCarWasherIdQuery(id)
    const isReady: boolean = useMemo(() => !!(activeCarWasher && activeReservations), [activeCarWasher, activeReservations])
    const freeWindows = useMemo(() => {
        return isReady ? DateHelper.getEmptyWindows({
                hours: 0,
                minutes: 30,
            }, activeCarWasher!.workingHours,
            activeReservations!
                .map(reservation => reservation.time)
                .filter(time => update ? time.hours !== reservation?.time?.hours || time.minutes !== reservation?.time.minutes : true)) : undefined
    }, [activeCarWasher, activeReservations, isReady])

    const morningWindows = useMemo(() => freeWindows && freeWindows.filter(time => DateHelper.isMorning(time)), [freeWindows])
    const afternoonWindows = useMemo(() => freeWindows && freeWindows.filter(time => DateHelper.isAfternoon(time)), [freeWindows])
    const eveningWindows = useMemo(() => freeWindows && freeWindows.filter(time => DateHelper.isEvening(time)), [freeWindows])

    const onBackClick = () => {
        const sections = location.pathname.split('/')
        const newLocation = sections.slice(0, sections.length - 1).join('/')
        dispatch(resetCurrentReservation())
        navigate(newLocation)
    }

    const onNextClick = () => navigate('./finalize')

    const onTimeClick = (time: Time) => dispatch(updateCurrentReservation({time, carWasherId: activeCarWasher!.id}))

    return (
        <>
            <CalendarWrapper>
                <Calendar/>
            </CalendarWrapper>
            <TimeScheduleWrapper>
                <TimeWrapper>
                    { morningWindows &&
                        <TimeSection name={ 'Morning' } reservation={ reservation?.time }
                                     timeWindows={ morningWindows }
                                     onTimeClick={ onTimeClick }/> }
                    <Line/>
                    { afternoonWindows &&
                        <TimeSection name={ 'Afternoon' } reservation={ reservation?.time }
                                     timeWindows={ afternoonWindows }
                                     onTimeClick={ onTimeClick }/> }
                    <Line/>
                    { eveningWindows &&
                        <TimeSection name={ 'Evening' } reservation={ reservation?.time }
                                     timeWindows={ eveningWindows }
                                     onTimeClick={ onTimeClick }/> }
                </TimeWrapper>
            </TimeScheduleWrapper>
            <Button className={ 'left' } onClick={ onBackClick }>Back</Button>
            <Button className={ 'right' } onClick={ onNextClick }>Next</Button>
        </>
    )
}

export default CarWasherReservationStart