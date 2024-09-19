import React from "react";
import WatchCover from "../components/WatchCover";
import ScrollXContainer from "../components/ScrollXContainer";
import DetailsContainer from "../components/watch/DetailsContainer";
import GenresContainer from "../components/GenresContainer";
import { useGetInfo } from "../hooks/useAnimeHook";
import { useParams, useSearchParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { useAnimeContext } from "../contexts/AnimeContext";
import EpisodesContainer from "../components/watch/EpisodesContainer";
import VideoPlayer from "../components/watch/VideoPlayer";

function Watch() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const episode = searchParams.get("ep");

  const { homeData } = useAnimeContext();
  const { infoData, isInfoLoading, isInfoError } = useGetInfo(id);

  if (isInfoLoading) return <LoadingScreen errorHook={isInfoError} />;

  if (infoData) console.log(infoData);

  return (
    <>
      {episode ? (
        <VideoPlayer data={infoData} />
      ) : (
        <WatchCover
          data={infoData.anime}
          epToWatch={infoData.episodesData.episodes[0].episodeId}
        />
      )}

      <div className="flex flex-col mt-12 md:mx-6 gap-y-12">
        <div className="flex flex-row-reverse items-start gap-12 max-sm:gap-6 max-xl:flex-col">
          <EpisodesContainer
            header={"All Episodes"}
            data={infoData.episodesData}
          />

          <DetailsContainer header={"Details"} data={infoData.anime} />
        </div>

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

        <GenresContainer data={homeData.genres} isForSide={false} />
      </div>
    </>
  );
}

export default Watch;
