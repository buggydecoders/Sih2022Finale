import CONSTANTS from './constants';
const INITIAL_STATE = {
    activeRequest : {},
    requests : [],
    loading : false,
    recievedRequests : [],
    isExists : false ,
    page : 1,
    totalPages : 1,
    limit : 10
}


export default function RequestReducer(state=INITIAL_STATE,action) {
    switch(action.type) {
        case CONSTANTS.SET_REQUESTS : return {...state,requests : action.payload};
        case CONSTANTS.SET_REQUEST : return {...state,activeRequest : action.payload};
        case CONSTANTS.ADD_REQUEST : return {...state,requests : [...state.requests, action.payload]};
        case CONSTANTS.SET_LOADING : return {...state,loading : action.payload}
        case CONSTANTS.EDIT_REQUEST : return {...state,requests : state.requests.map(r=>{
            if (r._id===action.payload.id) return action.payload.data;
            else return r;
        }), activeRequest : action.payload.id===state.activeRequest?._id?action.payload.data:state.activeRequest}
        case CONSTANTS.SET_IS_EXISTS : return {...state,isExists : action.payload}
        case CONSTANTS.SET_DATA : return {...state,...action.payload}
        default : return state;
    }
}