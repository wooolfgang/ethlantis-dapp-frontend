import * as types from '../constants/ActionTypes';

export const loginUser = (userId, isOwner) => ({
  type: types.USER_LOGGED_IN,
  userId,
  isOwner,
});

export const setUserBalance = balance => ({
  type: types.USER_GET_BALANCE,
  balance,
});

export const getUserData = (web3, matchBetting) => async (dispatch) => {
  const userId = await web3.eth.getCoinbase();
  const owner = await matchBetting.owner.call();
  let balance = await web3.eth.getBalance(userId);
  balance = web3.utils.fromWei(balance, 'ether');
  dispatch(loginUser(userId, owner === userId));
  return dispatch(setUserBalance(balance));
};
