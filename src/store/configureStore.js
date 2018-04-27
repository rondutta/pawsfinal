import { createStore, combineReducers } from 'redux';
import postReducer from './reducers/root';

const rootReducer = combineReducers({
    posts: postReducer
});

const configureStore = ()=>{
    return createStore(rootReducer);
}

export default configureStore;