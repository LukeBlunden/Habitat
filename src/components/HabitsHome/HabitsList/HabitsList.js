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
  const dateList = [];
  for (let i = 0; i < 5; i++) {
    let keyId = `${today.getDate() - i}/${today.getMonth()}/${today.getFullYear()}`;
    dateList.push(<p key={keyId} data-date={keyId}>{today.getDate() - i}</p>);
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
