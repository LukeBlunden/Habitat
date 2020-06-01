import React from 'react'
import styled from 'styled-components'
 
const StyledNav = styled.nav`
  display: flex;
  /* height: 50px; */
  padding: 15px;

  & h1 {
    display: inline-block;
    margin-right: auto;
  }

  & button {
    font-size: 20px;
    padding: 0 20px;
    border: none;
    background-color: transparent;
  }
`;

const Navbar = props => {
  return (
    <StyledNav>
      <h1>{props.title}</h1>
      <button href="_blank" onClick={props.addHabit} >{props.item1}</button>
      <button href="_blank">{props.item2}</button>
    </StyledNav>
  )
}
 
export default Navbar