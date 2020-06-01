import React, { useState, useContext } from "react";

import Navbar from "../ui/Navbar";
import HabitsList from "./HabitsList/HabitsList";
import Modal from "../ui/Modal";
import { HabitContext } from "../../contexts/HabitContext";

const HabitsHome = (props) => {
  const { habits } = useContext(HabitContext);
  const [habitModal, setHabitModal] = useState(false);

  return (
    <React.Fragment>
      {habitModal ? (
        <Modal
          closeModal={() => setHabitModal(false)}
          // submitHabit={submitHabitHandler}
        />
      ) : null}
      <Navbar
        title="Habits"
        item1="+"
        item2="="
        addHabit={() => setHabitModal(true)}
      />
      <HabitsList habits={habits} />
    </React.Fragment>
  );
};

export default HabitsHome;
