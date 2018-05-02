import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import postReducer from './reducers/root';
import uiReducer from './reducers/ui'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    posts: postReducer,
    ui: uiReducer
});

let composeEnhancers = compose;

if(__DEV__){
    composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
}

const configureStore = ()=>{
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}

export default configureStore;