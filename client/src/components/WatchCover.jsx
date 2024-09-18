import React from "react";
import { IoPlay } from "react-icons/io5";
import { removeHtmlTags } from "../utils/Helpers";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { BsCcSquareFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa6";
import { Link } from "react-router-dom";

function WatchCover({ data, epToWatch }) {
  return (
    <div
      style={{
        backgroundImage: `url(${data.poster})`,
      }}
      className="min-h-[20rem] flex flex-col md:mx-6 lg:h-[30rem] transition-all duration-1000 ease-in-out  bg-contain bg-center md:rounded-md overflow-hidden">
      <div className="flex flex-col items-start justify-end flex-1 pt-20 pb-6 pl-6 lg:pl-12 lg:pb-12 bg-gradient-to-r from-gray-950/90 via-gray-950/80 to-gray-950/60">
        <p className="font-semibold text-rose-500">{`${data.stats.rating} | ${data.stats.quality}`}</p>

        <h1 className=" text-3xl font-extrabold w-[80%] sm:w-[70%] md:w-[65%] lg:w-[50%]">
          {data.name}
        </h1>

        <div className="flex gap-2 mt-2 ">
          <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-gray-300 rounded text-gray-950">
            <IoPlay />
            <p>{data.stats.type}</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-gray-300 rounded text-gray-950">
            <MdOutlineAccessTimeFilled />
            <p>{data.stats.duration}</p>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-gray-300 rounded text-gray-950">
            <BsCcSquareFill />
            <p>{data.stats.episodes.sub || 0}</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-gray-300 rounded text-gray-950">
            <FaMicrophone />
            <p>{data.stats.episodes.dub || 0}</p>
          </div>
        </div>

        <Link
          to={`/watch/${epToWatch}`}
          className="px-4 py-2 mt-6 text-xl font-bold rounded-lg bg-rose-500 text-gray-950">
          Watch Now
        </Link>
      </div>
    </div>
  );
}

export default WatchCover;
