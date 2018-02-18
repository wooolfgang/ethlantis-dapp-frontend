import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import LandingPage from './layouts/LandingPage/LandingPage';

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
            <Route path="/" component={LandingPage} />
          </main>
        </div>
      </Router >
    );
  }
}

export default App;
