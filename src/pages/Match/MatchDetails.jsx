import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TeamDetails from './matchdetails/TeamDetails';
import Bet from './matchdetails/Bet';
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
    this.swapChosenTeam = this.swapChosenTeam.bind(this);
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

  swapChosenTeam() {
    const {
      match: {
        teamA, teamB,
      }, setPlacedBets,
    } = this.props;
    const { chosenTeam, placedValue } = this.state;

    if (chosenTeam === teamA) {
      this.setState({ chosenTeam: teamB });
      setPlacedBets({
        teamAIncrement: -placedValue,
        teamBIncrement: placedValue,
      });
    } else if (chosenTeam === teamB) {
      this.setState({ chosenTeam: teamA });
      setPlacedBets({
        teamAIncrement: placedValue,
        teamBIncrement: -placedValue,
      });
    }
  }

  render() {
    const { match, setPlacedBets } = this.props;
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
            teamA={match.teamA}
            teamB={match.teamB}
            placedValue={placedValue}
            setBetState={this.setBetState}
            swapChosenTeam={this.swapChosenTeam}
            setPlacedBets={setPlacedBets}
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

