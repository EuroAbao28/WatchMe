import React from "react";
import DetailsTag from "./DetailsTag";
import TextHeader from "../TextHeader";
import { Link } from "react-router-dom";

function DetailsContainer({ header, data }) {
  return (
    <div className="flex-1 w-full p-6 xl:min-h-[20rem] rounded-md md:bg-gray-500/5 md:outline outline-gray-500/20 outline-1">
      <TextHeader text={header} />

      <div className="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-y-2 gap-x-12">
        <div className="flex flex-col gap-2">
          <DetailsTag tag={"Japanese"} desc={data.moreInfo.japanese} />

          <DetailsTag tag={"Synonyms"} desc={data.moreInfo.synonyms} />

          <DetailsTag tag={"Aired"} desc={data.moreInfo.aired} />

          <DetailsTag tag={"Premiered"} desc={data.moreInfo.premiered} />

          <DetailsTag tag={"Status"} desc={data.moreInfo.status} />
        </div>

        <div className="flex flex-col gap-2">
          <DetailsTag tag={"Duration"} desc={data.moreInfo.duration} />

          <DetailsTag tag={"Rating"} desc={data.moreInfo.malscore} />

          <DetailsTag tag={"Studios"} desc={data.moreInfo.studios} />

          <DetailsTag tag={"Producers"} desc={data.moreInfo.producers} />

          <div className="flex gap-2 ">
            <p className="font-semibold min-w-24 sm:min-w-28">Genre:</p>
            <div className="flex flex-wrap items-center gap-2">
              {data.moreInfo.genres.map((item, index) => (
                <Link
                  key={index}
                  className="px-2 text-sm rounded bg-gray-500/5 outline-1 outline outline-gray-500/20">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsContainer;
