import React, { Fragment } from 'react';
import styled from 'styled-components';
import matchHash from '../../utils/utils';
import Button from '../../components/Button';

const StyledDiv = styled.div`
  display: grid;
  grid-template-areas: 
  '. . .'
  '. center .'
  ;
  grid-template-columns: 75px 1fr 75px;
  grid-template-rows: 70px 400px;
`;

const Center = styled.div`
  grid-area: center;
  border: 1px solid lightgray;
  padding: 20px;
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2em;
  color: palevioletred;
`;

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matchId: '',
      timestamp: '',
      teamA: '',
      teamB: '',
      gameType: '',
    };

    this.addMatch = this.addMatch.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  async addMatch() {
    const { matchBetting, user } = this.props;
    const {
      timestamp, matchId, teamA, teamB, gameType,
    } = this.state;
    await matchBetting.addMatch(
      timestamp,
      matchId,
      teamA,
      teamB,
      gameType,
      matchHash(matchId, gameType), { from: user.id },
    );
  }

  handleInput(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const { user } = this.props;

    if (!user.id) {
      return null;
    }

    return (
      <StyledDiv >
        <Center>
          {
            user.isOwner ?
              <Fragment>
                <h1> Admin Page </h1>
                <h4> Welcome, {user.id}  </h4>
                <h4> Game Details: </h4>
                <span> Timestamp: </span>
                <input
                  type="text"
                  onChange={this.handleInput}
                  value={this.state.timestamp}
                  id="timestamp"
                />
                <br />
                <span> Match Id: </span>
                <input
                  type="text"
                  onChange={this.handleInput}
                  value={this.state.matchId}
                  id="matchId"
                />
                <br />
                <span> Team A: </span>
                <input
                  type="text"
                  onChange={this.handleInput}
                  value={this.state.teamA}
                  id="teamA"
                />
                <br />
                <span> Team B: </span>
                <input
                  type="text"
                  onChange={this.handleInput}
                  value={this.state.teamB}
                  id="teamB"
                />
                <br />
                <span> Game Type: </span>
                <input
                  type="text"
                  onChange={this.handleInput}
                  value={this.state.gameType}
                  id="gameType"
                />
                <br />
                <Button
                  onClick={this.addMatch}
                  type="primary"
                >
                  Create Match
                </Button>
              </Fragment> :
              <Message> Not authorized </Message>
          }
        </Center>
      </StyledDiv>
    );
  }
}

export default AdminPage;
