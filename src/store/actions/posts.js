import { ADD_POST,DELETE_POST } from './actionTypes';
export const addPost = (postName)=>{
    return {
        type: ADD_POST,
        postName: postName
    };
}

export const deletePost = (key) => {
    return {
        type: DELETE_POST,
        postKey: key
    };
};

