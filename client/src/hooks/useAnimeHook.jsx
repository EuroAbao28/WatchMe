import { useEffect, useState } from "react";
import axios from "axios";
import {
  URL_BASE,
  URL_GET_EPISDOES,
  URL_GET_GENRE,
  URL_GET_HOME,
  URL_GET_INFO,
  URL_GET_SEARCH_RESULT,
  URL_GET_SERVER,
  URL_GET_STREAM_LINK,
} from "../utils/APIRoutes";
import { useAnimeContext } from "../contexts/AnimeContext";

export const useGetHome = () => {
  const [homeData, setHomeData] = useState({});
  const [isHomeLoading, setIsHomeLoading] = useState(true);
  const [isHomeError, setIsHomeError] = useState(null);

  const getHome = async () => {
    if (!isHomeLoading) setIsHomeLoading(true);
    if (isHomeError) setIsHomeError(null);
    try {
      const { data } = await axios.get(URL_GET_HOME);

      setHomeData(data);
      setIsHomeLoading(false);

      // console.log("HOME DATA: ", data);
    } catch (error) {
      setIsHomeError(error);
      setIsHomeLoading(false);
      // console.log(error);
    }
  };

  useEffect(() => {
    getHome();
  }, []);

  return { homeData, isHomeLoading, isHomeError };
};

export const useGetInfo = (id) => {
  const [infoData, setInfoData] = useState({});
  const [isInfoLoading, setIsInfoLoading] = useState(true);
  const [isInfoError, setIsInfoError] = useState(null);

  const getInfo = async () => {
    if (!isInfoLoading) setIsInfoLoading(true);
    try {
      const { data } = await axios.get(URL_GET_INFO, {
        params: {
          id,
        },
      });

      // getting the episodes
      const episodes = await axios.get(
        `${URL_GET_EPISDOES}/${data.anime.info.id}`
      );

      const combinedData = { ...data, episodesData: episodes.data };

      setInfoData(combinedData);
      setIsInfoLoading(false);

      // console.log("INFO DATA: ", combinedData);
    } catch (error) {
      setIsInfoError(error);
      setIsInfoLoading(false);
      // console.log(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, [id]);

  return { infoData, isInfoLoading, isInfoError };
};

export const useGetStreamLink = (payload) => {
  const [streamData, setStreamData] = useState({});
  const [isStreamLoading, setIsStreamLoading] = useState(true);
  const [isStreamError, setIsStreamError] = useState(null);
  const { setCurrentVideoData } = useAnimeContext();

  const getStreamLink = async () => {
    // console.log("STREAM PARAMS: ", payload);

    setCurrentVideoData({});
    if (!isStreamLoading) setIsStreamLoading(true);
    if (isStreamError) setIsStreamError(null);

    try {
      const { data } = await axios.get(URL_GET_STREAM_LINK, {
        params: {
          id: payload.episodeId,
          server:
            payload.server ||
            episodeServer.data.sub[0].serverName ||
            episodeServer.data.dub[0].serverName,
          category: payload.category || "sub",
        },
      });

      if(data.sources.length === 0){
        throw new Error();
      }

      setStreamData(data);
      setIsStreamLoading(false);

      // set the data to context
      setCurrentVideoData(data);

      // console.log("STREAM DATA: ", data);
    } catch (error) {
      setIsStreamError(error);
      setIsStreamLoading(false);
      // console.log(error);
    }
  };

  useEffect(() => {
    getStreamLink();
  }, [payload.episodeId, payload.server, payload.category]);

  return { streamData, isStreamLoading, isStreamError };
};

export const useGetServer = () => {
  const [serverData, setServerData] = useState({});
  const [isServerLoading, setIsServerLoading] = useState(true);
  const [isServerError, setIsServerError] = useState(null);

  const getServer = async (episodeId) => {
    // console.log("STREAM PARAMS: ", payload);

    setServerData({});
    if (!isServerLoading) setIsServerLoading(true);
    if (isServerError) setIsServerError(null);

    try {
      const { data } = await axios.get(URL_GET_SERVER, {
        params: {
          episodeId: episodeId,
        },
      });

      setServerData(data);
      setIsServerLoading(false);

      // console.log("SERVER DATA: ", data);
    } catch (error) {
      setIsServerError(error);
      setIsServerLoading(false);
      // console.log(error);
    }
  };

  return { getServer, serverData, isServerLoading, isServerError };
};

export const useGetCategory = (payload) => {
  const [categoryData, setCategoryData] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [isCategoryError, setIsCategoryError] = useState(null);

  const getCategory = async () => {
    if (!isCategoryLoading) setIsCategoryLoading(true);

    const { data } = await axios.get(`${URL_BASE}/${payload.category}`, {
      params: {
        page: payload.page,
      },
    });

    setCategoryData(data);
    setIsCategoryLoading(false);

    // console.log("CATEGORY DATA: ", data);
    try {
    } catch (error) {
      setIsCategoryError(error);
      setIsCategoryLoading(false);
      // console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, [payload.categoy, payload.page]);

  return { categoryData, isCategoryLoading, isCategoryError };
};

export const useGetGenre = (payload) => {
  const [genreData, setGenreData] = useState([]);
  const [isGenreLoading, setIsGenreLoading] = useState(true);
  const [isGenreError, setIsGenreError] = useState(null);

  const getGenre = async () => {
    if (!isGenreLoading) setIsGenreLoading(true);

    const { data } = await axios.get(`${URL_GET_GENRE}/${payload.genre}`, {
      params: {
        page: payload.page,
      },
    });

    setGenreData(data);
    setIsGenreLoading(false);

    // console.log("GENRE DATA: ", data);

    try {
    } catch (error) {
      setIsGenreError(error);
      setIsGenreLoading(false);
      // console.log(error);
    }
  };

  useEffect(() => {
    getGenre();
  }, [payload.genre, payload.page]);

  return { genreData, isGenreLoading, isGenreError };
};

export const useGetSearchResult = () => {
  const [searchResultData, setSearchResultData] = useState({});
  const [isSearchResultLoading, setIsSearchResultLoading] = useState(false);
  const [isSearchResultError, setIsSearchResultError] = useState(null);

  const getSearchResult = async (params) => {
    if (!isSearchResultLoading) setIsSearchResultLoading(true);

    // console.log("PARAMS: ", params);

    try {
      const { data } = await axios.get(URL_GET_SEARCH_RESULT, { params });

      setSearchResultData(data);
      setIsSearchResultLoading(false);

      // console.log("SEARCH RESULT DATA: ", data);
    } catch (error) {
      setIsSearchResultError(error);
      setIsSearchResultLoading(false);
      // console.log(error);
    }
  };

  return {
    getSearchResult,
    searchResultData,
    isSearchResultLoading,
    isSearchResultError,
  };
};
