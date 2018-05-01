import React from 'react';
import { connect } from 'react-redux';
import MatchList from './MatchList';
import { getMatches } from '../../actions/matchActions';

class MatchListContainer extends React.Component {
  componentDidMount() {
    const { web3, matchBetting, getMatchesData } = this.props;
    getMatchesData(web3, matchBetting, 10);
  }

  render() {
    const { matches } = this.props;
    return (
      <MatchList matches={matches} />
    );
  }
}

const mapStateToProps = state => ({
  matches: state.match.matches,
});

const mapDispatchToProps = dispatch => ({
  getMatchesData: (web3, matchBetting, count) => dispatch(getMatches(web3, matchBetting, count)),
});

MatchListContainer = connect(mapStateToProps, mapDispatchToProps)(MatchListContainer);

export default MatchListContainer;

