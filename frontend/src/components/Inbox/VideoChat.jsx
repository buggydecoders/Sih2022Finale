import React, { useContext, useEffect } from 'react'
import Controller from '../VideoChat/UI/controller/Controller';

import ParticipantGrid from '../VideoChat/UI/ParticipantGrid/ParticipantGrid';
import { VideoChatContext } from '../VideoChat/VideoChatContext';
import './VideoChat.styles.scss';


const VideoChat = () => {
  const {leaveCall} = useContext(VideoChatContext);

  return (
    <div className='' style={{width : '85%'}}>
        <div className='videochat__title' >
          <div className='participant-container' style={{width : '100%'}}>
          <ParticipantGrid/>
          </div>
          <Controller/>
        </div>
    </div>
  )
}

export default VideoChat