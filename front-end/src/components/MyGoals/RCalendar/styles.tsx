import styled from "styled-components";
import Calendar from "react-calendar";

export const SSection = styled.section`
  height: 50vh;
  width: 30vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3ebd9;
  border-radius: 20px;
  /* border: 2px solid #423e33; */
  box-shadow: 5px 5px 3px #423e33;
  padding: 1vw;
`;

export const StyledCalendar = styled(Calendar)`
  // 달력 년/월 컨테이너 div
  .react-calendar__navigation {
    text-align: center;
    margin-bottom: 1vw;
  }

  // 달력 년/월 표시 글씨 커스텀
  .react-calendar__navigation__label > span {
    font-family: "Voces", cursive;
    font-size: 1.7vw;
    font-weight: bold;
    color: lightblue;
    display: flex;
    margin-left: 7vw;
    margin-right: 7vw;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      2px 2px 0 #000;
  }

  // day(날짜) 타일 한개 한개
  .react-calendar__tile {
    text-align: center;
    padding: 1vh;
    font-size: 1.5vw;
    font-family: "Bangers";
  }

  // 오늘날짜
  /* .react-calendar__tile--now {
    background: #e9b50a;
    border-radius: 50%;
  } */

  // 요일 section
  .react-calendar__month-view__weekdays {
    text-align: center;
    font-family: "Chicle";
    margin-bottom: 1vw;
    border-bottom: 1px solid lightgray;

    abbr {
      /*월,화,수... 글자 부분*/
      font-size: 1.4vw;
      font-weight: 500;
      text-decoration-line: none;
      margin-bottom: 1vw;
    }
  }

  .react-calendar__month-view__weekdays__weekday--weekend {
    color: red;
  }

  .selected__day {
    background: #e9b50a;
    border-radius: 50%;
  }
`;
