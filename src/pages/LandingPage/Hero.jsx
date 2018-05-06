import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  height: 55vh;
  text-align: center;
  z-index: 99999;
  position: relative;
  background: ${props => props.theme.colorPrimary};
`;

const Box = styled.div`
  height: 50%;
  margin: auto;
`;

const Header = styled.p`
  margin: 0;
  font-size: 2.2em;
  color: white;
  margin-bottom: 22px;
  font-family: ${props => props.theme.fontHeading};  
`;

const SubHeader = styled.p`
  margin: 0;
  margin-bottom: 20px;  
  font-size: 1.25em;
  color: white;
`;

const CallToAction = styled.button`
  background: none;
  display: inline-block;
  border: none;
  color: white;
  outline: none;
  cursor: pointer;
  font-size: 1em;
  border: 1px solid white;
  border-radius: 30px;
  padding: 12px 25px;
`;

const Hero = () => (
  <StyledDiv>
    <Box>
      <Header> A trustless esports betting platform </Header>
      <SubHeader> Instant withdrawals. Minimal 3% rake. No sign-up required. </SubHeader>
      <a href="/games"><CallToAction > Get Started </CallToAction></a>
    </Box>
  </StyledDiv>
);

export default Hero;
