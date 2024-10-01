import { createContext, useContext, useEffect, useState } from "react";
import { useGetHome } from "../hooks/useAnimeHook";
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";
import { URL_ACTIVITY_STATS } from "../utils/APIRoutes";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const [userID, setUseID] = useState(sessionStorage.getItem("userID"));

  const [visits, setVisits] = useState(null);
  const [activeUsers, setActiveUsers] = useState(null);

  const { homeData, isHomeLoading, isHomeError } = useGetHome();
  const [currentVideoData, setCurrentVideoData] = useState({});
  const [currentServerCategory, setCurrentServerCategory] = useState({
    server: "hd-1",
    category: "sub",
  });

  useEffect(() => {
    if (!userID) {
      let randomNumber = Math.floor(10000000 + Math.random() * 90000000);

      console.log(randomNumber);

      setUseID(randomNumber);

      sessionStorage.setItem("userID", randomNumber);
    }
  }, []);

  const getActivityStats = async () => {
    try {
      const response = await axios.post(URL_ACTIVITY_STATS);

      console.log(response.data);
      setVisits(response.data.visits);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("updateVisits", () => {
      getActivityStats();
    });

    socket.on("activeUsers", (activeUsers) => {
      console.log(activeUsers);
      setActiveUsers(activeUsers);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  if (isHomeLoading) return <LoadingScreen errorHook={isHomeError} />;

  return (
    <AnimeContext.Provider
      value={{
        homeData,
        isHomeLoading,
        isHomeError,
        currentVideoData,
        setCurrentVideoData,
        currentServerCategory,
        setCurrentServerCategory,
        visits,
        activeUsers,
      }}>
      {children}
    </AnimeContext.Provider>
  );
};

export const useAnimeContext = () => useContext(AnimeContext);
