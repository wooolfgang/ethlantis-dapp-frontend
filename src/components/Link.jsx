import React from 'react';
import { Link as L } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(L)`
  color: blue;
  text-decoration: none;
  font-family: ${props => props.theme.fontBody};
  font-size: .95em;
  font-weight: 100;
  letter-spacing: .1em;
`;

const Link = props => (
  <StyledLink {...props} style={props.style}>
    {props.children}
  </StyledLink>
);

export default Link;
