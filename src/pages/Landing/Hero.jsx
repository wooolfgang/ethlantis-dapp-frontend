import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';

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

const Hero = () => (
  <StyledDiv>
    <Box>
      <Header> A trustless esports betting platform </Header>
      <SubHeader> Instant withdrawals. Minimal 3% rake. No sign-up required. </SubHeader>
      <a href="/games">
        <Button type="inverted">
          Get Started
        </Button>
      </a>
    </Box>
  </StyledDiv>
);

export default Hero;
