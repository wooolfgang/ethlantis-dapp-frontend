import React from 'react';
import styled from 'styled-components';
import { DOTA_LOGO, CSGO_LOGO, LOL_LOGO, NAVI, LIQUID, FAZE, TSM } from '../../../assets/images';
import Card from '../../../components/Card';

const StyledCard = styled(Card)`

  @media screen and (min-width: 700px) {
    width: 100%;
    
  }
  @media screen and (max-width: 700px) {
    width: 100vw;
  }
`;

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
  @media screen and (min-width: 700px) {
    width: 75px;
    height: 75px;
  }

  @media screen and (max-width: 700px) {
    width: 60px;
    height: 60px;
  }
  background: gray;
  border-radius: 50%;
  background: url(${props => props.image}) center no-repeat;
  background-size: cover;
`;

const mobileSizes = {
  lolWidthHeight: '100px',
  dotaWidthHeight: '70px',
  csgoWidthHeight: '100px',
};

const GamesCard = () => (
  <StyledCard
    padding="20px 20px 40px 20px"
    height="225px"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="space-around"
  >
    <Games>
      <Game
        image={LOL_LOGO}
        width={mobileSizes.lolWidthHeight}
        height={mobileSizes.lolWidthHeight}
      />
      <Game
        image={DOTA_LOGO}
        width={mobileSizes.dotaWidthHeight}
        height={mobileSizes.dotaWidthHeight}
      />
      <Game
        image={CSGO_LOGO}
        width={mobileSizes.csgoWidthHeight}
        height={mobileSizes.csgoWidthHeight}
      />
    </Games>
    <Teams>
      <Team image={TSM} />
      <Team image={NAVI} />
      <Team image={LIQUID} />
      <Team image={FAZE} />
    </Teams>
  </StyledCard >
);

export default GamesCard;
