import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 2px;
  margin: 0px 5px;
  width: 100px;
  height: 40px;
  cursor: pointer;
  transition: 100ms cubic-bezier(0.1, 0.7, 1.0, 0.1);
  background-color: #d7eff2;

  :hover {
    background-color: #bee6e9;
  }
`;

const GameImage = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: url(${props => props.image}) center no-repeat;
  background-size: cover;
  box-shadow: .25px .25px .5px .5px lightgray;
`;

const Type = styled.span`
  font-size: .80em;
  font-family: ${props => props.theme.fontBody};
  font-weight: 300;
`;

const GameType = ({ type, image }) => (
  <StyledDiv>
    <GameImage image={image} />
    <Type>{type.toUpperCase()} </Type>
  </StyledDiv>
);

export default GameType;
