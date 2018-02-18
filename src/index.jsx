import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import App from './App';
import theme from './assets/theme';
import injectGlobalStyles from './assets/injectGlobalStyles';
import store from './store';
import getWeb3 from './utils/getWeb3';
import { connectToContract } from './actions/web3Actions';

injectGlobalStyles();

getWeb3
  .then(() => {
    console.log('Web3 initialized');
    store.dispatch(connectToContract());
  })
  .catch(() => {
    console.log('Error in web3 initialization');
  });

window.store = store;


ReactDOM.render(
  <Provider store={store} >
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  ,
  document.getElementById('root'),
);
