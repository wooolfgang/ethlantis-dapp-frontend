import React from 'react';
import styled from 'styled-components';
import matchHash from '../../utils/utils';

const StyledAmin = styled.div`
  display: grid;
  grid-template-areas: '. center .';
  grid-template-columns: 100px 1fr 100px;
  grid-template-rows: minmax(500px, auto);
`;

const Center = styled.div`
  grid-area: center;
  background: #FAFAFA;
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
    this.addMatch = this.addMatch.bind(this);
  }

  async addMatch() {
    const { matchBetting, user } = this.props;
    await matchBetting.addMatch(Date.now() + 360000, 1, 'Dignitas', 'Potato', 'Dota2', matchHash(1, 'Dota2'), { from: user.id });
  }

  render() {
    const { user, matchBetting } = this.props;
    if (user.id && !user.isOwner) {
      return <Message> Not authorized </Message>;
    }

    if (!matchBetting) {
      return <Message> Contract not found </Message>;
    }

    if (!user.id) {
      return <Message> No user found. Try loggin in with metamask</Message>;
    }

    return (
      <StyledAmin >
        <Center>
          <h1> Admin Page </h1>
          <h4> Welcome, {user.id}  </h4>
          <h4> Game Details: </h4>
          <span> Timestamp: </span><input type="text" /> <br />
          <span> Match Id: </span><input type="text" /> <br />
          <span> Team A: </span><input type="text" /> <br />
          <span> Team B: </span><input type="text" /> <br />
          <button onClick={this.addMatch}> Create Match </button>
        </Center>
      </StyledAmin>
    );
  }
}

export default AdminPage;
