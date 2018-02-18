import React from 'react';
import styled from 'styled-components';
import Link from '../Link';

const StyledLogo = styled.div`
  text-transform: uppercase;
  cursor: pointer;

  :hover {
    background: ${props => props.theme.primary};
    color: white;
  }
`;

const Logo = () => (
  <Link to="/" href="/" style={{ color: '#333' }}>
    <StyledLogo> Ethlantis </StyledLogo>
  </Link>
);

export default Logo;
