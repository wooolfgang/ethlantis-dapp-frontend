import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div` 
  width: 400px;
  flex: 1;
  height: 220px;
  border: 1px solid lightgray;
  margin: 0 20px;
`;

const MatchBox = ({ match }) => (
  <StyledDiv>
    <p> {match.teamA} </p>
    <p> {match.teamB} </p>
  </StyledDiv>
);

export default MatchBox;
