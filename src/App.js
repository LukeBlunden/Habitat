import React from "react";
import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import HabitsHome from "./components/HabitsHome/HabitsHome";
import HabitsContextProvider from "./contexts/HabitContext";
import HabitDetail from "./components/HabitDetail/HabitDetail";

function App() {
  return (
    <div className="App">
      <HabitsContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/habit/:id" >
              <HabitDetail />
            </Route>
            <Route path="/" exact>
              <HabitsHome />
            </Route>
          </Switch>
        </BrowserRouter>
      </HabitsContextProvider>
    </div>
  );
}

export default App;
