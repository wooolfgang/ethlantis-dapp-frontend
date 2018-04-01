import { combineReducers } from 'redux';
import web3Reducer from './web3Reducer';
import userReducer from './userReducer';
import matchReducer from './matchReducer';

const rootReducer = combineReducers({
  web3: web3Reducer,
  user: userReducer,
  match: matchReducer,
});

export default rootReducer;
