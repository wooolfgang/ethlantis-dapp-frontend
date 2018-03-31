import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border: 1px solid ${props => props.theme.colorSecondary};
  height: 35px;
  display: flex;
  max-width: 410px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-around;
`;

const LoginStatus = ({ children }) => (
  <StyledDiv>
    {children}
  </StyledDiv>
);

export default LoginStatus;
