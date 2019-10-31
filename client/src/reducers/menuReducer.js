import {FETCH_MENU} from '../constants/types';

const initialState = {
    data: []
}

export default function(state = initialState, action){
    switch (action.type){
        case FETCH_MENU:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}