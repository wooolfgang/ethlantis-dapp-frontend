import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 390px;
  height: 60px;
  display: grid;
  grid-template-areas: 
  '. avatar'
  'id avatar'
  '. avatar'
  ;
  grid-template-columns: 1fr .2fr;
  grid-template-rows: 1fr .1fr .2fr;
`;

const Id = styled.span`
  grid-area: id;
  display: inline-block;
  height: 100%;
  font-size: .85em;
  border-bottom: 1px solid lightgray;
`;

const Avatar = styled.div`
  grid-area: avatar;
  width: 60px;
  height: 100%;
  border: 1px solid lightgray;
  border-radius: 50%;
`;

const Badge = ({ userId }) => (
  <StyledDiv>
    <Id> {userId} </Id>
    <Avatar />
  </StyledDiv>
);

export default Badge;
