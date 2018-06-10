import React from 'react';
import styled from 'styled-components';
import GameTypes from './gameslistpicker/GameTypes';
import { LOL_ICON_FILTER, DOTA_ICON_FILTER, CSGO_ICON_FILTER } from '../../assets/images';

const StyledDiv = styled.div`
  grid-area: left;
  display: grid;
  grid-template-areas: 
  '.'
  'header'
  '.'
  'games'
  '.';
  grid-template-rows: 15px 35px 10px 40px 10px ;
  grid-template-columns: 500px;
`;

const Header = styled.h2`
  font-family: ${props => props.theme.fontHeading};
  grid-area: header;
  cursor: pointer;
  font-weight: 300;
  border-bottom: 1px solid lightgray;
  transition-duration: 200ms;
  margin: 0px;

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
    image: DOTA_ICON_FILTER,
  },
  {
    type: 'LoL',
    image: LOL_ICON_FILTER,
  },
  {
    type: 'CS:GO',
    image: CSGO_ICON_FILTER,
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
