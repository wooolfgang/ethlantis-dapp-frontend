import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import LandingPage from './pages/LandingPage/LandingPage';
import AdminPageContainer from './pages/AdminPage/AdminPageContainer';

class App extends Component {
  componentDidMount() {
    // do something

  }

  render() {
    return (
      <Router>
        <div>
          <HeaderContainer />
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
