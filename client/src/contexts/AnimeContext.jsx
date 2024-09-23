import { createContext, useContext, useState } from "react";
import { useGetHome } from "../hooks/useAnimeHook";
import LoadingScreen from "../components/LoadingScreen";

const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const { homeData, isHomeLoading, isHomeError } = useGetHome();
  const [currentVideoData, setCurrentVideoData] = useState({});

  if (isHomeLoading) return <LoadingScreen errorHook={isHomeError} />;

  return (
    <AnimeContext.Provider
      value={{
        homeData,
        isHomeLoading,
        isHomeError,
        currentVideoData,
        setCurrentVideoData,
      }}>
      {children}
    </AnimeContext.Provider>
  );
};

export const useAnimeContext = () => useContext(AnimeContext);
