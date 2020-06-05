import React, { useContext } from "react";
import styled from "styled-components";

import HabitItem from "./HabitItem";
import { HabitContext } from "../../../contexts/HabitContext";

const HabitListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 
    /* repeat(7, ".") repeat(5, "dates"); */
    ". load load load load load load date date date date date"
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

  & h5 {
    grid-area: load;
    align-self: center;
    justify-self: left;
    padding-left: 10px;
  }
`;

const HabitsList = (props) => {
  const { habits, httpLoading } = useContext(HabitContext);

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
      {/* <ul>{habits}</ul> */}
      <ul>
        {habits && habits.map(habit => <HabitItem key={habit.id} id={habit.id} dates={habit.dates}>{habit.name}</HabitItem>)}
      </ul>
      {httpLoading && <h5>Loading...</h5>}
    </HabitListContainer>
  );
};

export default HabitsList;
