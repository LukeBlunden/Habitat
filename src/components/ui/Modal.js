import React, { useState, useContext } from "react";
import styled from "styled-components";
import { HabitContext } from "../../contexts/HabitContext";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

const HabitModal = styled.form`
  display: inline-block;
  position: fixed;
  top: 30vh;
  left: calc(15%);
  margin: 0 auto;
  /* width: 20rem; */
  width: 70%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  z-index: 100;
  border-radius: 7px;
  text-align: left;
  padding: 20px;

  & h2 {
    margin-bottom: 20px;
  }

  & input {
    border: 0;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.14);
    margin-bottom: 20px;
  }

  & button {
    display: block;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
  }
`;

const Modal = (props) => {
  const [input, setInput] = useState({ name: "", question: "" });
  const { addHabitHandler } = useContext(HabitContext);

  const habitSubmit = (e) => {
    e.preventDefault();
    const habit = { name: input.name, question: input.question };
    addHabitHandler(habit);
    props.closeModal();
  };

  return (
    <React.Fragment>
      <Backdrop onClick={props.closeModal} />
      <HabitModal onSubmit={habitSubmit}>
        <h2>Add habit</h2>
        <input
          type="text"
          placeholder="Name"
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
          autoFocus
        />
        <input
          type="text"
          placeholder="Question"
          value={input.question}
          onChange={(e) => setInput({ ...input, question: e.target.value })}
        />
        <input type="submit" value="Save" />
      </HabitModal>
    </React.Fragment>
  );
};

export default Modal;
