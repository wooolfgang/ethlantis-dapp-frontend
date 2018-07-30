import React from 'react';
import styled from 'styled-components';
import Blockies from 'react-blockies';

const StyledDiv = styled.div`
  display: grid;
  @media screen and (min-width: 700px) {
    width: 390px;
    height: 60px;
    grid-template-areas: 
    '. avatar'
    'id avatar'
    '. avatar'
    ;
    grid-template-columns: 1fr .2fr;
    grid-template-rows: 1fr .1fr .2fr;
  }

  @media screen and (max-width: 700px) {
    grid-template-areas: 'avatar' 'id';
    grid-gap: 10px;
    grid-auto-rows: 3fr 1fr;
  }
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
  margin: 0 auto;
  width: 52px;
  height: 52px;
  border: 1px solid lightgray;
`;

const Badge = ({ address }) => (
  <StyledDiv>
    <Id> {address} </Id>
    <Avatar>
      {address && <Blockies seed={address} size={13} />}
    </Avatar>
  </StyledDiv>
);

export default Badge;
