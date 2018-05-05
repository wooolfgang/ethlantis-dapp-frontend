import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Nav from './Nav';

const StyledHeader = styled.nav`
  display: grid;
  grid-template-areas: '. flex .';
  grid-template-columns: 50px 1fr 50px;
  height: 65px;
  background: ${props => props.theme.colorPrimary};
`;

const Flex = styled.div`
  display: flex;
  grid-area: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = () => (
  <StyledHeader>
    <Flex>
      <Logo />
      <Nav />
    </Flex>
  </StyledHeader>
);

export default Header;