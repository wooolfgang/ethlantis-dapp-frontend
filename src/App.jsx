import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import LandingPage from './pages/LandingPage/LandingPage';
import AdminPageContainer from './pages/AdminPage/AdminPageContainer';
import GamesPage from './pages/GamesPage/GamesPage';

class App extends Component {
  componentDidMount() {
    // do something

  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <main>
            <Route exact path="/" component={LandingPage} />
            <Route path="/admin" component={AdminPageContainer} />
            <Route path="/games" component={GamesPage} />
          </main>
        </div>
      </Router >
    );
  }
}

export default App;
