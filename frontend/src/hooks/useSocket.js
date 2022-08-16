import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import io from 'socket.io-client';

const useSocket = ()=>{
    const [socket,setSocket] = useState(null);
    const {user} = useSelector(state=>state.auth);

    useEffect(()=>{
        const newSocket = io('http://localhost:5000', {
            query : {id : user._id},
            transports:['websocket']
          })
          setSocket(newSocket);
          newSocket.on("disconnect", ()=>{
            setSocket(null);
          })
          return ()=>newSocket.close();
    }, [user])

    return {socket}
}

export default useSocket