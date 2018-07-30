import React from 'react';
import styled from 'styled-components';
import AccountInfoSection from './matches/AccountInfoSection';
import GamesListPicker from './matches/GamesListPicker';
import MatchesSection from './matches/MatchesSection';

const StyledDiv = styled.div`
  min-height: calc(100vh - 64px);
  background: ${props => props.theme.colorLight};
`;

const Top = styled.div`
  background: #f1f9fa;
  display: grid;
  grid-area: top;
  box-shadow: 2px 3px 6px 0px #e4f4f6;
  
  @media screen and (min-width: 700px) {
    grid-template-areas: 'left . right';
    grid-template-columns: 2fr 3fr 2fr;
    padding: 0 50px;
  }

  @media screen and (max-width: 700px) {
    grid-template-areas: 'left' 'right';
  }
`;

const GamesPage = () => (
  <StyledDiv>
    <Top>
      <GamesListPicker />
      <AccountInfoSection />
    </Top>
    <MatchesSection />
  </StyledDiv>
);

export default GamesPage;
