import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import appReducer, { initialState } from '../App.reducer';

const middleware = [thunk];

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(appReducer, initialState, compose(applyMiddleware(...middleware), composeEnhancers()));

export type State = ReturnType<typeof appReducer>;

export default store;
