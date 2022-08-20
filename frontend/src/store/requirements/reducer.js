import CONSTANTS from './constants';
const INITIAL_STATE = {
    requirements : [],
    loading : false,
}

export default function RequirementsReducer(state=INITIAL_STATE,action) {
    switch(action.type) {
        case CONSTANTS.SET_REQUIREMENTS: return {...state, requirements: action.payload};
        case CONSTANTS.ADD_REQUIREMENTS : return {...state, requirements : [...state.requirements, action.payload]};
        case CONSTANTS.SET_LOADING : return {...state,loading : action.payload}
        case CONSTANTS.DELETE_REQUIREMENTS : return {...state,requirements : state.requirements.filter(r=>r._id!==action.payload)}
        case CONSTANTS.EDIT_REQUIREMENTS : return {...state,list : [...state.requirements.map(r=>{
            if (r._id===action.payload._id) return action.payload;
            return r;
        })]}
        default : return state;
    }
}