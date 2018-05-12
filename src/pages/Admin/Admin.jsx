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
  height: calc(100vh - 64px);
  background: white;
`;

const Center = styled.div`
  grid-area: center;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(51, 51, 51, .1);
`;

const Columns = styled.div`
  display: flex;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  font-size: 1em;
  margin-top: 10px;
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
                <Columns>
                  <Fields>
                    <span> Timestamp: </span>
                    <span> Match Id: </span>
                    <span> Team A: </span>
                    <span> Team B: </span>
                    <span> Game Type: </span>
                  </Fields>
                  <Inputs>
                    <input
                      type="text"
                      onChange={this.handleInput}
                      value={this.state.timestamp}
                      id="timestamp"
                    />
                    <input
                      type="text"
                      onChange={this.handleInput}
                      value={this.state.matchId}
                      id="matchId"
                    />
                    <input
                      type="text"
                      onChange={this.handleInput}
                      value={this.state.teamA}
                      id="teamA"
                    />
                    <input
                      type="text"
                      onChange={this.handleInput}
                      value={this.state.teamB}
                      id="teamB"
                    />
                    <input
                      type="text"
                      onChange={this.handleInput}
                      value={this.state.gameType}
                      id="gameType"
                    />
                  </Inputs>
                </Columns>
                <ButtonContainer>
                  <Button
                    onClick={this.addMatch}
                    type="primary"
                  >
                    Create Match
                  </Button>
                </ButtonContainer>
              </Fragment> :
              <Message> Not authorized </Message>
          }
        </Center>
      </StyledDiv>
    );
  }
}

export default AdminPage;
