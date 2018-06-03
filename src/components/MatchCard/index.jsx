import React from 'react';
import styled from 'styled-components';
import { getMatchBackgroundImage, getMatchBackground } from '../../utils';
import { TEAM_A, TEAM_B } from '../../assets/images';
import Button from '../Button';
import Background from './Background';

const StyledDiv = styled.div` 
  width: 100%;
  height: 275px;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
  box-sizing: border-box;
  transition: 200ms;

  :hover {
    transform: translateY(-2px);
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

class MatchCard extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <StyledDiv onClick={this.handleRedirect}>
        <Background
          backgroundImage={getMatchBackgroundImage(match.gameType)}
          background={getMatchBackground(match.gameType)}
          teamA={match.teamA}
          teamB={match.teamB}
          teamAIcon={TEAM_A}
          teamBIcon={TEAM_B}
          teamAPercentage={match.teamAPercentage}
          teamBPercentage={match.teamBPercentage}
        />
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
  }
}

export default MatchCard;
