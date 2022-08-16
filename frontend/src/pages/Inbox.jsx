import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActiveConversation from "../components/Inbox/ActiveConversation";
import AllMessages from "../components/Inbox/AllMessages";
import Layout from "../components/Layout";
import MessageContextProvider from "../contexts/MessageContext";
import useQueryParams from "../hooks/useQueryParams";
import { fetchAndSetActiveRoom, fetchRooms } from "../store/chatRoom/actions";
import {BsChatRightDots} from 'react-icons/bs';
const Inbox = () => {
  const query = useQueryParams();
  const dispatch = useDispatch();
  const { loading,rooms,activeRoom } = useSelector((state) => state.chatRoom);
  console.log(activeRoom);
  // console.log(rooms, 'ROOMS');
  useEffect(() => {
    dispatch(fetchRooms());
    let userId = query("chat");
    console.log(userId,'userId');
    if (userId) {
    dispatch(fetchAndSetActiveRoom(userId));
    }
  }, []);
  if (loading) return <div>Loading..</div>;
  console.log(activeRoom, 'ACTIVE ROOM')
  return (
    <Layout>
      <MessageContextProvider>
        <div className="grid grid-cols-[1.2fr_4fr]">
          <div className="">
            <AllMessages />
          </div>
          <div className="shrink-0">
            {Object.keys(activeRoom).length>0?<ActiveConversation />:<div className="w-full h-full flex items-center text-center flex-col gap-5 justify-center text-gray-700 font-open">
              <BsChatRightDots size={30}/>
              <span className="text-primary">Select Chat from sidebar that will be <br/>displayed here!</span>
            </div>}
          </div>
        </div>
      </MessageContextProvider>
    </Layout>
  );
};

export default Inbox;
