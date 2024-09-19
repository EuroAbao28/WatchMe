import React from "react";
import VerticalListContainer from "./VerticalListContainer";

function FourSectionContainer({
  topAiringData,
  mostPopularData,
  mostFavorite,
  latestCompleted,
}) {
  return (
    <div className="grid grid-cols-1 max-md:gap-x-6 gap-x-12 gap-y-12 sm:grid-cols-2 max-md:mx-6">
      <VerticalListContainer
        header={"Top Airing"}
        data={topAiringData}
        path={"top-airing"}
      />

      <VerticalListContainer
        header={"Most Popular"}
        data={mostPopularData}
        path={"most-popular"}
      />

      <VerticalListContainer
        header={"Most Favorite"}
        data={mostFavorite}
        path={"most-favorite"}
      />

      <VerticalListContainer
        header={"Latest Completed"}
        data={latestCompleted}
        path={"completed"}
      />
    </div>
  );
}

export default FourSectionContainer;
