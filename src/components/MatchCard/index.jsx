import React from 'react';
import styled from 'styled-components';
import { getMatchBackgroundImage, getMatchBackground } from '../../utils';
import { TEAM_A, TEAM_B } from '../../assets/images';
import Button from '../Button';

const StyledDiv = styled.div` 
  width: 100%;
  height: 275px;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
  box-sizing: border-box;
`;

const Background = styled.div`
  width: 100%;
  height: 80%;
  background: ${props => props.background};
  background: url(${props => props.backgroundImage}) no-repeat center;
  background-size: cover;
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const BackgroundFilter = styled.div`
  height: 100%;
  width: 100%;
  z-index: 2;
  background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    );
  position: absolute;
  opacity: 0.15;

  ${Background}:hover & {
    opacity: 0.25;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
`;

const TeamIcon = styled.div`
  width: 90px;
  height: 90px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  background: url(${props => props.icon}) no-repeat center;
  border: 1px solid white;
  background-size: cover;
  opacity: 0.9;
  margin-bottom: 3px;

  ${Background}:hover & {
    opacity: 1;
  }
`;

const Bottom = styled.div`
  height: 20%;
  padding: 0px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MatchCard = ({ match }) => (
  <StyledDiv>
    <Background
      backgroundImage={getMatchBackgroundImage(match.gameType)}
      background={getMatchBackground(match.gameType)}
    >
      <Left>
        <TeamIcon teamA={match.teamA} icon={TEAM_A} />
        <span style={{ color: 'white', fontSize: '1.15em' }}> {match.teamA} </span>
        <span style={{ color: 'white', fontSize: '1.05em' }}> 70% </span>
      </Left>
      <Right>
        <TeamIcon teamB={match.teamB} icon={TEAM_B} />
        <span style={{ color: 'white', fontSize: '1.15em' }}> {match.teamB} </span>
        <span style={{ color: 'white', fontSize: '1.05em' }}> 30% </span>
      </Right>
      <BackgroundFilter />
    </Background>
    <Bottom>
      <a href={`/match/${match.id}`}>
        <Button padding="7px 20px">
          <span style={{ fontSize: '.95em', margin: 'auto' }}>
            Place Bet
          </span>
        </Button>
      </a>
    </Bottom>
  </StyledDiv>
);

export default MatchCard;
