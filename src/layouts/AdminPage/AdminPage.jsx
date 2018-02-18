import React from 'react';
import styled from 'styled-components';

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

class AdminPage extends React.Component {
  async componentDidMount() {
    const { web3, matchBetting, loginUser } = this.props;
    const userId = await web3.eth.getCoinbase();
    const owner = await matchBetting.owner.call();
    loginUser(userId, userId === owner);
  }

  render() {
    const { user } = this.props;
    if (user.id && !user.isOwner) {
      return <h1> Not authorized </h1>;
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
          <button> Create Match </button>
        </Center>
      </StyledAmin>
    );
  }
}

export default AdminPage;
