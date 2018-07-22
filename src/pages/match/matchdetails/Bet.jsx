import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../components/Button';
import Slider from '../../../components/Slider';
import { bet, swapTeam, getWinnerFromOracle } from '../../../actions/userActions';

const StyledDiv = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 0px 8px;
  align-items: center;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Value = styled.span`
  font-weight: 300;
  color: ${props => props.theme.colorPrimary};
`;

const PlacedBet = styled.span`
  font-weight: 300;
  font-size: .80em;
  color: ${props => props.theme.colorTertiary};
`;

class Bet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      max: 100,
      min: 0,
      swapStatus: undefined,
    };

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.placeBet = this.placeBet.bind(this);
    this.swapTeam = this.swapTeam.bind(this);
    this.getWinner = this.getWinner.bind(this);
  }

  async getWinner() {
    const { getWinner, gameType, matchId } = this.props;
    getWinner(`${matchId}`, gameType);
  }

  async placeBet() {
    const {
      placeBet, chosenTeam, match: { params: { id } }, setBetState,
      teamA, teamB, setPlacedBets,
    } = this.props;

    const res = await placeBet(id, chosenTeam, this.state.value);
    const placedValue = Number(this.state.value);

    if (res && res.receipt.status === '0x01') {
      setBetState(chosenTeam, placedValue, true);
      if (chosenTeam === teamA) {
        setPlacedBets({ teamAIncrement: placedValue });
      } else if (chosenTeam === teamB) {
        setPlacedBets({ teamBIncrement: placedValue });
      }
    }
  }

  async swapTeam() {
    const {
      swapPlacedTeam, swapChosenTeam, match: { params: { id } },
    } = this.props;

    try {
      this.setState({ swapStatus: 'loading' });
      const res = await swapPlacedTeam(id);

      if (res && res.receipt.status === '0x01') {
        this.setState({ swapStatus: 'success' });
        swapChosenTeam();
      } else {
        this.setState({ swapStatus: 'failed' });
      }
    } catch (e) {
      this.setState({ swapStatus: undefined });
    }
  }

  handleSliderChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const {
      value, max, min, swapStatus,
    } = this.state;
    const { chosenTeam, placedValue } = this.props;
    return (
      <StyledDiv>
        <Slider
          max={max}
          min={min}
          handleChange={this.handleSliderChange}
          defaultValue={0}
        />
        <Container>
          <Value> {value || '---'}  ETH </Value>
          {
            (placedValue && chosenTeam) &&
            <PlacedBet> You placed {placedValue} ETH on Team {chosenTeam}
            </PlacedBet>
          }
        </Container>
        {(placedValue && chosenTeam) ?
          <Button type="secondary" onClick={this.swapTeam}>
            {swapStatus === 'loading' ? 'Loading...' : 'Swap Team'}
          </Button> :
          <Button
            type="secondary"
            disabled={(!value || value.length === 0) ||
              (!chosenTeam || chosenTeam.length === 0)}
            onClick={this.placeBet}
          >
            Place Bet
          </Button>
        }
        <Button
          type="primary"
          onClick={this.getWinner}
        >
          Get Winner
        </Button>
      </StyledDiv>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  placeBet: (id, teamName, betValue) => dispatch(bet(id, teamName, betValue)),
  swapPlacedTeam: id => dispatch(swapTeam(id)),
  getWinner: (matchId, gameType) => dispatch(getWinnerFromOracle(matchId, gameType)),
});

export default withRouter(connect(null, mapDispatchToProps)(Bet));
