import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 30px;
  width: 275px;
  position: absolute;
  top: 50px;
  right: -30px;
`;

const Status = styled.span`
  color: rgba(0,0,0, 0.8);
  font-size: .9em;
`;

class LoginStatus extends React.Component {
  async componentDidMount() {
    const { web3, matchBetting, getUserData } = this.props;
    await getUserData(web3, matchBetting);
  }

  render() {
    const { user } = this.props;

    return (
      <StyledDiv>
        <Status> Status: Connected  </Status>
        <Status> Balance: {user.balance ? user.balance : 0} Ξ </Status>
      </StyledDiv>
    );
  }
}


export default LoginStatus;
