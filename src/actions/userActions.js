import * as types from '../constants/ActionTypes';

const loginUser = (userId, isOwner) => ({
  type: types.USER_LOGGED_IN,
  userId,
  isOwner,
});

export default loginUser;
