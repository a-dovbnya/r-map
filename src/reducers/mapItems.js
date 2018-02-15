import {handleActions} from 'redux-actions';
import {setPlace, receivedData, receivedError} from '../actions/setPlace';

const initialState = {
    mapItems: [],
    fethItem: false,
    error: ''
}

export default handleActions({
    [setPlace]: (state, action) => ({
        ...state,
        fethItem: true,
        error: ''
    }),
    [receivedData]: (state, action) => ({
        //...state,
        fethItem: false,
        error: '',
        mapItems: [...state.mapItems, action.payload]
    }),
    [receivedError]: (state, action) => ({
        ...state,
        fethItem: false,
        error: action.payload,
    })

}, initialState);

export const getFetching = state => state.fetchItem;
export const getError = state => state.error;
export const getItems = state => {console.log('getItems = ',state.mapItems); return state.mapItems};