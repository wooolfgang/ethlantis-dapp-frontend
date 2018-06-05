import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TeamDetails from './TeamDetails';
import Bet from './Bet';
import { getPlacedBetAmount } from '../../actions/userActions';

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
      placedValue: null,
      hasPlaced: false,
    };
    this.chooseTeam = this.chooseTeam.bind(this);
    this.setBetState = this.setBetState.bind(this);
  }

  async componentDidMount() {
    const { getPlacedBet, id, address } = this.props;
    const { match: { teamA, teamB } } = this.props;
    const res = await getPlacedBet(id, teamA, teamB, address);
    if (res) {
      this.setState({ chosenTeam: res.chosenTeam, placedValue: res.betAmount, hasPlaced: !!res });
    }
  }

  setBetState(chosenTeam, placedValue, hasPlaced) {
    this.setState({ chosenTeam, placedValue, hasPlaced });
  }

  chooseTeam(team) {
    if (!this.state.hasPlaced) {
      this.setState({ chosenTeam: team });
    }
  }

  render() {
    const { match } = this.props;
    const { chosenTeam, placedValue, hasPlaced } = this.state;

    return (
      <StyledDiv>
        <TeamContainer>
          <TeamDetails
            match={match}
            chosenTeam={chosenTeam}
            chooseTeam={this.chooseTeam}
            hasPlaced={hasPlaced}
          />
        </TeamContainer>
        <BottomContainer>
          <Bet
            chosenTeam={chosenTeam}
            placedValue={placedValue}
            setBetState={this.setBetState}
            gameType={match.gameType}
            teamA={match.teamA}
            teamB={match.teamB}
          />
        </BottomContainer>
      </StyledDiv>
    );
  }
}

const mapStateToProps = state => ({
  address: state.user.address,
});

const mapDispatchToProps = dispatch => ({
  getPlacedBet: (id, teamA, teamB, userAddress) =>
    dispatch(getPlacedBetAmount(id, teamA, teamB, userAddress)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchDetails);

