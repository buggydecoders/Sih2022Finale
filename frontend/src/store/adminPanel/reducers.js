import CONSTANTS from './constants';

// stats
// institute
// requirement
// request
// resource

const INITIAL_STATE = {
    stats: [],
    institutes: [],
    requirements: [],
    requests: [],
    resources: [],
    loading: "",
    page: 1,
    limit: 10,
    totalPages: 1
}
export default function adminReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CONSTANTS.SET_STATS: return { ...state, stats: action.payload };
        case CONSTANTS.SET_INSTITUTES: return { ...state, institutes: action.payload };
        case CONSTANTS.SET_REQUIREMENTS: return { ...state, requirements: action.payload };
        case CONSTANTS.SET_REQUESTS: return { ...state, requests: action.payload };
        case CONSTANTS.SET_RESOURCES: return { ...state, resources: action.payload };
        case CONSTANTS.SET_ADMIN_LOADING: return { ...state, loading: action.payload };

        default: return state;
    }
}

