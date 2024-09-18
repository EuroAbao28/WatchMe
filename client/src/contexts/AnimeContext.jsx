import { createContext, useContext } from "react";
import { useGetHome } from "../hooks/useAnimeHook";
import LoadingScreen from "../components/LoadingScreen";

const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const { homeData, isHomeLoading, isHomeError } = useGetHome();

  if (isHomeLoading || isHomeError)
    return <LoadingScreen errorHook={isHomeError} />;

  return (
    <AnimeContext.Provider value={{ homeData, isHomeLoading, isHomeError }}>
      {children}
    </AnimeContext.Provider>
  );
};

export const useAnimeContext = () => useContext(AnimeContext);
