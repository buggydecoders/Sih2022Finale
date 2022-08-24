import React from 'react'
import { FiSend } from "react-icons/fi";
import moment from 'moment';
const MessageCard = ({ isSent, message }) => {
    return (
      <div className={`${isSent ? "justify-end" : "justify-start"} flex w-full`}>
        <div className="py-2 px-3 bg-lightGray rounded-md max-w-[70%]">
          <div
            className={`${
              !isSent ? "text-secondary" : "text-primary"
            } border-b-[1px] font-open font-[500] text-xs`}
          >
            {message?.from?.instituteName} ·{" "}
            <span className="text-gray-500 font-[500] ml-2">
              {moment(message?.createdAt).format("HH:MM")}
            </span>
          </div>
          <div className="font-[500] mt-2 text-xs text-gray-600 break-words">
            {message?.content}{" "}
          </div>
        </div>
      </div>
    );
  };

export default MessageCard