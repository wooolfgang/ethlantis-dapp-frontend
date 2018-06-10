import React from 'react';
import styled from 'styled-components';
import Logo from './header//Logo';
import Nav from './header//Nav';

const StyledHeader = styled.nav`
  display: grid;
  grid-template-areas: '. flex .';
  grid-template-columns: 50px 1fr 50px;
  height: 64px;
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
