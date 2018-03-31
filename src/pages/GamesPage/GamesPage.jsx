import React from 'react';
import styled from 'styled-components';
import AccountInfoSection from './AccountInfoSection';
import GamesListPicker from './GamesListPicker';

const StyledDiv = styled.div`
  height: calc(100vh - 65px);
`;

const Top = styled.div`
  height: 185px;
  background: #fafafa;
  display: grid;
  grid-template-areas: 
  '. left right .';
  grid-template-columns: 125px 1fr 1fr 125px;
`;

const GamesPage = () => (
  <StyledDiv>
    <Top>
      <GamesListPicker />
      <AccountInfoSection />
    </Top>
  </StyledDiv>
);

export default GamesPage;
