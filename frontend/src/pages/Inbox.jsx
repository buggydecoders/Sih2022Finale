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
  const { loading } = useSelector((state) => state.chatRoom);
  // useEffect(() => {
  //   dispatch(fetchRooms());
  //   let userId = query("chat");
  //   if (userId) {
  //   dispatch(fetchAndSetActiveRoom(userId));
  //   }
  // }, []);
  if (loading) return <div>Loading..</div>;
  return (
    <Layout>
      <MessageContextProvider>
        <div className="grid grid-cols-[1.2fr_4fr]">
          <div className="">
            <AllMessages />
          </div>
          <div className="">
            <ActiveConversation />
          </div>
        </div>
      </MessageContextProvider>
    </Layout>
  );
};

export default Inbox;
