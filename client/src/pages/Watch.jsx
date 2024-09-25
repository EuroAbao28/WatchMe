import React, { useEffect, useState } from "react";
import WatchCover from "../components/WatchCover";
import ScrollXContainer from "../components/ScrollXContainer";
import DetailsContainer from "../components/watch/DetailsContainer";
import GenresContainer from "../components/GenresContainer";
import { useGetInfo, useGetServer } from "../hooks/useAnimeHook";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { useAnimeContext } from "../contexts/AnimeContext";
import EpisodesContainer from "../components/watch/EpisodesContainer";
import VideoPlayer from "../components/watch/VideoPlayer";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { BsCcSquareFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa6";
import classNames from "classnames";

function Watch() {
  const { id } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const episode = searchParams.get("ep");
  const episodeId = location.pathname.split("/watch/")[1] + location.search;

  const {
    homeData,
    currentVideoData,
    currentServerCategory,
    setCurrentServerCategory,
  } = useAnimeContext();
  const { infoData, isInfoLoading, isInfoError } = useGetInfo(id);
  const { getServer, serverData } = useGetServer(episodeId);

  useEffect(() => {
    if (episode) {
      getServer(episodeId);
    }
  }, [episodeId]);

  // reset the server to hd-1
  useEffect(() => {
    return () => {
      setCurrentServerCategory({
        server: "hd-1",
        category: "sub",
      });
    };
  }, [id]);

  // getting the isStreamLoading from VideoPlayer.jsx
  const [isGetStreamLoading, setIsGetStreamLoading] = useState(null);
  const handleGetSreamLoading = (state) => {
    setIsGetStreamLoading(state);
  };

  const handleChangeEpisode = (direction) => {
    if (!currentVideoData.anilistID)
      setCurrentServerCategory({
        server: "hd-1",
        category: "sub",
      });

    const currentEpIndex = infoData.episodesData.episodes.findIndex(
      (episode) => episode.episodeId === episodeId
    );

    if (direction === "prev") {
      if (currentEpIndex > 0) {
        navigate(
          `/watch/${
            infoData.episodesData.episodes[currentEpIndex - 1].episodeId
          }`
        );
      }
    }

    if (direction === "next") {
      if (currentEpIndex + 1 < infoData.episodesData.totalEpisodes) {
        navigate(
          `/watch/${
            infoData.episodesData.episodes[currentEpIndex + 1].episodeId
          }`
        );
      }
    }
  };

  const handleChangeServer = (data) => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 200);

    setCurrentServerCategory(data);
  };

  if (isInfoLoading || isInfoError)
    return <LoadingScreen errorHook={isInfoError} />;

  return (
    <>
      {episode ? (
        <>
          <VideoPlayer
            data={infoData}
            isGetStreamLoading={handleGetSreamLoading}
          />

          <div className="flex flex-1 p-6 md:mt-6 md:rounded-md md:mx-6 lg:items-center gap-x-12 max-lg:flex-col-reverse bg-gray-500/5 sm:outline outline-1 outline-gray-500/20 ">
            <h1 className="flex-1 text-lg font-semibold">
              {infoData.anime.info.name}
            </h1>

            <div className="hidden mt-6 mb-4 border-b border-gray-500/10 max-lg:block"></div>

            <div className="flex items-center justify-between gap-6">
              <button
                onClick={() => handleChangeEpisode("prev")}
                disabled={isGetStreamLoading}
                className={classNames(
                  "px-4 py-1.5 text-xl transition-all rounded  hover:bg-gray-500/10 bg-gray-500/5  outline outline-1 outline-gray-500/20 active:scale-95",
                  {
                    "text-rose-500": !isGetStreamLoading,
                    "text-gray-500/20 cursor-wait": isGetStreamLoading,
                  }
                )}>
                <LuChevronLeft />
              </button>
              <p className="font-semibold">
                {`Ep. ${
                  infoData.episodesData.episodes.filter(
                    (item) => item.episodeId === episodeId
                  )[0].number
                }`}
              </p>

              <button
                onClick={() => handleChangeEpisode("next")}
                disabled={isGetStreamLoading}
                className={classNames(
                  "px-4 py-1.5 text-xl transition-all rounded  hover:bg-gray-500/10 bg-gray-500/5  outline outline-1 outline-gray-500/20 active:scale-95",
                  {
                    "text-rose-500": !isGetStreamLoading,
                    "text-gray-500/20 cursor-wait": isGetStreamLoading,
                  }
                )}>
                <LuChevronRight />
              </button>
            </div>
          </div>
        </>
      ) : (
        <WatchCover
          data={infoData.anime}
          epToWatch={
            infoData.episodesData.episodes.length > 0 &&
            infoData.episodesData.episodes[0].episodeId
          }
        />
      )}

      <div className="flex flex-col mt-6 md:mx-6 gap-y-12">
        <div className="flex flex-row-reverse items-start gap-6 max-sm:gap-6 max-xl:flex-col">
          <EpisodesContainer
            header={"All Episodes"}
            data={infoData.episodesData}
          />

          <div className="flex flex-col flex-1 w-full gap-6 ">
            {episode && (
              <div className="flex overflow-hidden rounded-md max-md:mx-6 max-md:flex-col-reverse outline outline-1 outline-gray-500/20 bg-gray-500/5">
                <p className="w-[30%] max-md:w-full text-sm font-semibold flex justify-center items-center p-4 md:p-6 bg-gray-500/5 text-center">
                  If current server doesn't work please try other servers.
                </p>

                <div className="flex flex-col flex-1 gap-4 py-4">
                  <div className="flex items-center gap-4 px-4 md:gap-8 md:px-8">
                    <div className="flex items-center gap-2 py-2 text-xs font-bold">
                      <BsCcSquareFill className="text-rose-500" />
                      <p className="text-nowrap">SUB :</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                      {serverData.sub && (
                        <>
                          {serverData?.sub.map((item, index) => (
                            <p
                              key={index}
                              onClick={() =>
                                handleChangeServer({
                                  server: item.serverName,
                                  category: "sub",
                                })
                              }
                              className={`px-2 py-1 active:scale-95 transition-all cursor-pointer text-sm font-bold uppercase rounded-sm text-nowrap md:px-4 outline outline-1  ${
                                item.serverName ===
                                  currentServerCategory.server &&
                                currentServerCategory.category === "sub"
                                  ? "outline-rose-500/20 bg-rose-500/5 text-rose-500"
                                  : "outline-gray-500/20 bg-gray-500/5 hover:bg-gray-500/10"
                              }`}>
                              {item.serverName}
                            </p>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="border-b border-gray-500/20"></div>

                  <div className="flex items-center gap-4 px-4 md:gap-8 md:px-8">
                    <div className="flex items-center gap-2 py-2 text-xs font-bold">
                      <FaMicrophone className="text-rose-500" />
                      <p className="text-nowrap">DUB :</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                      {serverData.dub && (
                        <>
                          {serverData?.dub.map((item, index) => (
                            <p
                              key={index}
                              onClick={() =>
                                handleChangeServer({
                                  server: item.serverName,
                                  category: "dub",
                                })
                              }
                              className={`px-2 active:scale-95 transition-all py-1 cursor-pointer text-sm font-bold uppercase rounded-sm text-nowrap md:px-4 outline outline-1  ${
                                item.serverName ===
                                  currentServerCategory.server &&
                                currentServerCategory.category === "dub"
                                  ? "outline-rose-500/20 bg-rose-500/5 text-rose-500"
                                  : "outline-gray-500/20 hover:bg-gray-500/10 bg-gray-500/5"
                              }`}>
                              {item.serverName}
                            </p>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DetailsContainer header={"Details"} data={infoData.anime} />
          </div>
        </div>

        {/* ANIMES GRID */}

        <div className="border-b border-gray-500/10 max-sm:mx-6"></div>

        {infoData.seasons.length > 0 && (
          <ScrollXContainer
            header={"Other Seasons"}
            nameOrTitle="title"
            data={infoData.seasons}
          />
        )}

        <ScrollXContainer
          header={"Related Series"}
          data={infoData.relatedAnimes}
        />

        <ScrollXContainer
          header={"Suggested for you"}
          data={infoData.recommendedAnimes}
        />

        <div className="max-md:mx-6">
          <GenresContainer data={homeData.genres} isForSide={false} />
        </div>
      </div>
    </>
  );
}

export default Watch;
