import { createContext, useContext, useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux';
import { serverInstance } from "../utils/serverInstance";
import { toast } from "react-toastify";
import moment from 'moment';
import { setRoomsLastMessage } from "../store/chatRoom/actions";
import useSocket from "../hooks/useSocket";
import SocketContextProvider, { SocketContext } from "./SocketContext";
export const MessageContext = createContext(null);

export default function MessageContextProvider({children}) {
    const {user} = useSelector(state=>state.auth); 
    // const [socket,setSocket] = useState(null);
    const {activeRoom} = useSelector(state=>state.chatRoom);
    const [loading,setLoading] = useState(false);
    const [messages,setMessages] = useState([]);
    const [error,setError] =useState('');
    const [reciever,setReciever] = useState(null);
    const dispatch = useDispatch();
    const {socket} = useContext(SocketContext);
    useEffect(()=>{
      if (socket) {
        socket.on('receive-message', (result)=>{
          dispatch(setRoomsLastMessage(result.room, result));
          setMessages((list)=>[...list,result]);
        })
      }
    
        
      }, [user,socket])

      useEffect(()=>{
        let fetchData = async()=>{
            try {
            setLoading(true);
            const result = await serverInstance.get(`/chat-room/${activeRoom._id}`);
            setMessages(result.data.messages);
            }catch(err) {
                console.log(err);
                setError(err?.response?.data?.message || 'Something went wrong!');
                toast(err?.response?.data?.message || 'Something went wrong!')
            }finally{
                setLoading(false)
            }

        }
        if (Object.keys(activeRoom).length>0) {
        fetchData();
        setReciever(activeRoom.users[0]._id===user._id?activeRoom.users[1]:activeRoom.users[0]);
        }
      }, [activeRoom]);
      
      const sendMessage = (content,type='text')=>{
        let dataToSend = {recipients : [reciever],type,content,createdAt : new Date(),roomId : activeRoom._id,sender : user};
        let lastMessage = {from : user,to : reciever,type,content,createdAt : moment(new Date()), room : activeRoom._id }
        socket.emit('send-message', dataToSend);
        console.log(lastMessage, 'SENT MESSAGE');
        setMessages((list)=>[...list,lastMessage]);
        dispatch(setRoomsLastMessage(activeRoom._id,lastMessage));
      }
      
      const value={sendMessage,messages,messagesLoading : loading,reciever,activeRoom,error};

      return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
      )

}


