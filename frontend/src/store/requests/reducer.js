import CONSTANTS from './constants';
const INITIAL_STATE = {
    activeRequest : {},
    requests : [],
    loading : false,
    recievedRequests : []
}


export default function RequestReducer(state=INITIAL_STATE,action) {
    switch(action.type) {
        case CONSTANTS.SET_REQUESTS : return {...state,requests : action.payload};
        case CONSTANTS.SET_REQUEST : return {...state,activeRequest : action.payload};
        case CONSTANTS.ADD_REQUEST : return {...state,requests : [...state.requests, action.payload]};
        case CONSTANTS.SET_LOADING : return {...state,loading : action.payload}
    }
}