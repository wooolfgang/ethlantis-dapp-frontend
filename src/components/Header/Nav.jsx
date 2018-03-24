import React from 'react';
import styled from 'styled-components';
import Link from '../Link';

const StyledNav = styled.div` 
  a {
    color: white !important;
  }
`;

class Nav extends React.Component {
  async componentDidMount() {
    const { web3, matchBetting, loginUserFunc } = this.props;
    const userId = await web3.eth.getCoinbase();
    const owner = await matchBetting.owner.call();
    loginUserFunc(userId, owner === userId);
  }

  render() {
    const { web3, matchBetting } = this.props;
    if (!web3 || !matchBetting) {
      return null;
    }

    return (
      <StyledNav >
        <Link to="/games" href="/" > Games </Link>
        <Link to="/faq" href="/"> Faq </Link>
        <Link to="/login" href="/"> Login </Link>
      </StyledNav >
    );
  }
}

export default Nav;

