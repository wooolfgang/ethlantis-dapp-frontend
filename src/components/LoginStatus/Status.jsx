import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.span`
  color: rgba(0,0,0, 0.8);
  font-size: .9em;
`;

const Status = ({ message }) => (
  <StyledDiv> {message} </StyledDiv>
);

export default Status;
