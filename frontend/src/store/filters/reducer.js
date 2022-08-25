import CONSTANTS from './constants';

const INITIAL_STATE = {
    institutes : [],
    states : [],
    loading : false

}

export default function filterReducer(state=INITIAL_STATE,action) {
    switch(action.type) {
        case CONSTANTS.SET_INSTITUTES : return {...state, institutes : action.payload}
        case CONSTANTS.SET_LOADING : return {...state, loading : action.payload}
        case CONSTANTS.SET_STATES  :return {...state,states : action.payload}
        default : return state;
    }
} 

