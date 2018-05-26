import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';

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
  }

  handleBetInput(e) {
    this.setState({ betValue: e.target.value });
  }

  render() {
    const { betValue } = this.state;
    const { chosenTeam } = this.props;
    return (
      <StyledDiv>
        <span><Input onChange={this.handleBetInput} value={betValue} /> ETH </span>
        <Button
          type="secondary"
          disabled={betValue.length === 0 || chosenTeam.length === 0}
        >
          Place Bet
        </Button>
      </StyledDiv>
    );
  }
}

export default Bet;
