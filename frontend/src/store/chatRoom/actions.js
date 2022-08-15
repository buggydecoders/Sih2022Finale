import CONSTANTS from "./constants"
import { fetchRoomAPI, fetchRoomsAPI } from "./services"
import {toast} from 'react-toastify';


export const setActiveRoom = (activeRoom)=>{
    return {
        type : CONSTANTS.SET_ACTIVE_ROOM,
        payload : activeRoom
    }
}


export const setRooms = (data)=>{
    return {
        type : CONSTANTS.SET_ROOMS,
        payload : data
    }
}

export const setLoading = (state)=>{
    return {
        type : CONSTANTS.SET_LOADING,
        payload : state
    }
}

export const setRoomsLastMessage = (roomId,lastMessage)=>{
    return {
        type : CONSTANTS.SET_LAST_MESSAGE,
        payload : {roomId,lastMessage}
    }
}

export const fetchRooms = ()=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await fetchRoomsAPI();
        let rooms = result.data.rooms;
        dispatch(setRooms(rooms));
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
    }
}

export const fetchAndSetActiveRoom = (userId)=> async(dispatch,getState)=>{
    try{
        const {user} = getState().auth;
        dispatch(setLoading(true));
        const result = await fetchRoomAPI(userId,user._id);
        dispatch(setActiveRoom(result.data.room));
        console.log(result, 'ACTIVE ROOM RESULT');
    }catch(err){
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
    }
}


