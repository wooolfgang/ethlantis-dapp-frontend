import React from 'react';
import styled from 'styled-components';
import NetworkStatusContainer from '../../components/NetworkStatus';
import Badge from '../../components/Badge';

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
  grid-template-rows: 15px auto 5px auto 15px;
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
      <Badge />
    </BadgeWrapper>
  </StyledDiv>
);

export default AccountInfoSection;
