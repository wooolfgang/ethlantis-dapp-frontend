import * as types from '../constants/ActionTypes';

const initialState = {
  web3Instance: null,
};

const web3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.WEB3_INITIALIZED:
      return {
        ...state,
        web3Instance: action.payload.web3Instance,
      };

    default:
      return state;
  }
};

export default web3Reducer;

