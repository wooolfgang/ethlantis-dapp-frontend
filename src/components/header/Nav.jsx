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
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,  box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  padding: 8px 6px;
  border-radius: 3px;

  &:hover {
    background: rgba(0, 0, 0, .1);
  }
`;

const Nav = ({ authenticated }) => (
  <StyledNav >
    <StyledLink to="/matches" href="/" > Matches </StyledLink>
    <StyledLink to="/faq" href="/"> Faq </StyledLink>
    <StyledLink to="/login" href="/"> {authenticated ? 'Profile' : 'Login'} </StyledLink>
  </StyledNav >
);

export default Nav;

