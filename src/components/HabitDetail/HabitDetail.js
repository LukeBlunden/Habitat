import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { differenceInCalendarDays } from "date-fns";

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

  const dateList = [];
  let dates = [];
  let streak = 1;
  let tempStreak = 1;

  // If habit is loaded
  if (habit[0]) {
    // For each date within habit
    for (let [key, value] of Object.entries(habit[0].dates)) {
      // Populate list items for unorder list
      dateList.push(<li key={key}>{value}</li>);
      // dateList.push({[key]: value});
      // Push dates for calculations
      dates.push(value);
    }
    // Ensure date array is sorted
    dates = dates.sort();
    for (let i = 0; i < dates.length - 1; i++) {
      // Compare 2 sorted dates to see if there is a daily streak
      const tempDate1 = new Date(dates[i]);
      const tempDate2 = new Date(dates[i + 1]);
      if (differenceInCalendarDays(tempDate2, tempDate1) === 1) {
        // If day difference is 1 increase the streak
        tempStreak++;
        // If higher than highest streak, update highest streak
        if (tempStreak > streak) streak = tempStreak;
      } else {
        // If days are not sequential, reset tempstreak
        tempStreak = 1;
      }
    }
  }

  return (
    <div>
      <Navbar
        title={habit[0] ? habit[0].name : "Loading..."}
        item1="✏"
        item2="="
        aux="🡄"
        auxClick={() => history.push("/")}
      />
      {habit[0] && <QuestionBox>{habit[0].question}</QuestionBox>}
      {habit[0] && <p>{streak}</p>}
      {/* <ul>{dateList}</ul> */}
    </div>
  );
};

export default HabitDetail;
