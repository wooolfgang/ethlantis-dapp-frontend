import { combineReducers } from 'redux';
import web3Reducer from './web3Reducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  web3: web3Reducer,
  user: userReducer,
});

export default rootReducer;
