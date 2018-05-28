import React from 'react';
import { connect } from 'react-redux';
import MatchList from './MatchList';
import { getMatches } from '../../actions/matchActions';

class MatchListContainer extends React.Component {
  componentDidMount() {
    const { getMatchesData } = this.props;
    getMatchesData(10);
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
  getMatchesData: count => dispatch(getMatches(count)),
});

MatchListContainer = connect(mapStateToProps, mapDispatchToProps)(MatchListContainer);

export default MatchListContainer;

