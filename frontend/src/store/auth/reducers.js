import CONSTANTS from "./constants"

const INITIAL_STATE = {
    user : {},
    isLoggedin : false,
    loading : false
}

export default function authReducer(state=INITIAL_STATE,action){
    switch(action.type) {
        case CONSTANTS.SET_USER : return {...state, user : action.payload, isLoggedin : true};
        case CONSTANTS.SET_LOADING : return {...state,loading : action.payload};
        case CONSTANTS.SET_AUTH : return {...state,...action.payload}
        default : return state;
    }
}