import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import LandingPage from './pages/LandingPage/LandingPage';
import AdminPageContainer from './pages/AdminPage/AdminPageContainer';
import LoginStatus from './components/LoginStatus/LoginStatusContainer';

class App extends Component {
  componentDidMount() {
    // do something

  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <LoginStatus />
          <main>
            <Route exact path="/" component={LandingPage} />
            <Route path="/admin" component={AdminPageContainer} />
          </main>
        </div>
      </Router >
    );
  }
}

export default App;
