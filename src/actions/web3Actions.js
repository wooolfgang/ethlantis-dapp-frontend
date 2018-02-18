import * as types from '../constants/ActionTypes';

const initializeWeb3 = payload => ({
  type: types.WEB3_INITIALIZED,
  payload,
});

export default initializeWeb3;

