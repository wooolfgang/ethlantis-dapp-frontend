const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = 'execute ankle fiscal laundry voyage kiwi rich scan chalk defense risk glory';

module.exports = {
  networks: {
    ropsten: {
      provider() {
        return new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/4j50CPIg7m1Fp24GLDrR');
      },
      network_id: 3,
    },
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id
    },
  },
};
