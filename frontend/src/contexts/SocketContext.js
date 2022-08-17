import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

export const SocketContext = createContext(null);

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:5000", {
        query: { id: user._id },
        transports: ["websocket"],
      });
      setSocket(newSocket);
      newSocket.on("disconnect", () => {
        setSocket(null);
      });
      return () => newSocket.close();
    }
  }, [user]);

  const values = { socket };
  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
