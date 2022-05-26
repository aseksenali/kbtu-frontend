import React from 'react'
import Calendar from "react-calendar";
import styled from "styled-components";

const CalendarWrapper = styled.div`
  .react-calendar {
    &__navigation {
      display: flex;
    }
  }
  display: flex;
  width: 40%;
  margin: 0 1.5em;
  padding: 0 2em;
`

const CarWasherReservation = () => {
    return (
        <CalendarWrapper>
            <Calendar/>
        </CalendarWrapper>
    )
}

export default CarWasherReservation