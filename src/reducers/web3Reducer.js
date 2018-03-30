import * as types from '../constants/ActionTypes';

const initialState = {
  web3Instance: null,
  matchBetting: null,
};

const web3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.WEB3_INITIALIZED:
      return {
        ...state,
        web3Instance: action.payload.web3Instance,
      };

    case types.WEB3_INITIALIZED_ERROR:
      return {
        ...state,
        web3Error: action.payload,
      };

    case types.CONTRACT_INITIALIZED:
      return {
        ...state,
        matchBetting: action.payload,
      };

    default:
      return state;
  }
};

export default web3Reducer;

