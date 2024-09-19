import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { IoPlay } from "react-icons/io5";
import { Link } from "react-router-dom";
import { removeHtmlTags } from "../utils/Helpers";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { BsCcSquareFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa6";

function HomeCover({ data }) {
  const [currentData, setCurrentData] = useState(data[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (data.length > 1) {
      // Set up an interval to update the index
      const interval = setInterval(() => {
        setFade(false);

        // Count from 0 to 10, then loop
        setCurrentData((prevData) => {
          const currentIndex = data.indexOf(prevData);
          const nextIndex = (currentIndex + 1) % data.length;
          return data[nextIndex];
        });
        setFade(true);
      }, 5000); // second delay

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${currentData.poster})`,
      }}
      className={classNames(
        "min-h-[20rem] flex flex-col md:mx-6 lg:h-[30rem] transition-all duration-1000 ease-in-out bg-cover bg-center md:rounded-md overflow-hidden",
        {
          "opacity-100": fade,
          "opacity-0": !fade,
        }
      )}>
      <div className="flex flex-col items-start justify-end flex-1 pt-20 pb-6 pl-6 lg:pl-12 lg:pb-12 bg-gradient-to-r from-gray-950/90 via-gray-950/80 to-gray-950/60">
        <p className="font-semibold text-rose-500">{`#${currentData.rank} Spotlight`}</p>

        <h1 className=" text-3xl font-extrabold w-[90%] sm:w-[70%] md:w-[65%] lg:w-[50%]">
          {currentData.name}
        </h1>

        <p className="max-lg:hidden w-[70%] line-clamp-3 overflow-y-auto mt-4 scrollbar-hidden">
          {removeHtmlTags(currentData.description)}
        </p>

        <div className="hidden gap-2 mt-2 md:flex">
          <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-gray-300 rounded text-gray-950">
            <IoPlay />
            <p>{currentData.otherInfo[0]}</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-gray-300 rounded text-gray-950">
            <MdOutlineAccessTimeFilled />
            <p>{currentData.otherInfo[1]}</p>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-gray-300 rounded text-gray-950">
            <BsCcSquareFill />
            <p>{currentData.episodes.sub}</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-gray-300 rounded text-gray-950">
            <FaMicrophone />
            <p>{currentData.episodes.dub || 0}</p>
          </div>
        </div>

        <button className="px-4 py-2 mt-6 text-xl font-bold rounded-lg bg-rose-500 text-gray-950">
          Watch Now
        </button>
      </div>
    </div>
  );
}

export default HomeCover;
