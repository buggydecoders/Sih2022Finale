import React, { useContext } from 'react'
import {MdMic,MdMicOff} from 'react-icons/md';
import {BsCameraVideoFill,BsCameraVideoOffFill} from 'react-icons/bs';
import {ImPhoneHangUp} from 'react-icons/im';
import { VideoChatContext } from '../../VideoChatContext';
import './MinimizedController.styles.scss'
const MinimizedController = () => {
    const {controllerState,toggleVideo,toggleMic, leaveCall,setIsUiLarge} = useContext(VideoChatContext)

  return (
    <div className='min-controller'>
        <div className='min-controller-title' onClick={()=>setIsUiLarge(true)}><div className='min-controller-sign'></div>Video Call</div>
        <div className='min-controller-control-item' onClick={toggleMic}>{!controllerState.mic?<MdMic size={19}/>:<MdMicOff size={19}/>}</div>
        <div className='min-controller-control-item' onClick={toggleVideo}> {!controllerState.video?<BsCameraVideoFill size={18}/>:<BsCameraVideoOffFill size={18}/>}</div>
        <div className='min-controller-control-leave'><ImPhoneHangUp size={18} onClick={leaveCall}/></div>
    </div>
  )
}

export default MinimizedController