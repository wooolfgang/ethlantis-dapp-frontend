import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Link from '../../components/Link';
import { WAVES_SVG } from '../../assets/images';

const StyledDiv = styled.div`
  display: flex;
  height: 55vh;
  text-align: center;
  z-index: 99999;
  position: relative;
  background: linear-gradient(#2A388D,#3EA5C2);
  position: relative;
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
  font-weight: 300;
  color: white;
`;

const Waves = styled.img`
  position: absolute;
  bottom: 0;
  z-index: -1;
  width: 100vw;
`;

const Hero = () => (
  <StyledDiv>
    <Box>
      <Header> A trustless esports betting platform </Header>
      <SubHeader> Instant withdrawals. Minimal 3% rake. No sign-up required. </SubHeader>
      <Link to="/matches" href="/" >
        <Button type="inverted">
          Get Started
        </Button>
      </Link>
    </Box>
    <Waves src={WAVES_SVG} alt="waves" />
  </StyledDiv >
);

export default Hero;
