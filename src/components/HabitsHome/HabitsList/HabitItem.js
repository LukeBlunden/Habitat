import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { HabitContext } from "../../../contexts/HabitContext";
import HabitStatus from "./HabitStatus";

const Item = styled.li`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  background-color: white;
  border-bottom: 3px solid #f5f5f5;
  padding: 10px 0;

  & .title {
    font-size: 18px;
    font-weight: bold;
    grid-column: 2 / span 6;
    text-align: left;
    padding-left: 10px;
  }

  & .dateBox {
    grid-column: 8 / span 5;

    & p {
      display: inline-block;
      width: 20%;
    }
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  grid-column: 2 / span 6;
  text-align: left;
  padding-left: 10px;
`;

const Progress = styled.div`
  /* background-color: #CCCCCC; */
`;

const HabitItem = (props) => {
  const { removeHabitHandler } = useContext(HabitContext);
  // Create arrays of incomplete habit status markers for each habit and each date
  const dateCheck = [];
  for (let i = 0; i < 5; i++) {
    let tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - i);
    let keyId = `${tempDate.getDate()}/${
      tempDate.getMonth() + 1
    }/${tempDate.getFullYear()}`;
    dateCheck.push(
      <HabitStatus
        key={keyId}
        dataDate={keyId}
        dates={props.dates}
        id={props.id}
      />
    );
  }

  return (
    <Item>
      <Progress>O</Progress>
      {/* <div className="title" onClick={() => removeHabitHandler(props.id)} >{props.children}</div> */}
      <StyledLink to={`/habit/${props.id}`}>{props.children}</StyledLink>
      <div className="dateBox">{dateCheck}</div>
    </Item>
  );
};

export default HabitItem;
