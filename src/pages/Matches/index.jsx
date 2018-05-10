import React from 'react';
import styled from 'styled-components';
import AccountInfoSection from './AccountInfoSection';
import GamesListPicker from './GamesListPicker';
import MatchesSection from './MatchesSection';

const StyledDiv = styled.div`
  height: calc(100vh - 64px);
`;

const Top = styled.div`
  height: 130px;
  background: #f4f7f6;
  display: grid;
  grid-template-areas: 
  '. left right .';
  grid-template-columns: 125px 1fr 1fr 125px;
  border-bottom: 1px solid hsl(0, 0%, 93.3%);
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
