import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socketInstance = io("https://chat-app-f3hu.onrender.com", {
        query: { userId: authUser._id },
        transports: ["websocket", "polling"],
      });

      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socketInstance.disconnect();
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
