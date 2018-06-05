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
  throw new Error('No web3 or contract found');
};

export const bet = (id, teamName, betValue) => async (dispatch, getState) => {
  const { contract, web3 } = getState().web3;
  const { address } = getState().user;

  try {
    if (contract && web3) {
      return contract.bet(id, teamName, { from: address, value: web3.utils.toWei(`${betValue}`) });
    }
    throw new Error('No contract or web3 found');
  } catch (e) {
    console.log(e);
  }
  return null;
};

export const getPlacedBetAmount = (id, teamA, teamB, userAddress) =>
  async (dispatch, getState) => {
    const { contract, web3 } = getState().web3;

    try {
      if (contract && web3) {
        console.log(userAddress);
        let teamABet = await contract.getUserBet(id, teamA, { from: userAddress });
        let teamBBet = await contract.getUserBet(id, teamB, { from: userAddress });
        teamABet = Number(web3.utils.fromWei(`${teamABet.toNumber()}`));
        teamBBet = Number(web3.utils.fromWei(`${teamBBet.toNumber()}`));
        if (teamABet !== 0) return { chosenTeam: teamA, betAmount: teamABet };
        else if (teamBBet !== 0) return { chosenTeam: teamB, betAmount: teamBBet };
      } else {
        throw new Error('No contract found');
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  };
