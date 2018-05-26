import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 8px;
  transition: all 200ms;
  cursor: pointer;
 
  ${props => props.chosen && `
    box-shadow: .5px .5px 1px 1px ${props.theme.colorPrimary};   
    transform: translateY(-2px);
  `}

  :hover {
    box-shadow: .5px .5px 1px 1px ${props => props.theme.colorPrimary};   
    transform: translateY(-2px);
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
  font-size: 1.4em;
  color: gray;
`;

const Percent = styled.span`
  font-size: 1.2em;
  color: darkgray;
`;

class Team extends React.Component {
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
      chosen, name, totalBets, bets,
    } = this.props;
    return (
      <StyledDiv chosen={chosen} onClick={this.chooseTeam}>
        <Image />
        <Name> {name} </Name>
        <Percent> {totalBets === 0 ? 0 : bets / totalBets}% </Percent>
      </StyledDiv>
    );
  }
}

export default Team;

