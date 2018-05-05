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

const Graphic = styled.img`
  height: 135px;
  width: 135px;
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
      <Graphic src="http://res.cloudinary.com/depjh17m6/image/upload/v1525500709/Ethlantis/contract_on_the_etheruem_network.svg" />
      <Text> Contract is deployed on the Ethereum network</Text>
    </Illustration>
    <Illustration>
      <Graphic src="http://res.cloudinary.com/depjh17m6/image/upload/v1525500709/Ethlantis/smart_contract.svg" />
      <Text> Users transact via the Smart Contract</Text>
    </Illustration>
    <Illustration>
      <Graphic src="http://res.cloudinary.com/depjh17m6/image/upload/v1525500710/Ethlantis/oracle.svg" />
      <Text> Contract verifies winner via Oracle</Text>
    </Illustration>
    <Illustration>
      <Graphic src="http://res.cloudinary.com/depjh17m6/image/upload/v1525500709/Ethlantis/witdthraw.svg" />
      <Text> Winners withdraw their money from the Contract</Text>
    </Illustration>
  </StyledDiv>
);

export default Illustrations;
