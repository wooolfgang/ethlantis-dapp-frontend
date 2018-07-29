import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border: 1px solid lightgray;
  height: 32px;
  display: flex;
  max-width: 390px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
`;

const NetworkStatus = ({ children }) => (
  <StyledDiv>
    {children}
  </StyledDiv>
);

export default NetworkStatus;
