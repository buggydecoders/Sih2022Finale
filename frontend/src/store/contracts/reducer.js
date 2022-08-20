import CONSTANTS from './constants';

const INITIAL_STATE = {
    contract : {},
    contracts : [],
    loading : false,
    page : 1,
    limit : 10,
    totalPages : 1
}

export default function contractReducer(state=INITIAL_STATE,action) {
    switch(action.type) {
        case CONSTANTS.SET_CONTRACTS : return {...state,contracts : action.payload};
        case CONSTANTS.ADD_CONTRACT : return {...state,contracts : [...state.contracts,action.payload]}
        case CONSTANTS.SET_DATA : return {...state,...action.payload}
        case CONSTANTS.SET_LOADING : return {...state, loading : action.payload};
        case CONSTANTS.EDIT_CONTRACT : return {...state, contracts : [...state.contracts.filter(c=>c._id!==action.payload._id), action.payload]}
        case CONSTANTS.DELETE_CONTRACT : return {...state,contracts : state.contracts.filter(c=>c._id!==action.payload)};
        default : return state;
    }
} 

