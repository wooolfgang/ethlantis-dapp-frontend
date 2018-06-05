import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Match from './Match';
import Card from '../../components/Card';
import { getMatch } from '../../actions/matchActions';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${props => props.theme.colorLight};
`;

class MatchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { match: null };
    this.setMatchData = this.setMatchData.bind(this);
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

  render() {
    const { match } = this.state;
    const { match: { params: { id } }, hasUser } = this.props;
    return (
      <StyledDiv>
        <Card width="80vw" height="85vh">
          <Match match={match} id={id} hasUser={hasUser} />
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

