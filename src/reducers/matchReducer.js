import * as types from '../constants/ActionTypes';

const initialState = {
  matches: [],
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MATCHES_ADD:
      return {
        ...state,
        matches: action.matches,
      };

    default:
      return state;
  }
};

export default matchReducer;
