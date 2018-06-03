import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import Slider from '../../components/Slider';
import { bet, getPlacedBetAmount } from '../../actions/userActions';

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
      placedBet: null,
      placedTeam: null,
      max: 100,
      min: 0,
    };

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.placeBet = this.placeBet.bind(this);
  }

  async componentDidMount() {
    const {
      getPlacedBet, teamA, teamB, match: { params: { id } },
    } = this.props;
    const res = await getPlacedBet(id, teamA, teamB);
    this.setState({ placedBet: res.betAmount, placedTeam: res.teamName });
  }

  handleSliderChange(e) {
    this.setState({ value: e.target.value });
  }

  placeBet() {
    const {
      placeBet, chosenTeam, match: { params: { id } },
    } = this.props;
    placeBet(id, chosenTeam, this.state.value);
  }

  render() {
    const {
      value, max, min, placedBet, placedTeam,
    } = this.state;
    const { chosenTeam } = this.props;
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
          {(placedBet && placedTeam) &&
            <PlacedBet> You placed {placedBet} ETH on Team {placedTeam} </PlacedBet>
          }
        </Container>
        <Button
          type="secondary"
          disabled={(!value || value.length === 0) ||
            (!chosenTeam || chosenTeam.length === 0)}
          onClick={this.placeBet}
        >
          Place Bet
        </Button>
      </StyledDiv>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  placeBet: (id, teamName, betValue) => dispatch(bet(id, teamName, betValue)),
  getPlacedBet: (id, teamA, teamB) => dispatch(getPlacedBetAmount(id, teamA, teamB)),
});

export default withRouter(connect(null, mapDispatchToProps)(Bet));
