import { ADD_POST, DELETE_POST } from '../actions/actionTypes';

const initialState = {
    posts: []
};


const reducer = (state=initialState,action)=>{
    switch (action.type){
        case ADD_POST:
         return {
             ...state,
            posts : state.posts.concat({
            key: Math.random(),
            name: action.postName,
            image: {
                uri: action.image.uri
            },
            location: action.location
            })
        };
        case DELETE_POST:
         return{
            ...state,
            posts : state.posts.filter(post => {
             return post.key !== action.postKey;
            }),
         };
        default:
         return state;
    }

};

export default reducer;