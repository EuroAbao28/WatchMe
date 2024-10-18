import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { URL_USER_AUTH, URL_USER_MSG } from "../utils/APIRoutes";
import { socket } from "./AnimeContext";

const UtilityContext = createContext();

export const UtilityProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [isMessageTabOpen, setIsMessageTabOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(false);

  const handleGetUser = async () => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      try {
        const response = await axios.get(`${URL_USER_AUTH}/getUser`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    const getMessage = async () => {
      const userToken = localStorage.getItem("userToken");

      if (userToken) {
        try {
          const response = await axios.get(`${URL_USER_MSG}/`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });

          setMessages(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getMessage();
  }, [user]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);

      if (!isMessageTabOpen) setUnreadMessages(true);
    });
  }, []);

  return (
    <UtilityContext.Provider
      value={{
        user,
        setUser,
        handleGetUser,
        setIsMessageTabOpen,
        isMessageTabOpen,
        messages,
        setMessages,
        unreadMessages,
        setUnreadMessages,
      }}>
      {children}
    </UtilityContext.Provider>
  );
};

export const useUtilityContext = () => useContext(UtilityContext);
