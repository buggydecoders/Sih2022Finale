import { serverInstance } from "../../utils/serverInstance"

export const fetchRoomAPI = async(user1,user2)=>{
    const result = await serverInstance.post('/chat-room', {user1,user2});
    return result;
}

export const fetchRoomsAPI = async()=>{
    const result = await serverInstance.get('/chat-room');
    return result;
} 