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

  return (
    <HabitContext.Provider value={{ habits, dispatch, removeHabitHandler, addHabitHandler }}>
      {props.children}
    </HabitContext.Provider>
  );
};

export default HabitContextProvider;