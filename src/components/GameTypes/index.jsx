import React from 'react';
import styled from 'styled-components';
import GameType from './GameType';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const GameTypeList = ({ games }) => (
  <StyledDiv>
    {
      games.map(game => <GameType key={game.type} {...game} />)
    }
  </StyledDiv>
);

export default GameTypeList;

