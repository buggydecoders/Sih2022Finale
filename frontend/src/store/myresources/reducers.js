import CONSTANTS from './constants';
const INITIAL_STATE = {
    list : [],
    page : 1,
    limit : 10,
    state : 'all',
    category : 'all',
    loading : false,
    totalPages : 1
}
export default function MyResourceReducer(state=INITIAL_STATE, action){
    switch(action.type) {
        case CONSTANTS.SET_DATA : return {...state,...action.payload};
        case CONSTANTS.SET_LOADING : return {...state,loading : action.payload};
        case CONSTANTS.ADD_RESOURCE : return {...state, list : [...state.list,action.payload]}
        case CONSTANTS.DELETE_RESOURCE : return {...state,list : state.list.filter(r=>r._id!==action.payload)}
        case CONSTANTS.EDIT_RESOURCE : return {...state,list : [...state.list.map(r=>{
            if (r._id===action.payload._id) return action.payload;
            return r;
        })]}
        default : return state;
    } 
}

