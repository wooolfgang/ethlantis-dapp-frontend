import React from 'react';
import styled from 'styled-components';
import Link from '../Link';

const StyledNav = styled.div`

`;

class Nav extends React.Component {
  async componentDidMount() {
    const { web3, matchBetting, loginUserFunc } = this.props;
    console.log(web3);
    const userId = await web3.eth.getCoinbase();
    const owner = await matchBetting.owner.call();
    loginUserFunc(userId, owner === userId);
  }

  render() {
    const { web3, matchBetting } = this.props;
    if (!web3 || !matchBetting) {
      return null;
    }
    console.log(web3, 'WEB3');
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

