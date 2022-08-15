import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActiveConversation from "../components/Inbox/ActiveConversation";
import AllMessages from "../components/Inbox/AllMessages";
import Layout from "../components/Layout";
import MessageContextProvider from "../contexts/MessageContext";
import useQueryParams from "../hooks/useQueryParams";
import { fetchAndSetActiveRoom, fetchRooms } from "../store/chatRoom/actions";

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
          <div className="">
            {false?<ActiveConversation />:<div className="w-full h-full flex items-center justify-center text-gray-700 font-open">
              Select Chat That will be displayed here
            </div>}
          </div>
        </div>
      </MessageContextProvider>
    </Layout>
  );
};

export default Inbox;
