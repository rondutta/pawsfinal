import { ADD_POST,DELETE_POST } from './actionTypes';

export const addPost = (postName, location, image)=>{
    return dispatch => {
        const postData = {
            name: postName,
            location: location
        }
        fetch("https://paws-8e222.firebaseio.com/posts.json",{
            method: 'POST',
            body: JSON.stringify(postData)
        })
        .catch(error => console.log(error))
        .then(res => res.json())
        .then(parsedResponse => {
            console.log(parsedResponse);
        });
    }
}

export const deletePost = (key) => {
    return {
        type: DELETE_POST,
        postKey: key
    };
};

