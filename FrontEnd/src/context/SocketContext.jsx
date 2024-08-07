import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthContextProvider";

export const SocketContext = createContext();

export default function SocketContextProvider({ children }) {
  const { authuser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  let [onlineusers, setOnlineusers] = useState({});

  useEffect(() => {
    if (authuser) {
      const socket = io("https://messenger-app-5avz.onrender.com", {
        query: {
          authuserID: authuser._id,
        },
      });
      setSocket(socket);
      socket.on("getonlineusers", (users) => {
        onlineusers = users;
        setOnlineusers(onlineusers);
        console.log(onlineusers);
      });
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authuser]);

  return (
    <SocketContext.Provider value={{ socket, onlineusers }}>
      {children}
    </SocketContext.Provider>
  );
}
