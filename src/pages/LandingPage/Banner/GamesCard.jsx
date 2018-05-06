import React from 'react';
import styled from 'styled-components';
import { DOTA_LOGO, CSGO_LOGO, LOL_LOGO, TEAM_A, TEAM_B, TEAM_C, TEAM_D } from '../../../assets/images';
import Card from '../../../components/Card';

const Games = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Game = styled.div`
  background: url(${props => props.image}) center no-repeat;
  background-size: contain;
  width: ${props => props.width};
  height: ${props => props.height};
`;

const Teams = styled.div` 
  grid-area: teams;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Team = styled.div`
  width: 75px;
  height: 75px;
  background: gray;
  border-radius: 50%;
  background: url(${props => props.image}) center no-repeat;
  background-size: cover;
`;

const GamesCard = () => (
  <Card style={{ padding: '20px', height: '100%', width: '100%' }}>
    <Games>
      <Game image={LOL_LOGO} width="160px" height="160px" />
      <Game image={DOTA_LOGO} width="90px" height="90px" />
      <Game image={CSGO_LOGO} width="160px" height="160px" />
    </Games>
    <Teams>
      <Team image={TEAM_A} />
      <Team image={TEAM_B} />
      <Team image={TEAM_C} />
      <Team image={TEAM_D} />
    </Teams>
  </Card>
);

export default GamesCard;
