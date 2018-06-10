import * as types from '../constants/ActionTypes';

const initialState = {
  matches: [],
  isFetching: false,
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MATCHES_ADD:
      return {
        ...state,
        matches: action.matches,
      };

    case types.MATCHES_ADD_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };

    default:
      return state;
  }
};

export default matchReducer;
