import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/Landing';
import AdminPage from './pages/Admin';
import MatchesPage from './pages/Matches';
import MatchPage from './pages/Match';
import FetchNetworkStatus from './components/FetchNetworkStatus';
import { getUserData } from './actions/userActions';
import { authenticate as authenticateFunc } from './actions/authActions';
import SigninForm from './components/SigninForm';

class App extends Component {
  async componentDidMount() {
    const { authenticate } = this.props;
    await authenticate();
  }

  render() {
    const {
      web3, contract, getUserDataFunc,
    } = this.props;
    return (
      <Router>
        <Fragment>
          {
            (web3 && contract) &&
            <FetchNetworkStatus
              web3={web3}
              matchBetting={contract}
              getUserData={getUserDataFunc}
            />
          }
          <Header />
          <main>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={SigninForm} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/matches" component={MatchesPage} />
            <Route path="/match/:id" component={MatchPage} />
          </main>
        </Fragment>
      </Router >
    );
  }
}

const mapStateToProps = state => ({
  web3: state.web3.web3,
  contract: state.web3.contract,
});

const mapDispatchToProps = dispatch => ({
  getUserDataFunc: () => dispatch(getUserData()),
  authenticate: () => dispatch(authenticateFunc()),
});

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
