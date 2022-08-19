import CONSTANTS from './constants';
const INITIAL_STATE = {
    list : [],
    page : 1,
    savedItems : [],
    limit : 10,
    category : 'all',
    loading : false,
    totalPages : 1,
    resource : {}
}
export default function ResourcesReducer(state=INITIAL_STATE, action){
    switch(action.type) {
        case CONSTANTS.SET_DATA : return {...state,...action.payload};
        case CONSTANTS.SET_LOADING : return {...state,loading : action.payload};
        case CONSTANTS.ADD_SAVED_ITEM : return {...state,savedItems : [...state.savedItems, action.payload]}
        case CONSTANTS.DELETE_SAVED_ITEM : return {...state, savedItems : state.savedItems.filter(r=>r._id!=action.payload)}
        case CONSTANTS.SET_SAVED_ITEM : return {...state,savedItems : action.payload}
        case CONSTANTS.SET_RESOURCE : return {...state, resource: action.payload}
        case CONSTANTS.SEARCH_RESOURCE : return {...state, list : action.payload}
        default : return state;
    } 
}

