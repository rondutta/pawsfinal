import { ADD_POST,DELETE_POST } from './actionTypes';
export const addPost = (postName, location)=>{
    return {
        type: ADD_POST,
        postName: postName,
        location: location
    };
}

export const deletePost = (key) => {
    return {
        type: DELETE_POST,
        postKey: key
    };
};

