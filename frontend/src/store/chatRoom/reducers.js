import CONSTANTS from './constants';

const INITIAL_STATE = {
    activeRoom : {},
    rooms : {},
    loading : false
}

const setLastMessage = (roomId,lastMessage,state)=>{
    let updatedActiveRoom = state.activeRoom
    if (updatedActiveRoom?._id === roomId) updatedActiveRoom = {...updatedActiveRoom, lastMessage : lastMessage}
    let updatedRooms = state.rooms.map(r=>{
        if (r._id!==roomId) return r;
        else return {...r,lastMessage : lastMessage};
    }) 
    updatedRooms = [...updatedRooms.filter(r=>r._id===roomId),...updatedRooms.filter(r=>r._id!==roomId)];
    return {...state,rooms : updatedRooms, activeRoom : updatedActiveRoom}
}

export default function chatRoomReducer(state=INITIAL_STATE,action) {
    switch(action.type) {
        case CONSTANTS.SET_ACTIVE_ROOM : return {...state,activeRoom : action.payload};
        case CONSTANTS.SET_LAST_MESSAGE : return setLastMessage(action.payload.roomId,action.payload.lastMessage,state);
        case CONSTANTS.SET_LOADING : return {...state,loading : action.payload}
        case CONSTANTS.SET_ROOMS : return {...state,rooms : action.payload}
        default : return state;
    }
} 