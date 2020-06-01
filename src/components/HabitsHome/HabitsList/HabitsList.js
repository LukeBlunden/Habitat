import React from "react";
import styled from "styled-components";

import HabitItem from "./HabitItem";

const HabitListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 
    /* repeat(7, ".") repeat(5, "dates"); */
    ". . . . . . . date date date date date"
    "list list list list list list list list list list list list ";

  background-color: #f5f5f5;

  & .dates {
    grid-area: date;
    padding: 5px 0;

    & p {
      font-size: 12px;
      width: 20%;
      display: inline-block;
    }
  }

  & ul {
    grid-area: list;
  }
`;

const HabitsList = (props) => {
  const habits = props.habits
    ? props.habits.map((habit) => (
        <HabitItem key={habit.id} id={habit.id}>{habit.name}</HabitItem>
      ))
    : null;

  const today = new Date();
  // console.log(today.getDate());
  // today.setDate(today.getDate() - 1)
  // console.log(today.getDate());
  const dateList = [];
  for (let i = 0; i < 5; i++) {
    // today.setDate(today.getDate() - 1)
    let tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - i)
    let keyId = `${tempDate.getDate()}/${tempDate.getMonth() + 1}/${tempDate.getFullYear()}`;
    dateList.push(<p key={keyId} data-date={keyId}>{tempDate.getDate()}</p>);
  }

  return (
    <HabitListContainer>
      <div className="dates">
        {dateList}
      </div>
      <ul>{habits}</ul>
    </HabitListContainer>
  );
};

export default HabitsList;
