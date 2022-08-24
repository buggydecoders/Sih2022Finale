import React, { useRef, useEffect } from "react";
import MessageCard from "./MessageCard";
import moment from "moment";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";

const MessageContainer = ({messages}) => {
  const {user} = useSelector(state=>state.auth);
  const messageContainerRef = useRef();
  useEffect(() => {
    if (messageContainerRef.current) {
      let element = messageContainerRef.current;
      element.scrollTop = element.scrollHeight - element.clientHeight;
    }
  }, [messages]);
  return (
    <div
      ref={messageContainerRef}
      className="mt-6 pb-3 h-[60vh] space-y-3 overflow-y-auto overflow-x-hidden"
    >
      {messages&&messages?.length > 0 ? (
        messages.map((m) => (
          <MessageCard isSent={m?.from?._id === user._id} message={m} />
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MessageContainer;
