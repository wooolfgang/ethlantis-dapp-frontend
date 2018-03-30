import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Illustration = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: space-around;
  align-items: center;
`;

const Graphic = styled.div`
  height: 80px;
  width: 80px;
  border: 1px solid lightgray;
  border-radius: 50%;
`;

const Text = styled.span`
  font-size: .9em;
  width: 80%;
  color: gray;
`;

const Illustrations = () => (
  <StyledDiv>
    <Illustration>
      <Graphic />
      <Text> Contract is deployed on the Ethereum network</Text>
    </Illustration>
    <Illustration>
      <Graphic />
      <Text> Users transact via the Smart Contract</Text>
    </Illustration>
    <Illustration>
      <Graphic />
      <Text> Contract verifies winner via Oracle</Text>
    </Illustration>
    <Illustration>
      <Graphic />
      <Text> Winners withdraw their money from the Contract</Text>
    </Illustration>
  </StyledDiv>
);

export default Illustrations;
