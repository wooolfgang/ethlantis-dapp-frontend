import * as types from '../constants/ActionTypes';

const initialState = {
  address: null,
  isOwner: false,
  balance: null,
  user: null,
  authenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGGED_IN:
      return {
        ...state,
        address: action.address,
        isOwner: action.isOwner,
      };

    case types.USER_GET_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };

    case types.SET_AUTHENTICATED_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };

    default:
      return state;
  }
};

export default userReducer;

