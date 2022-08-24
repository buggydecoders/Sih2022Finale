import React, {useState} from 'react'
import { FiSend } from "react-icons/fi";

const MessageController = ({ sendMessage }) => {
    const [text, setText] = useState("");
    const handleSend = () => {
      if (text.length > 0) {
        sendMessage(text);
        setText("");
      }
    };
    return (
      <div className="w-full bg-transparent flex items-center py-2 rounded-xl gap-3">
        <div className="w-full">
          <input
            onKeyUp={(e) => e.key === "Enter" && handleSend()}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className=" border-[1px] border-gray-300  w-full px-3 py-2 text-sm rounded-2xl outline-none"
            placeholder="Type your Message here!"
          />
        </div>
        <div
          onClick={handleSend}
          className="w-[40px] h-[40px] flex items-center rounded-full bg-secondary bg-opacity-10 justify-center"
        >
          <FiSend />
        </div>
      </div>
    );
  };

export default MessageController