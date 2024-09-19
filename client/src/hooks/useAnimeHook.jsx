import { useEffect, useState } from "react";
import axios from "axios";
import {
  URL_BASE,
  URL_GET_EPISDOES,
  URL_GET_GENRE,
  URL_GET_HOME,
  URL_GET_INFO,
  URL_GET_SERVER,
  URL_GET_STREAM_LINK,
} from "../utils/APIRoutes";

export const useGetHome = () => {
  const [homeData, setHomeData] = useState({});
  const [isHomeLoading, setIsHomeLoading] = useState(true);
  const [isHomeError, setIsHomeError] = useState(null);

  const getHome = async () => {
    if (!isHomeLoading) setIsHomeLoading(true);
    try {
      const { data } = await axios.get(URL_GET_HOME);

      setHomeData(data);
      setIsHomeLoading(false);
    } catch (error) {
      setIsHomeError(error);
      setIsHomeLoading(false);
      console.log(error);
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
    } catch (error) {
      setIsInfoError(error);
      setIsInfoLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, [id]);

  return { infoData, isInfoLoading, isInfoError };
};

export const useGetStreamLink = (episodeId) => {
  const [streamData, setStreamData] = useState({});
  const [isStreamLoading, setIsStreamLoading] = useState(true);
  const [isStreamError, setIsStreamError] = useState(null);

  const getStreamLink = async () => {
    if (!isStreamLoading) setIsStreamLoading(true);
    try {
      const { data } = await axios.get(URL_GET_STREAM_LINK, {
        params: {
          id: episodeId,
        },
      });

      const episodeServer = await axios.get(URL_GET_SERVER, {
        params: {
          episodeId: episodeId,
        },
      });

      const combinedData = { ...data, episodeServer: episodeServer.data };

      setStreamData(combinedData);
      setIsStreamLoading(false);
    } catch (error) {
      setIsStreamError(error);
      setIsStreamLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getStreamLink();
  }, [episodeId]);

  return { streamData, isStreamLoading, isStreamError };
};

export const useGetCategory = (payload) => {
  const [categoryData, setCategoryData] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [isCategoryError, setIsCategoryError] = useState(null);

  const getCategory = async () => {
    const { data } = await axios.get(`${URL_BASE}/${payload.category}`, {
      params: {
        page: payload.page,
      },
    });

    setCategoryData(data);
    setIsCategoryLoading(false);

    console.log(data);
    try {
    } catch (error) {
      setIsCategoryError(error);
      setIsCategoryLoading(false);
      console.log(error);
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
    const { data } = await axios.get(`${URL_GET_GENRE}/${payload.genre}`, {
      params: {
        page: payload.page,
      },
    });

    setGenreData(data);
    setIsGenreLoading(false);

    console.log(data);
    try {
    } catch (error) {
      setIsGenreError(error);
      setIsGenreLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getGenre();
  }, [payload.genre, payload.page]);

  return { genreData, isGenreLoading, isGenreError };
};
