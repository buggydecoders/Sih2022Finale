import CONSTANTS from './constants';
const INITIAL_STATE = {
    list : [],
    page : 1,
    limit : 10,
    state : '',
    category : '',
    loading : false,
    totalPages : 1
}
export default function MyResourceReducer(state=INITIAL_STATE, action){
    switch(action.type) {
        case CONSTANTS.SET_DATA : return {...state,...action.payload};
        case CONSTANTS.SET_LOADING : return {...state,loading : action.payload};
        default : return state;

    } 
}

