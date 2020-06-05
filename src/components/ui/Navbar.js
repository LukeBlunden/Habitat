import React from "react";
import styled from "styled-components";

const StyledNav = styled.nav`
  /* display: flex; */
  /* height: 50px; */
  padding: 15px 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-areas: "aux title title title title title title title button1 button1 button2 button2";

  & h1 {
    /* display: inline-block; */
    /* margin-right: auto; */
    margin-left: 10px;
    grid-area: title;
    text-align: left;
    font-size: 1.2rem;
    /* width: 60%; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & button {
    font-size: 20px;
    /* padding: 0 20px; */
    border: none;
    background-color: transparent;
    grid-area: button2;

    &:nth-child(1) {
      grid-area: aux;
    }

    /* Second button selector */
    &:nth-child(3) {
      grid-area: button1;
    }
  }
`;

const Navbar = (props) => {
  return (
    <StyledNav>
      <button href="_blank" onClick={props.auxClick}>{props.aux}</button>
      <h1>{props.title}</h1>
      <button href="_blank" onClick={props.item1Click}>
        {props.item1}
      </button>
      <button href="_blank">{props.item2}</button>
    </StyledNav>
  );
};

export default Navbar;
