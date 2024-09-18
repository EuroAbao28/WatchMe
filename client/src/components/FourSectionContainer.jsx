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
      <VerticalListContainer header={"Top Airing"} data={topAiringData} />

      <VerticalListContainer header={"Most Popular"} data={mostPopularData} />

      <VerticalListContainer header={"Most Favorite"} data={mostFavorite} />

      <VerticalListContainer
        header={"Latest Completed"}
        data={latestCompleted}
      />
    </div>
  );
}

export default FourSectionContainer;
