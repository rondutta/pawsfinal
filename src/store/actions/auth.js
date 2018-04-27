import {AUTH_STATUS} from './actionTypes';

export const authStatus = (authData) => {
    return {
        type: AUTH_STATUS,
        authData: authData
    }
}