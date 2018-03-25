import React from 'react';
import styled from 'styled-components';
import { DOTA_LOGO, CSGO_LOGO, LOL_LOGO } from '../../assets/images';

const StyledDiv = styled.div`
  display: grid;
  grid-template-areas: 
  ". . . ."
  ". header banner ."
  ". . . ."
  ;
  grid-template-columns: 180px 1fr .85fr 180px;
  grid-template-rows: 20px 1fr 20px;
  height: 50vh;
  background: ${props => props.theme.colorLight};
`;

const HeaderContainer = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 2em;
  color: #212121;
  font-family: ${props => props.theme.fontHeading};
`;

const H2 = styled.h2`
  font-size: 1.4em;
  font-weight: 100;
  color: #456990;
`;

const Container = styled.div`
  grid-area: banner;
  display: flex;
  flex-direction: column;  
  transform: skewX(-12deg) skewY(-12deg);
  border: 1px solid #F45B69;
  width: 90%;
  height: 85%;
  padding: 10px;
`;

const Games = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GameBanner = styled.div`
  background: url(${props => props.backgroundImage}) center no-repeat;
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

const GamesBanner = () => (
  <StyledDiv>
    <HeaderContainer>
      <H1> Bet on the games you love. </H1>
      <H2> With the teams that you support. </H2>
    </HeaderContainer>
    <Container>
      <Games>
        <GameBanner backgroundImage={LOL_LOGO} width="160px" height="160px" />
        <GameBanner backgroundImage={DOTA_LOGO} width="90px" height="90px" />
        <GameBanner backgroundImage={CSGO_LOGO} width="160px" height="160px" />
      </Games>
      <Teams>
        <Team image="http://res.cloudinary.com/depjh17m6/image/upload/v1521965059/Ethlantis/Screen_Shot_2018-03-25_at_3.58.18_PM.png" />
        <Team image="http://res.cloudinary.com/depjh17m6/image/upload/v1521965062/Ethlantis/Screen_Shot_2018-03-25_at_3.58.30_PM.png" />
        <Team image="http://res.cloudinary.com/depjh17m6/image/upload/v1521965065/Ethlantis/Screen_Shot_2018-03-25_at_3.58.27_PM.png" />
        <Team image="http://res.cloudinary.com/depjh17m6/image/upload/v1521965059/Ethlantis/Screen_Shot_2018-03-25_at_3.58.23_PM.png" />
      </Teams>
    </Container>
  </StyledDiv>
);

export default GamesBanner;
