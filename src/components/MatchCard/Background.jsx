import React from 'react';
import styled from 'styled-components';
import TeamIcon from './TeamIcon';

const StyledDiv = styled.div`
  width: 100%;
  height: 80%;
  background: ${props => props.background && props.background};
  background: url(${props => props.backgroundImage && props.backgroundImage}) no-repeat center;
  background-size: cover;
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const BackgroundFilter = styled.div`
  height: 100%;
  width: 100%;
  z-index: 2;
  background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    );
  position: absolute;
  opacity: 0.25;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
`;

const Background = ({
  background, backgroundImage, teamA, teamB, teamAIcon, teamBIcon,
}) =>
  (
    <StyledDiv background={background} backgroundImage={backgroundImage}>
      <BackgroundFilter />
      <Left>
        <TeamIcon teamA={teamA} icon={teamAIcon} />
        <span style={{ color: 'white', fontSize: '1.15em' }}> {teamA} </span>
        <span style={{ color: 'white', fontSize: '1.05em' }}> 70% </span>
      </Left>
      <Right>
        <TeamIcon teamB={teamB} icon={teamBIcon} />
        <span style={{ color: 'white', fontSize: '1.15em' }}> {teamB} </span>
        <span style={{ color: 'white', fontSize: '1.05em' }}> 30% </span>
      </Right>
    </StyledDiv>
  );

export default Background;
