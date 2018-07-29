import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MatchListContainer from './matchessection/MatchListContainer';

const StyledDiv = styled.div`
  grid-area: matches;
  background: ${props => props.theme.colorLight};
`;

const MatchListGrid = styled.div`
  grid-area: matches;
  width: 100%;
  margin: auto;
  text-align: center;
`;

let MatchesSection = ({ contract, web3 }) => (
  <StyledDiv>
    <MatchListGrid>
      {
        (contract && web3) && <MatchListContainer />
      }
    </MatchListGrid>
  </StyledDiv>
);

const mapStateToProps = state => ({
  contract: state.web3.contract,
  web3: state.web3.web3,
});

MatchesSection = connect(mapStateToProps)(MatchesSection);

export default MatchesSection;

