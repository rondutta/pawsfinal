import { AUTH_STATUS, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const authStatus = (authData,authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        let apiKey = 'AIzaSyAemOvWGhGUEZVCZg36rtOpgZHUYIzrJAU'
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + apiKey ;
        if (authMode==='signup') {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + apiKey ;
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        .catch(error => {
            alert('Something went wrong. Please try again.');
            dispatch(uiStopLoading());
            console.log('error');
        })
        .then(res => res.json())
        .then(parsedResponse => {
            dispatch(uiStopLoading());
            if (!parsedResponse.idToken) {
                alert('Something went wrong. Please try again.');
            }
            else {
                dispatch(authSetToken(parsedResponse.idToken));
                startMainTabs();
            }
        })
    }
}

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
}

export const authGetToken = () => {
    return ( dispatch, getState) => {
        const promise = new Promise((resolve, reject ) => {
            const token = getState().auth.token;
            if (!token) {
                reject();
            }
            else{
                resolve(token);
            }
        });
        return promise;
    }
}