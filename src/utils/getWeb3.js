import Web3 from 'web3';
import store from '../store';
import { initializeWeb3 } from '../actions/web3Actions';

const getWeb3 = new Promise(((resolve) => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', () => {
    let results;
    let { web3 } = window;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider);

      results = {
        web3Instance: web3,
      };

      console.log('Injected web3 detected.');

      resolve(store.dispatch(initializeWeb3(results)));
    } else {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');

      web3 = new Web3(provider);

      results = {
        web3Instance: web3,
      };

      console.log('No web3 instance injected, using Local web3.');

      resolve(store.dispatch(initializeWeb3(results)));
    }
  });
}));

export default getWeb3;
