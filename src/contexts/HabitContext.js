import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { HabitReducer } from "../reducers/HabitReducer";
import useHttp from "../hooks/useHttp";

export const HabitContext = createContext();

const HabitContextProvider = (props) => {
  const [habits, dispatch] = useReducer(HabitReducer, []);
  const {
    httpLoading,
    httpData,
    httpError,
    httpIdentifier,
    httpExtra,
    sendRequest,
  } = useHttp();

  // On Fetch data change dispatch actions
  useEffect(() => {
    if (!httpLoading && !httpError && httpIdentifier === "SET_HABITS") {
      dispatch({ type: "SET_HABITS", habits: httpData });
    } else if ( !httpLoading && !httpError && httpIdentifier === "REMOVE_HABIT") {
      dispatch({ type: "REMOVE_HABIT", id: httpExtra });
    } else if (!httpLoading && !httpError && httpIdentifier === "ADD_HABIT" ) {
      dispatch({ type: "ADD_HABIT", habit: httpExtra, id: httpData.name })
    } else if (!httpLoading && !httpError && httpIdentifier === "ADD_DATE") {
      dispatch({ type: "ADD_DATE", date: httpExtra[0], id: httpExtra[1], dateId: httpData.name })
    } else if (!httpLoading && !httpError && httpIdentifier === "REMOVE_DATE") {
      dispatch({ type: "REMOVE_DATE", id: httpExtra[0], dateId: httpExtra[1] })
    }
  }, [httpData, httpError, httpLoading, httpIdentifier, httpExtra]);

  // ComponentDidMount - Fetch initial habit data
  useEffect(() => {
    sendRequest(
      "https://habit-tracker-413fc.firebaseio.com/habits.json",
      "GET",
      null,
      "SET_HABITS"
    );
  }, [sendRequest]);

  // Remove habit, sent to HabitItem.js
  // Can this be sped up
  const removeHabitHandler = useCallback((habitId) => {
    sendRequest(
      `https://habit-tracker-413fc.firebaseio.com/habits/${habitId}.json`,
      "DELETE",
      null,
      "REMOVE_HABIT",
      habitId
    );
  }, [sendRequest]);

  // Add habit, sent to Modal.js
  const addHabitHandler = useCallback(habit => {
    sendRequest(
      `https://habit-tracker-413fc.firebaseio.com/habits.json`,
      "POST",
      JSON.stringify(habit),
      "ADD_HABIT",
      habit
    );
  }, [sendRequest])

  // Remove date from habit
  const addDateHandler = useCallback((date, habitId) => {
    sendRequest(
      `https://habit-tracker-413fc.firebaseio.com/habits/${habitId}/dates.json`,
      "POST",
      JSON.stringify(date),
      "ADD_DATE",
      [date, habitId]
    )
  }, [sendRequest])

  const removeDateHandler = useCallback((habitId, dateId) => {
    sendRequest(
      `https://habit-tracker-413fc.firebaseio.com/habits/${habitId}/dates/${dateId}.json`,
      "DELETE",
      null,
      "REMOVE_DATE",
      [habitId, dateId]
    )
  }, [sendRequest])

  return (
    <HabitContext.Provider value={{ habits, httpLoading, dispatch, removeHabitHandler, addHabitHandler, addDateHandler, removeDateHandler }}>
      {props.children}
    </HabitContext.Provider>
  );
};

export default HabitContextProvider;