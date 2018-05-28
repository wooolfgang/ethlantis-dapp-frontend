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

