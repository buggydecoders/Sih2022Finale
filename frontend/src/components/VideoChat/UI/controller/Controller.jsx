import React, { useContext } from 'react'
import './Controller.styles.scss';
import {MdMic,MdMicOff} from 'react-icons/md';
import {BsCameraVideoFill,BsCameraVideoOffFill} from 'react-icons/bs';
import { VideoChatContext } from '../../VideoChatContext';
import { NotificationContext } from '../../../../contexts/NotificationContext';
import { useSelector } from 'react-redux';
import MessageContextProvider, { MessageContext } from '../../../../contexts/MessageContext';
const Controller = () => {
    const {controllerState,toggleVideo,participantList,toggleMic, leaveCall,setIsUiLarge} = useContext(VideoChatContext);
    const {sendCallNotification} = useContext(NotificationContext);
    const {activeRoom} = useSelector(state=>state.chatRoom);
    const {user} = useSelector(state=>state.auth);
    const {reciever} = useContext(MessageContext);

  return (
    <div className='controller'>
        <div className='controller-container'>
            <div>
                <button disabled={participantList.length>2} className='controller-send-button' onClick={()=>sendCallNotification(reciever._id,)}>Send Call Request</button>
            </div>
            <div className='controller__controls'>
                <div className='controller__controls-item' onClick={toggleVideo}>
                    {!controllerState.video?<BsCameraVideoFill/>:<BsCameraVideoOffFill/>}
                </div>
                <div className='controller__controls-item' onClick={toggleMic}>
                    {!controllerState.mic?<MdMic/>:<MdMicOff/>}
                </div>
                <div className='controller__controls-item-leave' onClick={leaveCall}>
                    Leave Call
                </div>
            </div>
            <div>
                <div className='controller-minimize-button' onClick={()=>setIsUiLarge(false
                    
                    
                    
                    )}>Minimize</div>
            </div>
        </div>
    </div>
  )
}

const ControllerUpdated = ()=><MessageContextProvider><Controller/></MessageContextProvider>

export default ControllerUpdated