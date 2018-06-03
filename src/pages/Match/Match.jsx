import React from 'react';
import styled from 'styled-components';
import MatchDetails from './MatchDetails';

const StyledDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  padding: 20px;
  box-sizing: border-box;
  grid-template-areas: 
  ' . match-details live-feed .'
  ' . twitch-container live-feed .';
  grid-template-columns: '1fr 80% 20% 1fr';
`;

const Slanted = styled.div`
  background: #EFF0F3;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 42.5%;
  transform: skewY(-14deg) translateY(-142.5px);
`;

const TwitchContainer = styled.div`
  border: 1px solid lightgray;
  width: 600px;
  height: 375px;
  position: relative;
  z-index: 1;
  grid-area: twitch-container;
`;

const LiveFeed = styled.div`
  height: 98%;
  width: 300px;
  border: 1px solid lightgray;
  position: relative;
  z-index: 1;
  grid-area: live-feed;
`;

const Match = ({ match, id }) => (
  <StyledDiv>
    <Slanted />
    {match && <MatchDetails match={match} id={id} />}
    <TwitchContainer />
    <LiveFeed />
  </StyledDiv>
);

export default Match;
