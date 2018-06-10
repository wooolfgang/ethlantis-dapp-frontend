import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 90px;
  height: 90px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  background: url(${props => props.icon && props.icon}) no-repeat center;
  border: 1px solid white;
  background-size: cover;
  opacity: 1;
  margin-bottom: 3px;
`;

const TeamIcon = ({ teamA, icon }) => (
  <StyledDiv teamA={teamA} icon={icon} />
);

export default TeamIcon;
