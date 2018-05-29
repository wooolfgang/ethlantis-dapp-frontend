import React from 'react';
import styled from 'styled-components';
import Teams from './Teams';
import Bet from './Bet';

const StyledDiv = styled.div`
  grid-area: match-details; 
  width: 600px;
  height: 250px;
  border: 1px solid lightgray;
  position: relative;
  z-index: 1;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const TeamContainer = styled.div`
  display: flex;
  flex: 6;
  justify-content: space-around;
  align-items: center;
`;

const BottomContainer = styled.div`
  flex: 2;
  border-top: 1px solid lightgray;
`;

class MatchDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenTeam: null,
    };
    this.chooseTeam = this.chooseTeam.bind(this);
  }

  chooseTeam(team) {
    this.setState({ chosenTeam: team });
  }

  render() {
    const { match } = this.props;
    const { chosenTeam } = this.state;
    return (
      <StyledDiv>
        <TeamContainer>
          {match &&
            <Teams
              match={match}
              chosenTeam={chosenTeam}
              chooseTeam={this.chooseTeam}
            />
          }
        </TeamContainer>
        <BottomContainer>
          {
            match &&
            <Bet
              chosenTeam={chosenTeam}
              gameType={match.gameType}
              teamA={match.teamA}
              teamB={match.teamB}
            />
          }
        </BottomContainer>
      </StyledDiv>
    );
  }
}

export default MatchDetails;

