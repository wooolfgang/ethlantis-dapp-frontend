import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import { bet } from '../../actions/userActions';

const StyledDiv = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 0px 8px;
  align-items: center;
  box-sizing: border-box;
`;

const Input = styled.input`
  background: none;
  border: none;
  border: 1px solid lightgray;
  width: 150px;
  height: 25px;
  font-size: 1.2em;
  outline: none;
  font-weight: 300;

  :hover {
    border: 1px solid ${props => props.theme.colorSecondary};
  }

  :focus {
    border: 1px solid ${props => props.theme.colorSecondary};
  }
`;

class Bet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      betValue: '',
    };

    this.handleBetInput = this.handleBetInput.bind(this);
    this.placeBet = this.placeBet.bind(this);
  }

  handleBetInput(e) {
    this.setState({ betValue: e.target.value });
  }

  placeBet() {
    const {
      placeBet, gameType, chosenTeam, match: { params: { id } },
    } = this.props;
    placeBet(id, gameType, chosenTeam, this.state.betValue);
  }

  render() {
    const { betValue } = this.state;
    const { chosenTeam } = this.props;
    return (
      <StyledDiv>
        <span><Input onChange={this.handleBetInput} value={betValue} /> Finney </span>
        <Button
          type="secondary"
          disabled={(!betValue || betValue.length === 0) ||
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
  placeBet: (id, gameType, teamName, betValue) => dispatch(bet(id, gameType, teamName, betValue)),
});

export default withRouter(connect(null, mapDispatchToProps)(Bet));
