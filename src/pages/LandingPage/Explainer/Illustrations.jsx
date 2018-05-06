import React from 'react';
import styled from 'styled-components';
import { CONTRACT_DEPLOYED_SVG, USERS_TRANSACT_SVG, CONTRACT_VERIFIES_SVG, WINNERS_WITHDRAW_SVG } from '../../../assets/images';

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

const Graphic = styled.img`
  height: 135px;
  width: 135px;
`;

const Text = styled.span`
  font-size: .9em;
  width: 80%;
  color: gray;
`;

const Illustrations = () => (
  <StyledDiv>
    <Illustration>
      <Graphic src={CONTRACT_DEPLOYED_SVG} />
      <Text> Contract is deployed on the Ethereum network</Text>
    </Illustration>
    <Illustration>
      <Graphic src={USERS_TRANSACT_SVG} />
      <Text> Users transact via the Smart Contract</Text>
    </Illustration>
    <Illustration>
      <Graphic src={CONTRACT_VERIFIES_SVG} />
      <Text> Contract verifies winner via Oracle</Text>
    </Illustration>
    <Illustration>
      <Graphic src={WINNERS_WITHDRAW_SVG} />
      <Text> Winners withdraw their money from the Contract</Text>
    </Illustration>
  </StyledDiv>
);

export default Illustrations;
