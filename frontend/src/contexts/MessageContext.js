import { createContext, useEffect, useState } from "react"
import io from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import { serverInstance } from "../utils/serverInstance";
import { toast } from "react-toastify";
import moment from 'moment';
import { setRoomsLastMessage } from "../store/chatRoom/actions";
export const MessageContext = createContext(null);

export default function MessageContextProvider({children}) {
    const {user} = useSelector(state=>state.auth); 
    const [socket,setSocket] = useState(null);
    const {activeRoom} = useSelector(state=>state.chatRoom);
    console.log(activeRoom)
    const [loading,setLoading] = useState(false);
    const [messages,setMessages] = useState([]);
    const [error,setError] =useState('');
    const [reciever,setReciever] = useState(null);
    const dispatch = useDispatch();
    useEffect(()=>{
        const newSocket = io('http://localhost:5000', {
          query : {id : user._id}
        })
        setSocket(newSocket);
        newSocket.on('receive-message', (result)=>{
          setMessages((list)=>[result,...list,])
        })
        return ()=>newSocket.close();
      }, [user])

      useEffect(()=>{
        let fetchData = async()=>{
            try {
            setLoading(true);
            const result = await serverInstance.post(`/chat-room/${activeRoom._id}`);
            setMessages(result.data.messages);
            }catch(err) {
                console.log(err);
                setError(err?.response?.data?.message || 'Something went wrong!');
                toast(err?.response?.data?.message || 'Something went wrong!')
            }finally{
                setLoading(false)
            }

        }
        // if (activeRoom) {
        // fetchData();
        // setReciever(activeRoom.users[0]._id===user._id?activeRoom.users[1]:activeRoom.users[0]);
        // }
      }, [activeRoom]);

      const sendMessage = (content,type='text')=>{
        let dataToSend = {recipients : [reciever._id],type,content,createdAt : new Date(),roomId : activeRoom._id,sender : user._id};
        let lastMessage = {from : user._id,to : reciever._id,type,content,createdAt : moment(new Date()).format('DD-MM-YYYY'), room : activeRoom._id }
        socket.emit('send-message', dataToSend);
        dispatch(setRoomsLastMessage(activeRoom._id,lastMessage));
      }
      
      const value={sendMessage,messages,messagesLoading : loading,reciever,activeRoom,error};

      return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
      )

}


