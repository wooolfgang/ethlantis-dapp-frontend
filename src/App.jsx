import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/Landing';
import AdminPage from './pages/Admin';
import MatchesPage from './pages/Matches';
import MatchPage from './pages/Match';
import FetchNetworkStatus from './components/FetchNetworkStatus/';
import { getUserData } from './actions/userActions';

let App = ({ web3, matchBetting, getUserDataFunc }) => (
  <Router>
    <Fragment>
      {
        (web3 && matchBetting) &&
        <FetchNetworkStatus
          web3={web3}
          matchBetting={matchBetting}
          getUserData={getUserDataFunc}
        />
      }
      <Header />
      <main>
        <Route exact path="/" component={LandingPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/matches" component={MatchesPage} />
        <Route path="/match/:id" component={MatchPage} />
      </main>
    </Fragment>
  </Router >
);

const mapStateToProps = state => ({
  web3: state.web3.web3Instance,
  matchBetting: state.web3.matchBetting,
});

const mapDispatchToProps = dispatch => ({
  getUserDataFunc: (web3, matchBetting) => dispatch(getUserData(web3, matchBetting)),
});

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
