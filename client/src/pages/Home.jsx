import React from "react";
import HomeCover from "../components/HomeCover";
import { HOME_DATA } from "../utils/DUMMY";
import ScrollYContainer from "../components/ScrollYContainer";
import FourSectionContainer from "../components/FourSectionContainer";
import Top10AnimeContainer from "../components/Top10AnimeContainer";
import GenresContainer from "../components/GenresContainer";

function Home() {
  return (
    <>
      <HomeCover />

      <div className="mt-12 md:mx-6">
        <div className="flex items-start gap-12 max-xl:flex-col">
          <div className="xl:w-[55rem] w-full flex flex-col gap-y-12">
            <ScrollYContainer
              header={"Trending Series"}
              data={HOME_DATA.trendingAnimes}
            />

            <ScrollYContainer
              header={"New Episodes"}
              data={HOME_DATA.latestEpisodeAnimes}
            />

            <FourSectionContainer
              topAiringData={HOME_DATA.topAiringAnimes}
              mostPopularData={HOME_DATA.mostPopularAnimes}
              mostFavorite={HOME_DATA.mostFavoriteAnimes}
              latestCompleted={HOME_DATA.latestCompletedAnimes}
            />
          </div>

          <div className="flex flex-col flex-1 gap-12 lg:w-full max-md:mx-6">
            <Top10AnimeContainer data={HOME_DATA.top10Animes} />

            <GenresContainer data={HOME_DATA.genres} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
