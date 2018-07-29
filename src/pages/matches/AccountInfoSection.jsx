import React from 'react';
import styled from 'styled-components';
import NetworkStatusContainer from '../../components/NetworkStatus';
import Badge from '../../components/Badge';

const StyledDiv = styled.div`
  grid-area: right;
  display: grid;
  margin: 20px 0;
  grid-gap: 10px;
  grid-template-areas: 'login' 'badge';
`;

const NetworkStatusWrapper = styled.div`
  grid-area: login;
  margin: 0 auto;
  width: 100%;
`;

const BadgeWrapper = styled.div`
  grid-area: badge;
  display: block;
  margin: auto;
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
