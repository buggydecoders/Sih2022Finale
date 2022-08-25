import React, { useContext, useEffect, useRef, useState } from "react";
import UniversityLogo from "../../assets/DAVV_LOGO.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiPhoneCall } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import SideProfile from "./SideProfile";
import { useSelector } from "react-redux";
import { MessageContext } from "../../contexts/MessageContext";
import moment from "moment";
import { VideoChatContext } from "../VideoChat/VideoChatContext";
import VideoChat from "./VideoChat";
import { NotificationContext } from "../../contexts/NotificationContext";
import MessageCard from "./MessageCard";
import MessageController from "./MessageController";

const ProfileCard = ({ data }) => {
  const {createVideoCall} = useContext(VideoChatContext);
  const {sendCallNotification} = useContext(NotificationContext);
  const {reciever} = useContext(MessageContext)
  const {activeRoom} = useSelector(state=>state.chatRoom);
  const {user} = useSelector(state=>state.auth);
  const handleCall = async()=>{
    await createVideoCall(activeRoom._id,user.instituteName,user._id);
    if (activeRoom._id) {
    sendCallNotification(reciever._id,activeRoom._id);
    }
  }
  return (
    <div className="py-3 px-5 shadow-lg flex justify-between rounded-xl items-center">
      <div className="flex items-center gap-3">
        <img src={data?.logo} className="w-[45px] rounded-full h-[45px]"></img>
        <div className="text-base font-semibold">
          {data?.instituteName}
          <div className="mt-0 text-xs font-[500] text-gray-400">
            Active now
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-[40px] h-[40px] rounded-full bg-lightGray flex items-center justify-center shadow-sm">
          <BsThreeDotsVertical />
        </div>
        <div className="w-[40px] h-[40px] rounded-full bg-lightGray flex items-center justify-center shadow-sm">
          <BiPhoneCall onClick={handleCall} />
        </div>
      </div>
    </div>
  );
};





const ActiveConversation = () => {
  const { activeRoom } = useSelector((state) => state.chatRoom);
  const { user } = useSelector((state) => state.auth);
  const {
    participantList,
    actionTypes,
    dispatch: videoChatDispatch,
    createVideoCall,
    leaveCall,
    controllerState,
    isUiLarge,
    toggleVideo,
    toggleMic,
    setIsUiLarge,
  } = useContext(VideoChatContext);


  const isVideoChatLarge = controllerState.isCall && isUiLarge;


  const { reciever, messagesLoading, messages, sendMessage } =
    useContext(MessageContext);
  const messageContainerRef = useRef();
  useEffect(() => {
    if (messageContainerRef.current) {
      let element = messageContainerRef.current;
      element.scrollTop = element.scrollHeight - element.clientHeight;
    }
  }, [messages]);

  return (
    <div className="px-5 py-6 grid grid-cols-[4fr_1.4fr] gap-5 border-[1px] border-opacity-5 rounded-md border-l-0 border-r-0">
      {messagesLoading ? (
        <div>Loading</div>
      ) : (
        isVideoChatLarge?<VideoChat/>:<div>
          <ProfileCard data={reciever} />
          <div
            ref={messageContainerRef}
            className="mt-6 pb-3 h-[60vh] space-y-3 overflow-y-auto overflow-x-hidden"
          >
            {messages.length > 0 ? (
              messages.map((m) => (
                <MessageCard isSent={m?.from?._id === user._id} message={m} />
              ))
            ) : (
              <div></div>
            )}
          </div>
          <div className="mt-5 space-y-4">
            <MessageController sendMessage={sendMessage} />
          </div>
        </div>
      )}
      <SideProfile data={reciever} />
    </div>
  );
};

export default ActiveConversation;
