import React from 'react';
import styled from 'styled-components';
import Link from '../Link';

const StyledNav = styled.div`
  position: relative;
  color: white;

  a {
    color: white !important;
  }

  @media screen and (min-width: 700px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 200px;
  }
`;

const StyledLink = styled(Link)`
  transition-duration: 0.2s;
  font-weight: 500;

  &:hover {
    transform: scale(1.1);
    transiton-duration: 0.2s;
  }
`;

const Nav = () => (
  <StyledNav >
    <StyledLink to="/matches" href="/" > Matches </StyledLink> |
    <StyledLink to="/faq" href="/"> Faq </StyledLink> |
    <StyledLink to="/login" href="/"> Login </StyledLink>
  </StyledNav >
);

export default Nav;

