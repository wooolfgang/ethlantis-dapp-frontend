import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Logo from './header/Logo';
import Nav from './header/Nav';

const StyledHeader = styled.nav`
  display: grid;
  grid-template-areas: '. flex .';
  grid-template-columns: 20px 1fr 30px;
  height: 64px;
  background: ${props => props.theme.colorPrimary};

  @media screen and (max-width: 700px) {
    grid-template-columns: 10px 1fr 20px;
  }
`;

const Flex = styled.div`
  display: flex;
  grid-area: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = ({ authenticated }) => (
  <StyledHeader>
    <Flex>
      <Logo />
      <Nav authenticated={authenticated} />
    </Flex>
  </StyledHeader>
);

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, null)(Header);
