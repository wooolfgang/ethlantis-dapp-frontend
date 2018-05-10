import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border: 1px solid ${props => props.theme.colorSecondary};
  height: 32px;
  display: flex;
  max-width: 390px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-around;
`;

const NetworkStatus = ({ children }) => (
  <StyledDiv>
    {children}
  </StyledDiv>
);

export default NetworkStatus;
