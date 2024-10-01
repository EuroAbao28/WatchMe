import { createContext, useContext, useEffect, useState } from "react";
import { useGetHome } from "../hooks/useAnimeHook";
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";
import { URL_ACTIVITY_STATS } from "../utils/APIRoutes";
import { io } from "socket.io-client";

export const socket = io("https://watchme-ia87.onrender.com/");

const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const [userID, setUseID] = useState(sessionStorage.getItem("userID"));

  const [visits, setVisits] = useState(null);
  const [watched, setWatched] = useState(null);
  const [activeUsers, setActiveUsers] = useState(null);

  const { homeData, isHomeLoading, isHomeError } = useGetHome();
  const [currentVideoData, setCurrentVideoData] = useState({});
  const [currentServerCategory, setCurrentServerCategory] = useState({
    server: "hd-1",
    category: "sub",
  });

  // useEffect(() => {
  //   if (!userID) {
  //     let randomNumber = Math.floor(10000000 + Math.random() * 90000000);

  //     setUseID(randomNumber);

  //     sessionStorage.setItem("userID", randomNumber);
  //   }
  // }, []);

  const getActivityStats = async () => {
    console.log("GET ACTIVITY CALLED");
    try {
      const response = await axios.post(`${URL_ACTIVITY_STATS}/visits`);

      console.log(response.data);

      setVisits(response.data.visits);
      setWatched(response.data.watched);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("SOCKET USE EFFECT RUNNING");
    getActivityStats();

    socket.on("updateVisits", () => {
      getActivityStats();
    });

    socket.on("activeUsers", (activeUsers) => {
      setActiveUsers(activeUsers);
    });

    socket.on("setUpdateWatched", () => {
      setWatched((prev) => prev + 1);
    });

    // Cleanup only the specific events on component unmount
    return () => {
      socket.off("updateVisits");
      socket.off("activeUsers");
      socket.off("setUpdateWatched");
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
        watched,
        setWatched,
      }}>
      {children}
    </AnimeContext.Provider>
  );
};

export const useAnimeContext = () => useContext(AnimeContext);
