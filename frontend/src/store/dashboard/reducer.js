import { SET_DATA, SET_LOADING, SET_RESOURCES } from "./constants";

const INITIAL_STATE = {
    page : 1,
    totalPages : 1,
    resources : [],
    loading : false,
}

export default function dashboardReducer (state=INITIAL_STATE,action) {
    switch(action.type) {
        case SET_LOADING : return {...state,loading : action.payload};
        case SET_DATA : return {...state,...action.payload};
        case SET_RESOURCES : return {...state,resources : action.payload};
        default : return state;
    }
}