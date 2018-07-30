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
  width: 60px;
  height: 100%;
  border: 1px solid lightgray;
  border-radius: 50%;
  margin: 0 auto;
`;

const Badge = ({ address }) => (
  <StyledDiv>
    <Id> {address} </Id>
    <Avatar>
      <Blockies seed={address} size={15} />
    </Avatar>
  </StyledDiv>
);

export default Badge;
