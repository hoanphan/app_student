import rootReducer from './reducers';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk'

export default Store=createStore(
    rootReducer,
    {},
    applyMiddleware(thunk)
);
