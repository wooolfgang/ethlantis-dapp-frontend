import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
`;

const StyledDiv = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  height: 30px;
  display: flex;
  max-width: 410px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-around;
  position: relative;
  top: 10px;
  right: 15px;
`;

const LoginStatus = ({ children }) => (
  <Container>
    <StyledDiv>
      {children}
    </StyledDiv>
  </Container>
);

export default LoginStatus;
