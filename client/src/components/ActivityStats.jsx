import React from "react";
import TextHeader from "./TextHeader";
import { useAnimeContext } from "../contexts/AnimeContext";
import CountUp from "react-countup";

function ActivityStats() {
  const { visits, watched, activeUsers } = useAnimeContext();

  return (
    <div className="p-6 rounded-md md:bg-gray-500/5 md:outline outline-1 outline-gray-500/20">
      <TextHeader text={"Activity Stats"} />

      <div className="flex gap-4 mt-4">
        <div className="flex flex-col items-center justify-center flex-1 py-4 text-orange-500 rounded cursor-default hover:bg-orange-500/10 bg-orange-500/5 outline outline-1 outline-orange-500/20">
          <p className="font-extrabold ">
            <CountUp start={0} end={visits} duration={5} />
          </p>
          <p className="text-xs font-semibold ">Visits</p>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 py-4 text-green-500 rounded cursor-default hover:bg-green-500/10 bg-green-500/5 outline outline-1 outline-green-500/20">
          <p className="font-extrabold ">
            <CountUp start={0} end={activeUsers} duration={5} />
          </p>
          <p className="text-xs font-semibold ">Active</p>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 py-4 text-indigo-500 rounded cursor-default hover:bg-indigo-500/10 bg-indigo-500/5 outline outline-1 outline-indigo-500/20">
          <p className="font-extrabold ">
            <CountUp start={0} end={watched} duration={5} />
          </p>
          <p className="text-xs font-semibold ">Watched</p>
        </div>
      </div>
    </div>
  );
}

export default ActivityStats;
