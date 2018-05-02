import { SET_POSTS, REMOVE_POST } from '../actions/actionTypes';

const initialState = {
    posts: []
};


const reducer = (state=initialState,action)=>{
    switch (action.type){
        case SET_POSTS:
        return {
            ...state,
            posts: action.posts
        }
        case REMOVE_POST:
        return {
            ...state,
            posts: state.posts.filter(post => {
                return post.key !== action.key;
            })
        }
        default:
         return state;
    }

};

export default reducer;