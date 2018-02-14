/* import {handleActions} from 'redux-actions';

import {
    fetchLoginRequest, 
    fetchLoginSucess, 
    fetchLoginFailure,
    fetchRegistrationRequest,
    fetchRegistrationFailure,
    logout
} from "../actions/auth";

const initiaState = {
    isAuthorized: false,
    loginError: null,
    registationError: null
}

export default handleActions({
    [fetchLoginRequest]: (state, action) => ({
        ...initiaState
    }),
    [fetchLoginSucess]: (state, action) => ({
        ...initiaState, 
        isAuthorized: true
    }),
    [fetchLoginFailure]: (state, action) => ({
        ...initiaState, 
        loginError: action.payload
    }),
    [fetchRegistrationRequest]: (state, action) => ({
        ...initiaState
    }),
    [fetchRegistrationFailure]: (state, action) => ({
        ...state, 
        registationError: action.payload
    }),
    [logout]: (state, action) => ({
        ...initiaState
    })
}, initiaState);

export const getIsAuthorized = state =>  state.auth.isAuthorized;
export const getIsLoginError = state => state.auth.loginError;
export const getIsregistationError = state => state.auth.registationError; */

import {handleActions} from 'redux-actions';
import {setPlace} from '../actions/setPlace';

const initialState = {
    mapItems: []
}

export default handleActions({
    [setPlace]: (state, action) => ({
        ...initialState
    })
}, initialState);