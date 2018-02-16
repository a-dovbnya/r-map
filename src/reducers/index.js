/* import {combineReducers} from 'redux';

import mapItems from './mapItems';

export default combineReducers({
    mapItems
}); */

import {handleActions} from 'redux-actions';
import {setPlace, receivedData, receivedError, sortData, removeItem} from '../actions/setPlace';

const initialState = {
    mapItems: [],
    fetchItem: false,
    error: ''
}

export default handleActions({
    [setPlace]: (state, action) => ({
        ...state,
        fetchItem: true,
        error: ''
    }),
    [receivedData]: (state, action) => ({
        //...state,
        fetchItem: false,
        error: '',
        mapItems: [...state.mapItems, action.payload]
    }),
    [receivedError]: (state, action) => ({
        ...state,
        fetchItem: false,
        error: action.payload,
    }),
    [sortData]: (state, action) => ({
        ...state,
        error: '',
        mapItems: action.payload
    }),
    [removeItem]: (state, action) => ({
        ...state,
        mapItems: action.payload
    })

}, initialState);

export const getFetching = state => state.fetchItem;
export const getError = state => state.error;
export const getItems = state => {console.log('getItems = ',state.mapItems); return state.mapItems};