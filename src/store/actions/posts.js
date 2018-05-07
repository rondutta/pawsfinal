import { SET_POSTS, REMOVE_POST } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index'

export const addPost = (postName, location, image)=>{
    return dispatch => {
        let authToken;

        dispatch(uiStartLoading());
        dispatch(authGetToken)
        .catch(() => {
            alert("Not a valid token!");
        })
        .then(token => {
            authToken = token;
            return fetch("https://us-central1-paws-8e222.cloudfunctions.net/storeImage", {
                method: 'POST',
                body: JSON.stringify({
                    image: image.base64
                }),
                headers: {
                    "Authorization" : "Bearer " + authToken
                }
            })  
        })
        .catch(error => {
            alert('Something went wrong, please try again.');
            dispatch(uiStopLoading());
            console.log(error);
        })
        .then(res => res.json())
        .then(parsedResponse => {
            const postData = {
                name: postName,
                location: location,
                image: parsedResponse.imageUrl
            }
            return fetch("https://paws-8e222.firebaseio.com/posts.json?auth=" + token, {
                method: 'POST',
                body: JSON.stringify(postData)
            })
        })
        .then(res => res.json())
        .then(parsedResponse => {
            console.log(parsedResponse);
            dispatch(uiStopLoading());
        })
        .catch(error => {
        dispatch(uiStopLoading());
        alert('Something went wrong, please try again.');
        console.log(error);
        });

    }
}

export const getPosts = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            return fetch("https://paws-8e222.firebaseio.com/posts.json?auth=" + authToken);
        })
        .catch(() => {
            alert("Not a valid token!");
        })
        .then(res => res.json())
        .then(parsedResponse => {
            const posts = [];

            for (let key in parsedResponse){
                posts.push({
                    ...parsedResponse[key],
                    image: {
                        uri: parsedResponse[key].image
                    },
                    key: key
                })
            }
            dispatch(setPosts(posts));
        })
        .catch(error => {
            alert('Something went wrong. Please try again.');
            dispatch(uiStopLoading());
            console.log(error);
        });
    }
}

export const setPosts = posts => {
    return {
        type: SET_POSTS,
        posts: posts
    }
}

export const deletePost = (key) => {
    return dispatch => {
        dispatch(authGetToken)
        .catch(() => {
                alert("Not a valid token!")
        })
        .then(token => {
            dispatch(removePost(key));
            return fetch("https://paws-8e222.firebaseio.com/posts" + key + ".json?auth=" + token, {
                method: 'DELETE'
            })
        })
        .then(res => res.json())
        .then(parsedResponse => {
            console.log('Done !');
        })
        .catch(err => {
            alert('Something went wrong. Please try again.');
            console.log(err);
        });
    }
};

export const removePost = key => {
    return {
        type: REMOVE_POST,
        key: key
    }
}

