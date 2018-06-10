import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Match from './match/Match';
import Card from '../components/Card';
import Link from '../components/Link';
import { getMatch } from '../actions/matchActions';
import { BACK_ARROW } from '../assets/images';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: relative;
  background: ${props => props.theme.colorLight};
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 50px;
  z-index: 3;
`;

class MatchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { match: null };
    this.setMatchData = this.setMatchData.bind(this);
    this.setPlacedBets = this.setPlacedBets.bind(this);
  }

  async componentDidMount() {
    if (this.props.web3 && this.props.contract) {
      this.setMatchData();
    }
  }

  async componentDidUpdate(prevProps) {
    if ((prevProps.web3 !== this.props.web3 || prevProps.contract !== this.props.contract)
      && this.props.contract && this.props.web3) {
      this.setMatchData();
    }
  }

  async setMatchData() {
    const { fetchMatch, match: { params: { id: matchId } } } = this.props;
    const matchData = await fetchMatch(matchId);
    this.setState({ match: matchData });
  }

  setPlacedBets({ teamAIncrement = 0, teamBIncrement = 0 }) {
    const { match } = this.state;
    const updatedMatch = {
      ...match,
      teamATotalBets: match.teamATotalBets + teamAIncrement,
      teamBTotalBets: match.teamBTotalBets + teamBIncrement,
    };
    this.setState({ match: updatedMatch });
  }

  render() {
    const { match } = this.state;
    const { match: { params: { id } }, hasUser } = this.props;
    return (
      <StyledDiv>
        <Container>
          <Link to="/matches" href="/">
            <img src={BACK_ARROW} alt="back-arrow" />
          </Link>
        </Container>
        <Card width="80vw" height="85vh">
          <Match match={match} id={id} hasUser={hasUser} setPlacedBets={this.setPlacedBets} />
        </Card>
      </StyledDiv >
    );
  }
}

const mapStateToProps = state => ({
  web3: state.web3.web3,
  contract: state.web3.contract,
  hasUser: !!state.user.address,
});

const mapDispatchToProps = dispatch => ({
  fetchMatch: matchId => dispatch(getMatch(matchId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchContainer);

