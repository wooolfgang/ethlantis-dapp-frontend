import React from 'react';
import styled from 'styled-components';
import GameTypes from '../../components/GameTypes';

const StyledDiv = styled.div`
  grid-area: left;
  display: grid;
  grid-template-areas: 
  '.'
  'header'
  '.'
  'games'
  '.';
  grid-template-rows: 20px auto 10px auto 20px;
  grid-template-columns: 500px;
`;

const Header = styled.h2`
  font-family: ${props => props.theme.fontHeading};
  font-weight: normal;
  grid-area: header;
  cursor: pointer;
  border-bottom: 1px solid lightgray;
  transition-duration: 200ms;

  :hover {
    opacity: 0.8;
  }
`;

const GameTypesWrapper = styled.div`
  grid-area: games;
`;

const games = [
  {
    type: 'Dota 2',
    image: 'http://res.cloudinary.com/depjh17m6/image/upload/v1522507627/Ethlantis/dota-2-seeklogo.com-min.png',
  },
  {
    type: 'LoL',
    image: 'http://res.cloudinary.com/depjh17m6/image/upload/v1521946480/Ethlantis/LOL_LOGO_RGB_SMALL_copy-min.png',
  },
  {
    type: 'CS:GO',
    image: 'http://res.cloudinary.com/depjh17m6/image/upload/v1522508979/Ethlantis/counter-strike-global-offensive-seeklogo.com_2.png',
  },
];

const GamesListPicker = () => (
  <StyledDiv>
    <Header> Games </Header>
    <GameTypesWrapper>
      <GameTypes games={games} />
    </GameTypesWrapper>
  </StyledDiv>
);

export default GamesListPicker;
