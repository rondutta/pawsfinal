import { SET_POSTS, REMOVE_POST } from './actionTypes';
import { uiStartLoading,uiStopLoading } from './index'

export const addPost = (postName, location, image)=>{
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-paws-8e222.cloudfunctions.net/storeImage",{
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
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
            return fetch("https://paws-8e222.firebaseio.com/posts.json", {
                method: 'POST',
                body: JSON.stringify(postData)
            })
        })
        .catch(error => {
            dispatch(uiStopLoading());
            alert('Something went wrong, please try again.');
            console.log(error);
        })
        .then(res => res.json())
        .then(parsedResponse => {
            console.log(parsedResponse);
            dispatch(uiStopLoading());
        });

    }
}

export const getPosts = () => {
    return dispatch => {
        fetch("https://paws-8e222.firebaseio.com/posts.json")
        .catch(error => {
            alert('Something went wrong. Please try again.');
            dispatch(uiStopLoading());
            console.log(error);
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
        dispatch(removePost(key));
        fetch("https://paws-8e222.firebaseio.com/posts" + key + ".json",{
            method: 'DELETE'
        })
        .catch(err => {
            alert('Something went wrong. Please try again.');
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedResponse => {
            console.log('Done !');
        })
    }
};

export const removePost = key => {
    return {
        type: REMOVE_POST,
        key: key
    }
}

