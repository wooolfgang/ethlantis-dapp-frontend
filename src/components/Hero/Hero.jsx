import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  height: 45vh;
  text-align: center;
  background: ${props => props.theme.colorPrimary};
`;

const Box = styled.div`
  height: 70%;
  margin: auto;
`;

const Header = styled.p`
  margin: 0;
  font-size: 2em;
  color: white;
  margin-bottom: 22px;
  font-family: ${props => props.theme.fontHeading};  
`;

const SubHeader = styled.p`
  margin: 0;
  margin-bottom: 20px;  
  font-size: 1.1em;
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
      <SubHeader> Instant withdrawals. Minimal 3% fee. No sign-up required. </SubHeader>
      <CallToAction> Get Started </CallToAction>
    </Box>
  </StyledDiv>
);

export default Hero;
