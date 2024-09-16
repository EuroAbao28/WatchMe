import React from "react";
import WatchCover from "../components/WatchCover";
import { HOME_DATA, INFO_DATA } from "../utils/DUMMY";
import ScrollYContainer from "../components/ScrollYContainer";
import DetailsContainer from "../components/watch/DetailsContainer";
import GenresContainer from "../components/GenresContainer";

function Watch() {
  return (
    <>
      <WatchCover data={INFO_DATA.anime.info} />

      <div className="flex flex-col mt-12 md:mx-6 gap-y-12">
        <DetailsContainer header={"Details to"} data={INFO_DATA.anime} />

        <ScrollYContainer
          header={"Related Series"}
          data={INFO_DATA.relatedAnimes}
        />

        <ScrollYContainer
          header={"Suggested for you"}
          data={INFO_DATA.recommendedAnimes}
        />

        <GenresContainer data={HOME_DATA.genres} isForSide={false} />
      </div>
    </>
  );
}

export default Watch;
