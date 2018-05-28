import React, { Fragment } from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  margin: 0;
  font-size: 2em;
  font-weight: 400;
  color: #212121;
  font-family: ${props => props.theme.fontHeading};
`;

const H2 = styled.h2`
  font-size: 1.4em;
  font-weight: 300;
  color: #456990;
`;

const Text = () => (
  <Fragment>
    <H1> Bet on the games you love. </H1>
    <H2> With the teams that you support. </H2>
  </Fragment>
);

export default Text;

