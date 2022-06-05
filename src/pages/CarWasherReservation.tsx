import Calendar from "react-calendar";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import "../styles/datepicker.css"

import nextIcon from "../assets/img/icons/next.svg"
import previousIcon from "../assets/img/icons/previous.svg"
import notFoundTime from "../assets/img/icons/not-found-time.svg"

import { getMonth, getYear } from 'date-fns';
import { deflateSync } from "zlib";

const LeftSide = styled.div`
  display: inline-flex;
  flex-direction: column;
  row-gap: 1em;
  grid-area: card;
  z-index: 1;
  position: relative;
`
const RightSide = styled.div`
  grid-area: carousel;
`

const MainPart = styled.div`
  display: grid;
  grid-template-areas: 'card carousel';
  grid-template-columns: 300px auto;
  width: 1000px;
  margin: 0 auto;
  gap: 32px;
  font-family: var(--font-family-poppins);
`

function toLeadingZero(n: number): string {
  return n < 10 ? '0' + n : '' + n;
}

const CarWasherReservation = () => {
  const NotFound = (<div className="not-found">
    <img className="not-found__img" src={notFoundTime} />
    <div className="not-found__text"> Not Found </div>
  </div>);

  const washerTimes = [
    {
      id: 1,
      date: new Date(2022, 5, 6),
      free: [
        {
          id: 1,
          start: new Date('2022-06-05T09:00:00')
        },
        {
          id: 2,
          start: new Date('2022-06-05T09:30:00')
        },
        {
          id: 3,
          start: new Date('2022-06-05T13:00:00')
        },
        {
          id: 4,
          start: new Date('2022-06-05T19:30:00')
        }
      ]
    },
    {
      id: 2,
      date: new Date(2022, 5, 7),
      free: [
        {
          id: 5,
          start: new Date('2022-06-05T09:00:00')
        },
        {
          id: 6,
          start: new Date('2022-06-05T09:30:00')
        },
        {
          id: 7,
          start: new Date('2022-06-05T13:00:00')
        },
        {
          id: 8,
          start: new Date('2022-06-05T14:30:00')
        }
      ]
    },
    {
      id: 2,
      date: new Date(2022, 5, 8),
      free: [
        {
          id: 9,
          start: new Date('2022-06-05T09:00:00')
        },
        {
          id: 10,
          start: new Date('2022-06-05T09:30:00')
        },
        {
          id: 11,
          start: new Date('2022-06-05T18:00:00')
        },
        {
          id: 12,
          start: new Date('2022-06-05T19:30:00')
        }
      ]
    }
  ]

  const [startDate, setStartDate] = useState(new Date());
  const years = [...Array.from({ length: 2 }, (x, i) => i + 2022)];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const washerTimesElements: Array<any> = [];
  const [morningFree, updateMorningFree]: any = useState([]);
  const [afternoonFree, updateAfternoonFree]: any = useState([]);
  const [eveningFree, updateEveningFree]: any = useState([]);
  let [selectedDate, setSelectedDate]: any = useState(null);
  const [selectedTime, setSelectedTime]: any = useState(null);

  const toggle = (el: any, index: number): void => {
    let elements = document.getElementsByClassName("uno-time");

    for (let i = 0; i < elements.length; i++) {
      if (elements[i] !== el.currentTarget) {
        elements[i].className = "uno-time";
      } else {}
    }

    if (el.currentTarget.className.search("selected") >= 0) {
      setSelectedTime(null);
      el.currentTarget.className = el.currentTarget.className.substr(0, el.currentTarget.className.search("selected"));
    } else {
      setSelectedTime(selectedDate.free[index]);
      el.currentTarget.className = el.currentTarget.className += " selected";
    }
  }


  const selectDate = (date: any) => {
    selectedDate = date;

    updateMorningFree([]);
    updateAfternoonFree([]);
    updateEveningFree([]);

    if (!selectedDate) return;

    for (var i = 0; i < selectedDate.free.length; i++) {
      const index = i;
      const element = (
        <div
          ref={React.createRef()}
          className="uno-time"
          key={selectedDate.free[i].id}
          onClick={(qq) => {
            toggle(qq, index);
          }}>
          {toLeadingZero(selectedDate.free[i].start.getHours())} : {toLeadingZero(selectedDate.free[i].start.getMinutes())}
        </div>);
      if (selectedDate.free[i].start.getHours() < 12) {
        updateMorningFree((arr: any) => [...arr, element]);
      } else if (selectedDate.free[i].start.getHours() >= 12 && selectedDate.free[i].start.getHours() < 18) {
        updateAfternoonFree((arr: any) => [...arr, element]);
      } else {
        updateEveningFree((arr: any) => [...arr, element]);
      }
    }

  }

  const onDateChange = (date: Date) => {
    date.setHours(0, 0, 0, 0);

    const findedDate = washerTimes.find(item => {
      item.date.setHours(0, 0, 0, 0);
      return +item.date == +date;
    });

    selectDate(findedDate);

    date && setStartDate(date);
  };




  useEffect(() => {
    onDateChange(new Date())
  }, []);

  const onPreviousClick = (): void => {
    alert('PREVIOUS');
  }

  const onNextClick = (): void => {
    if (!selectedTime) {
      alert('SELECT TIME!')
      return;
    }
    alert(selectedTime.start);
  }

  return (
    <MainPart>
      <LeftSide>
        <DatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="datepicker-header">
              <button className="datepicker-change-month-button previous" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                <img src={previousIcon} alt="" />
              </button>

              <select className="datepicker-header-select month"
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select className="datepicker-header-select year"
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(+value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button className="datepicker-change-month-button next" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                <img src={nextIcon} alt="" />
              </button>
            </div>
          )}
          selected={startDate}
          onChange={onDateChange}
          open={true}
          formatWeekDay={nameOfDay => nameOfDay.substr(0, 1)}
          minDate={new Date()}
        />
      </LeftSide>
      <RightSide>
        <div className="time-block">
          <div className="carwasher-times morning">
            <div className="header">Morning</div>
            <div className="times-wrapper">
              {morningFree.length > 0 ? morningFree : NotFound}
            </div>
          </div>
          <div className="carwasher-times afternoon">
            <div className="header">Afternoon</div>
            <div className="times-wrapper">
              {afternoonFree.length > 0 ? afternoonFree : NotFound}
            </div>
          </div>
          <div className="carwasher-times evening">
            <div className="header">Evening</div>
            <div className="times-wrapper">
              {eveningFree.length > 0 ? eveningFree : NotFound}
            </div>
          </div>
        </div>
      </RightSide>
      <div className="process-button previous" onClick={onPreviousClick}>
        BACK
      </div>
      <div className="process-button next" onClick={onNextClick}>
        NEXT
      </div>
    </MainPart>
  );
}

export default CarWasherReservation