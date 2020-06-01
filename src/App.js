import React from "react";
import "./App.css";

import HabitsHome from "./components/HabitsHome/HabitsHome";
import HabitsContextProvider from "./contexts/HabitContext";

function App() {
  return (
    <div className="App">
      <HabitsContextProvider>
        <HabitsHome />
      </HabitsContextProvider>
    </div>
  );
}

export default App;
