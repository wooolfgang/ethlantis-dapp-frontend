import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MatchListContainer from '../../components/MatchList';

const StyledDiv = styled.div`
  background: ${props => props.theme.colorLight};
  min-height: calc(100vh - 194px);
  display: grid;
  grid-template-areas: 
  '. . .'
  '. matches .'
  '. . .'
  ;
  grid-template-rows: 30px 1fr 30px;
  grid-template-columns: 1fr 85vw 1fr;
`;

const MatchListGrid = styled.div`
  grid-area: matches;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 27.5px 30px;
`;

let MatchesSection = ({ matchBetting, web3 }) => (
  <StyledDiv>
    <MatchListGrid>
      {
        (matchBetting && web3) && <MatchListContainer matchBetting={matchBetting} web3={web3} />
      }
    </MatchListGrid>
  </StyledDiv>
);

const mapStateToProps = state => ({
  matchBetting: state.web3.matchBetting,
  web3: state.web3.web3Instance,
});

MatchesSection = connect(mapStateToProps)(MatchesSection);

export default MatchesSection;

