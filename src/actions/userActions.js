import * as types from '../constants/ActionTypes';

export const loginUser = (address, isOwner) => ({
  type: types.USER_LOGGED_IN,
  address,
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
  throw new Error(`No web3 or contract found on ${getUserData.name}`);
};

export const bet = (id, teamName, betValue) => async (dispatch, getState) => {
  const { contract, web3 } = getState().web3;
  const { address } = getState().user;

  try {
    if (contract && web3 && address) {
      return contract.bet(id, teamName, { from: address, value: web3.utils.toWei(`${betValue}`) });
    }
    throw new Error(`No contract or web3 found on ${bet.name}`);
  } catch (e) {
    console.log(e);
  }
  return null;
};

export const swapTeam = id => async (dispatch, getState) => {
  const { contract, web3 } = getState().web3;
  const { address } = getState().user;
  const estimatedGas = 85000;

  try {
    if (contract && web3 && address) {
      return contract.swapTeam(id, { from: address, gas: estimatedGas });
    }
    throw new Error(`No contract or web3 found on ${swapTeam.name}`);
  } catch (e) {
    throw new Error(e);
  }
};

export const getPlacedBetAmount = (id, teamA, teamB) =>
  async (dispatch, getState) => {
    const { contract, web3 } = getState().web3;
    const { address } = getState().user;

    try {
      if (contract && web3 && address) {
        let teamABet = await contract.getUserBet(id, teamA, { from: address });
        let teamBBet = await contract.getUserBet(id, teamB, { from: address });
        teamABet = Number(web3.utils.fromWei(`${teamABet.toNumber()}`));
        teamBBet = Number(web3.utils.fromWei(`${teamBBet.toNumber()}`));
        if (teamABet !== 0) return { chosenTeam: teamA, betAmount: teamABet };
        else if (teamBBet !== 0) return { chosenTeam: teamB, betAmount: teamBBet };
      } else {
        throw new Error(`No contract or user found on ${getPlacedBetAmount.name}`);
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  };
