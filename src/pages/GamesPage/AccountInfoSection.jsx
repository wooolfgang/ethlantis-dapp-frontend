import React from 'react';
import styled from 'styled-components';
import NetworkStatusContainer from '../../components/NetworkStatus/NetworkStatusContainer';
import BadgeContainer from '../../components/Badge/BadgeContainer';

const StyledDiv = styled.div`
  grid-area: right;
  display: grid;
  grid-template-areas: 
  '. .'
  '. login'
  '. .'
  '. badge'
  '. .'
  ;  
  grid-template-columns: 1fr 400px;
  grid-template-rows: 20px auto 10px auto 20px;
`;

const NetworkStatusWrapper = styled.div`
  grid-area: login;
`;

const BadgeWrapper = styled.div`
  grid-area: badge;
`;

const AccountInfoSection = () => (
  <StyledDiv>
    <NetworkStatusWrapper>
      <NetworkStatusContainer />
    </NetworkStatusWrapper>
    <BadgeWrapper>
      <BadgeContainer />
    </BadgeWrapper>
  </StyledDiv>
);

export default AccountInfoSection;
