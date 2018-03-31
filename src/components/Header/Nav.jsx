import React from 'react';
import styled from 'styled-components';
import Link from '../Link';

const StyledNav = styled.div`
  position: relative;

  a {
    color: white !important;
  }
`;

const Nav = () => (
  <StyledNav >
    <Link to="/games" href="/" > Games </Link>
    <Link to="/faq" href="/"> Faq </Link>
    <Link to="/login" href="/"> Login </Link>
  </StyledNav >
);

export default Nav;

