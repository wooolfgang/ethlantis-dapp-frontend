/* eslint-disable import/no-extraneous-dependencies */

import contract from 'truffle-contract';
import matchBettingContract from '../../build/contracts/MatchBetting.json';

const getContract = async (web3) => {
  const matchBetting = contract(matchBettingContract);
  matchBetting.setProvider(web3.currentProvider);
  return matchBetting.deployed();
};

export default getContract;
