import React from "react";
import HomeCover from "../components/HomeCover";
import ScrollXContainer from "../components/ScrollXContainer";
import FourSectionContainer from "../components/FourSectionContainer";
import Top10AnimeContainer from "../components/Top10AnimeContainer";
import GenresContainer from "../components/GenresContainer";
import { useAnimeContext } from "../contexts/AnimeContext";

function Home() {
  const { homeData } = useAnimeContext();

  return (
    <>
      <HomeCover data={homeData.spotlightAnimes} />

      <div className="mt-12 md:mx-6">
        <div className="flex gap-12 max-xl:flex-col ">
          <div className="xl:w-[55rem] w-full flex flex-col gap-y-12">
            <ScrollXContainer
              header={"Trending Series"}
              data={homeData.trendingAnimes}
            />

            <ScrollXContainer
              header={"New Episodes"}
              data={homeData.latestEpisodeAnimes}
            />

            <FourSectionContainer
              topAiringData={homeData.topAiringAnimes}
              mostPopularData={homeData.mostPopularAnimes}
              mostFavorite={homeData.mostFavoriteAnimes}
              latestCompleted={homeData.latestCompletedAnimes}
            />
          </div>

          <div className="flex flex-col flex-1 gap-12 lg:w-full max-md:mx-6">
            <Top10AnimeContainer data={homeData.top10Animes} />

            <GenresContainer data={homeData.genres} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
