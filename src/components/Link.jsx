import React from 'react';
import { Link as L } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(L)`
  color: blue;
  text-decoration: none;
  ${props => props.style && props.style};
`;

const Link = props => (
  <StyledLink {...props} style={props.style} />
);

export default Link;
