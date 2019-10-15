


import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import homeReducer from './reducer/homeReducer';
import academyReducer from './reducer/academyReducer';
import authReducer from './reducer/authReducer';

import rThunk from 'redux-thunk' ; 
const rootReducer = combineReducers({
    home: homeReducer , 
    academy : academyReducer ,
    auth :authReducer 
}) ; 

const composeEnhaunster =  process.env.NODE_ENV === 'development' ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose  ;



const configureStore = () => {
    return createStore(rootReducer , composeEnhaunster(applyMiddleware(rThunk)));
}


export default configureStore ; 


