import React from 'react';
import styled from 'styled-components';
import GameTypes from './gameslistpicker/GameTypes';
import { LOL_ICON_FILTER, DOTA_ICON_FILTER, CSGO_ICON_FILTER } from '../../assets/images';

const StyledDiv = styled.div`
  grid-area: left;
  height: 130px;
  margin-top: 10px;
`;

const Header = styled.h2`
  font-family: ${props => props.theme.fontHeading};
  grid-area: header;
  cursor: pointer;
  font-weight: 300;
  border-bottom: 1px solid lightgray;
  transition-duration: 200ms;
  margin: 0 auto;

  :hover {
    opacity: 0.8;
  }

  @media screen and (max-width: 700px) {
    text-align: center;
  }
`;

const GameTypesWrapper = styled.div`
  margin: 20px auto 0 auto;
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
