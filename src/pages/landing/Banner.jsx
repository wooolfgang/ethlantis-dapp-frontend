import React from 'react';
import styled from 'styled-components';
import Text from './banner/Text';
import GamesCard from './banner/GamesCard';

const StyledDiv = styled.div`
  display: grid;
  grid-template-areas: ". . . ." ". header banner ." ". . . .";
  grid-template-columns: 180px 1fr 1fr 180px;
  grid-template-rows: 20px 1fr 20px;
  height: 55vh;
  background: ${props => props.theme.colorLight};
`;

const TextArea = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GamesArea = styled.div`
  grid-area: banner;
  display: flex;
  flex-direction: column;  
  width: 90%;
  height: 80%;
  padding: 10px;
  margin: auto;
`;

const GamesBanner = () => (
  <StyledDiv>
    <TextArea >
      <Text />
    </TextArea>
    <GamesArea>
      <GamesCard />
    </GamesArea>
  </StyledDiv>
);

export default GamesBanner;
