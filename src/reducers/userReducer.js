import * as types from '../constants/ActionTypes';

const initialState = {
  id: null,
  isOwner: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGGED_IN:
      return {
        ...state,
        id: action.userId,
        isOwner: action.isOwner,
      };

    default:
      return state;
  }
};

export default userReducer;

