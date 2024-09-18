import { useEffect, useState } from "react";
import axios from "axios";
import {
  URL_GET_EPISDOES,
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
    setIsHomeLoading(true);
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
    setIsInfoLoading(true);
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
    setIsStreamLoading(true);
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
