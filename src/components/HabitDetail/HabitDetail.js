import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import { HabitContext } from "../../contexts/HabitContext";
import Navbar from "../ui/Navbar";

const QuestionBox = styled.p`
  background-color: #f5f5f5;
  font-size: 12px;
  padding: 5px;
`;

const HabitDetail = (props) => {
  let { id } = useParams();
  const { habits } = useContext(HabitContext);
  const history = useHistory();

  const habit = habits.filter((h) => h.id === id);

  const dates = [];
  let data = null;
  if (habit[0]) {
    for (let [key, value] of Object.entries(habit[0].dates)) {
      dates.push(<li key={key}>{value}</li>);
    }
    data = <QuestionBox>{habit[0].question}</QuestionBox>;
  }

  return (
    <div>
      <Navbar
        title={data ? habit[0].name : "Loading..."}
        item1="~"
        item2="="
        aux="🡄"
        auxClick={() => history.push("/")}
      />
      {data}
      <ul>{dates}</ul>
    </div>
  );
};

export default HabitDetail;
