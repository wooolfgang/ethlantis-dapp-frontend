import React from 'react';
import styled from 'styled-components';
import Illustrations from './Illustrations';

const StyledDiv = styled.div`
  height: 55vh;
  background: #fff;
  display: flex;
`;

const Container = styled.div`
  height: 85%;
  width: 800px;
  margin: auto;
  text-align: center;
`;

const Header = styled.h2`
  font-size: 1.4em;
  font-weight: 400;
  font-family: ${props => props.theme.fontHeading};
`;

const Text = styled.p`
  line-height: 1.8;
  width: 95%;
`;

const Explainer = () => (
  <StyledDiv>
    <Container>
      <Header> What makes Ethlantis trustless? </Header>
      <Text>
        {"Ethlantis's core source code is publicly available and can be reviewed by anyone."}
        {' Once deployed on the blockchain, the contract code becomes immutable - unchangeable and uneditable by any entity.'}
        {' Results of a match are only taken from oracles - these are trusted sources of information. In a dota match for example, the oracle would be the Dota 2 Public API.   '}
      </Text>
      <Illustrations />
    </Container>
  </StyledDiv>
);

export default Explainer;
