import * as types from '../constants/ActionTypes';
import { getHash } from '../utils';

export const loginUser = (userId, isOwner) => ({
  type: types.USER_LOGGED_IN,
  userId,
  isOwner,
});

export const setUserBalance = balance => ({
  type: types.USER_GET_BALANCE,
  balance,
});

export const getUserData = () => async (dispatch, getState) => {
  const { web3, contract } = getState().web3;

  if (web3 && contract) {
    const userId = await web3.eth.getCoinbase();
    const owner = await contract.owner.call();
    let balance = await web3.eth.getBalance(userId);
    balance = web3.utils.fromWei(balance, 'ether');
    dispatch(loginUser(userId, owner === userId));
    return dispatch(setUserBalance(balance));
  }
  throw new Error('No web3 or contract found');
};

export const bet = (id, gameType, teamName, betValue) => async (dispatch, getState) => {
  const { contract, web3 } = getState().web3;
  const { id: userAddress } = getState().user;

  try {
    if (contract && web3) {
      const res = await contract.bet(
        getHash(id, gameType),
        teamName, { from: userAddress, value: web3.utils.toWei(`${betValue}`) },
      );
      console.log(res);
    } else {
      throw new Error('No contract or web3 found');
    }
  } catch (e) {
    console.log(e);
  }
};

export const getPlacedBetAmount = (matchId, gameType, teamA, teamB) =>
  async (dispatch, getState) => {
    const { contract, web3 } = getState().web3;

    try {
      if (contract && web3) {
        let teamABet = await contract.getUserBet(getHash(matchId, gameType), teamA);
        let teamBBet = await contract.getUserBet(getHash(matchId, gameType), teamB);
        teamABet = Number(web3.utils.fromWei(`${teamABet.toNumber()}`));
        teamBBet = Number(web3.utils.fromWei(`${teamBBet.toNumber()}`));
        if (teamABet !== 0) return { teamName: teamA, betAmount: teamABet };
        if (teamABet !== 0) return { teamName: teamB, betAmount: teamBBet };
      } else {
        throw new Error('No contract found');
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  };
