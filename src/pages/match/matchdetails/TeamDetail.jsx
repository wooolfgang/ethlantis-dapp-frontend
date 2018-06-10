import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 8px;
  transition: all 200ms;
 
  ${props => props.chosen && `
    box-shadow: .5px .5px 1px 1px ${props.theme.colorSecondary};   
    transform: translateY(-2px);
  `}

  :hover {
    ${props => !props.hasPlaced && `
    box-shadow: .5px .5px 1px 1px ${props.theme.colorSecondary}};   
    transform: translateY(-2px);
    cursor: pointer; 
    `}
  }
`;

const Image = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid lightgray;
  border-radius: 50%;
  margin-bottom: 2px;
`;

const Name = styled.span`
  font-size: 1.35em;
  font-weight: 300;
  color: gray;
`;

const Percent = styled.span`
  font-size: 1.1em;
  font-weight: 300;
  color: darkgray;
`;

const Bets = styled.span`
  font-size: .65em;
  font-weight: 300;
  color: ${props => props.theme.colorTertiary};
`;

class TeamDetail extends React.Component {
  constructor(props) {
    super(props);
    this.chooseTeam = this.chooseTeam.bind(this);
  }

  chooseTeam() {
    const { name, chooseTeam } = this.props;
    chooseTeam(name);
  }

  render() {
    const {
      chosen, name, percentage, bets, hasPlaced,
    } = this.props;
    return (
      <StyledDiv chosen={chosen} onClick={this.chooseTeam} hasPlaced={hasPlaced}>
        <Image />
        <Name> {name} </Name>
        <Percent> {percentage}% </Percent>
        <Bets> {bets} ETH placed.</Bets>
      </StyledDiv>
    );
  }
}

export default TeamDetail;

