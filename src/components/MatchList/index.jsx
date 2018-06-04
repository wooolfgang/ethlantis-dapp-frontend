import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import MatchList from './MatchList';
import { getMatches } from '../../actions/matchActions';
import { LOADER } from '../../assets/images';

class MatchListContainer extends React.Component {
  componentDidMount() {
    const { getMatchesData } = this.props;
    getMatchesData(10);
  }

  render() {
    const { matches, isFetching } = this.props;
    return (
      <Fragment>
        {
          isFetching ?
            <div>
              <img src={LOADER} alt="loading..." style={{ margin: 'auto' }} />
            </div> :
            <MatchList matches={matches} />
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  matches: state.match.matches,
  isFetching: state.match.isFetching,
});

const mapDispatchToProps = dispatch => ({
  getMatchesData: count => dispatch(getMatches(count)),
});

MatchListContainer = connect(mapStateToProps, mapDispatchToProps)(MatchListContainer);

export default MatchListContainer;

