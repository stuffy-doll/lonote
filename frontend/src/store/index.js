import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import noteReducer from './note';
import notebookReducer from './notebook';
import sessionReducer from './session';
import stickyReducer from './sticky';

const rootReducer = combineReducers({
  session: sessionReducer,
  notebooks: notebookReducer,
  notes: noteReducer,
  sticky: stickyReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
};

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;
