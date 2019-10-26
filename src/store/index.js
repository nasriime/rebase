import {createStore, applyMiddleWare, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../roducers';

const initialState = {};
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleWare(...middleware))
);

export default store;