/* eslint-disable import/no-extraneous-dependencies */

import contract from 'truffle-contract';
import MatchBettingContract from '../../build/contracts/MatchBetting.json';
import * as types from '../constants/ActionTypes';
import store from '../store';

export const initializeWeb3 = payload => ({
  type: types.WEB3_INITIALIZED,
  payload,
});

export const initializeWeb3Error = error => ({
  type: types.WEB3_INITIALIZED_ERROR,
  payload: error,
});

export const initializeContract = payload => ({
  type: types.CONTRACT_INITIALIZED,
  payload,
});

export const connectToContract = () => async (dispatch) => {
  const web3 = store.getState().web3.web3Instance;

  if (typeof web3 !== 'undefined') {
    try {
      const matchBetting = contract(MatchBettingContract);
      matchBetting.setProvider(web3.currentProvider);
      const matchBettingInstance = await matchBetting.deployed();
      dispatch(initializeContract(matchBettingInstance));
    } catch (e) {
      dispatch(initializeWeb3Error(e));
    }
  } else {
    dispatch(initializeWeb3Error(new Error('Web3 is undefined')));
  }
};

