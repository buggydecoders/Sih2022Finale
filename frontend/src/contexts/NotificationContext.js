import { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSocket from "../hooks/useSocket";
import { SocketContext } from "./SocketContext";

export const NotificationContext = createContext(null);


const NotificationContextProvider = ({children})=>{
    const {socket} = useContext(SocketContext);
    const {user} = useSelector(state=>state.auth);
    const sendCallNotification = (userId,roomId)=>{
        console.log(`SENDING CALL NOTIFICATION ON ${userId} ${roomId}`);
        if (socket) {
        socket.emit('send-notification', {recipients : [userId], sender : user, type : 'call',roomId})
        }else {
            toast('Socket not found!')
        }
    }
    const navigate = useNavigate();
    useEffect(()=>{

        if (socket) {
            socket.on('recieve-notification', (result)=>{
                alert('hi')
                if (result.type==='call') {
                    return toast(<div className="">
                        <p>Getting call from {result.sender.instituteName}</p>
                        <div className="flex"><button onClick={()=>navigate(`/inbox?chat=${result.sender._id}&call=${result.roomId}`)}>Accept</button></div>
                    </div>)
              }
            })
        }

    }, [socket])
    const value = {sendCallNotification}
    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}
export default NotificationContextProvider;

