import React from 'react';
import styled from 'styled-components';
import Text from './banner/Text';
import GamesCard from './banner/GamesCard';

const StyledDiv = styled.div`
  background: ${props => props.theme.colorLight};
`;

const Container = styled.div`
  display: grid;
    @media screen and (min-width: 700px) {
      grid-template-areas: 'header banner';
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      width: 80%;
      height: 55vh;
    }

    @media screen and (max-width: 700px) {
      grid-template-areas: 'header' 'banner';
      grid-template-auto-columns: 1fr 1fr;
      text-align: center;
      width: 100%;
    }
  margin: auto;
`;

const TextArea = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 700px) {
    padding: 10px;
    font-size: 0.8em;
  }
`;

const GamesArea = styled.div`
  grid-area: banner;
  height: 80%;
  
  @media screen and (min-width: 700px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px;
  }
`;

const GamesBanner = () => (
  <StyledDiv>
    <Container>
      <TextArea >
        <Text />
      </TextArea>
      <GamesArea>
        <GamesCard />
      </GamesArea>
    </Container>
  </StyledDiv>
);

export default GamesBanner;
