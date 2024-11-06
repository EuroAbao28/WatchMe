import { createContext, useContext, useEffect, useState } from "react";
import { useGetHome } from "../hooks/useAnimeHook";
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";
import { URL_ACTIVITY_STATS, URL_USER_AUTH } from "../utils/APIRoutes";
import { io } from "socket.io-client";

export const socket = io("https://watchme-ia87.onrender.com/");
// export const socket = io("http://localhost:5000");

const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const [visits, setVisits] = useState(null);
  const [watched, setWatched] = useState(null);
  const [activeUsers, setActiveUsers] = useState(null);
  const [activityLoader, setActivityLoader] = useState(true);

  const { homeData, isHomeLoading, isHomeError } = useGetHome();
  const [currentVideoData, setCurrentVideoData] = useState({});
  const [currentServerCategory, setCurrentServerCategory] = useState({
    server: "hd-1",
    category: "sub",
  });

  const getActivityStats = async () => {
    try {
      const response = await axios.post(`${URL_ACTIVITY_STATS}/visits`);

      setVisits(response.data.visits);
      setWatched(response.data.watched);

      setActivityLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
        activityLoader,
      }}>
      {children}
    </AnimeContext.Provider>
  );
};

export const useAnimeContext = () => useContext(AnimeContext);
