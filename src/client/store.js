import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Add middleware to createStore
var createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

// App Reducers
import messageReducer from './reducers/message';

// Combine Reducers
var reducers = combineReducers({
  messageReducer: messageReducer
  // more...
});

// Create Store
var store = createStoreWithMiddleware(reducers);

export default store;
