import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { HabitContext } from "../../../contexts/HabitContext";

const HabitStatusContainer = styled.p`
  padding: 2px;
`;

const SvgStyled = styled.svg`
  /* fill: #eee; */
  width: 100%;
  height: 100%;

  &:hover {
    fill: #ddd;
  }
`;

const SvgStyledComplete = styled(SvgStyled)`
  fill: "#00ff00";
`;

const completeSvg = (
  <SvgStyledComplete
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="#00ff00"
  >
    <path d="M256 60.3c-107.9 0-195.7 87.8-195.7 195.7 0 107.9 87.8 195.7 195.7 195.7 107.9 0 195.7-87.8 195.7-195.7C451.7 148.1 363.9 60.3 256 60.3zM256 420.8c-90.9 0-164.8-73.9-164.8-164.8 0-90.9 73.9-164.8 164.8-164.8 90.9 0 164.8 73.9 164.8 164.8C420.8 346.9 346.9 420.8 256 420.8z" />
    <path d="M348.6 174.4L223.2 302.1l-62.1-45c-7.9-5.7-18.9-3.9-24.6 3.9 -5.7 7.9-3.9 18.9 3.9 24.6l74.4 53.9c3.1 2.3 6.7 3.4 10.3 3.4 4.6 0 9.2-1.8 12.6-5.3l136-138.6c6.8-6.9 6.7-18.1-0.2-24.9C366.6 167.3 355.4 167.4 348.6 174.4z" />
  </SvgStyledComplete>
);

const incompleteSvg = (
  <SvgStyled
    fill="#EEE"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M256 460.4c112.7 0 204.4-91.7 204.4-204.3S368.7 51.6 256 51.6c-112.7 0-204.3 91.7-204.3 204.4S143.3 460.4 256 460.4zM256 83.9c94.9 0 172.1 77.2 172.1 172.1 0 94.9-77.2 172.1-172.1 172.1 -94.9 0-172.1-77.2-172.1-172.1C83.9 161.1 161.1 83.9 256 83.9z" />
    <path d="M172.1 341.5c3.6 3.5 8.3 5.3 12.9 5.3 4.8 0 9.5-1.8 13.2-5.5l57.9-59 57.9 59c3.6 3.7 8.4 5.5 13.1 5.5 4.7 0 9.3-1.7 12.9-5.3 7.3-7.1 7.4-18.8 0.2-26.1l-58.4-59.5 58.4-59.5c7.1-7.3 7-18.9-0.2-26 -7.3-7.1-18.9-7-26 0.2l-57.9 59 -57.9-59c-7.1-7.3-18.8-7.4-26.1-0.2 -7.3 7.1-7.4 18.8-0.2 26l58.4 59.5 -58.4 59.5C164.7 322.7 164.8 334.4 172.1 341.5z" />
  </SvgStyled>
);

const HabitStatus = (props) => {
  const [complete, setComplete] = useState(false);
  const [dateId, setDbId] = useState("");
  const { addDateHandler, removeDateHandler } = useContext(
    HabitContext
  );

  useEffect(() => {
    if (props.dates) {
      for (let [key, value] of Object.entries(props.dates)) {
        if (value === props.dataDate) {
          setComplete(true);
          setDbId(key);
          return;
        }
      }
    }
  }, [props.dates, props.dataDate]);

  function habitClickHandler(e) {
    complete ? removeDateHandler(props.id, dateId) : addDateHandler(props.dataDate, props.id)
    setComplete(!complete);
  }

  return (
    <HabitStatusContainer onClick={habitClickHandler}>
      {complete ? completeSvg : incompleteSvg}
    </HabitStatusContainer>
  );
};

export default HabitStatus;
