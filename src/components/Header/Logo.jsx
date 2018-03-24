import React from 'react';
import styled from 'styled-components';
import Link from '../Link';

const StyledLogo = styled.div`
  text-transform: uppercase;
  cursor: pointer;  
  color: white;
  padding: 5px;
`;

const Logo = () => (
  <Link to="/" href="/" style={{ color: '#333' }}>
    <StyledLogo> Ethlantis </StyledLogo>
  </Link>
);

export default Logo;
