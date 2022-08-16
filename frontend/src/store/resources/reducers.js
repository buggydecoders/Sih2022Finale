import CONSTANTS from './constants';
const INITIAL_STATE = {
    list : [],
    savedItems: [],
    page : 1,
    limit : 10,
    state : 'all',
    category : 'all',
    loading : false,
    totalPages : 1
}
export default function ResourcesReducer(state=INITIAL_STATE, action){
    switch(action.type) {
        case CONSTANTS.SET_DATA : return {...state,...action.payload};
        case CONSTANTS.DELETE_SAVED_ITEM : return {...state,savedItems : state.savedItems.filter(r=>r._id!==action.payload)}
        case CONSTANTS.SET_LOADING : return {...state,loading : action.payload};
        case CONSTANTS.SAVE_RESOURCE_FOR_LATER : return {...state, savedItems : [...state.savedItems, action.payload]};
        default : return state;
    } 
}

