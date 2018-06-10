import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares)),
);

export default store;
