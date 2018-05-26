import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid lightgray;
  margin: 0px 5px;
  width: 100px;
  height: 40px;
  transition: box-shadow .3s ease,opacity .3s ease,-webkit-transform .3s ease;
  cursor: pointer;

  :hover {
    box-shadow: .5px .5px 1px 1px ${props => props.theme.colorSecondary};
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
  color: ${props => props.theme.colorSecondary};
`;

const GameType = ({ type, image }) => (
  <StyledDiv>
    <GameImage image={image} />
    <Type>{type.toUpperCase()} </Type>
  </StyledDiv>
);

export default GameType;
