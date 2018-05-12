import React from 'react';
import styled from 'styled-components';
import Link from '../Link';
import { LOGO } from '../../assets/images';

const StyledLogo = styled.img`
  text-transform: uppercase;
  cursor: pointer;  
  color: white;
  padding: 5px;
  width: 125px;
  height: auto;
`;

const Logo = () => (
  <Link to="/" href="/" style={{ color: '#333' }}>
    <StyledLogo src={LOGO} />
  </Link>
);

export default Logo;
