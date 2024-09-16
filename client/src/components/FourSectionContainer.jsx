import React from "react";
import CenteredContainer from "../components/CenteredContainer";
import Header from "../components/Header";
import HomeCover from "../components/HomeCover";
import { HOME_DATA } from "../utils/DUMMY";
import Footer from "../components/Footer";
import ScrollUpButton from "../components/ScrollUpButton";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import { BsCcSquareFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa6";
import { LuChevronsDown } from "react-icons/lu";
import ScrollYContainer from "../components/ScrollYContainer";
import TextHeader from "./TextHeader";

function FourSectionContainer({
  topAiringData,
  mostPopularData,
  mostFavorite,
  latestCompleted,
}) {
  return (
    <div className="grid grid-cols-1 max-md:gap-x-6 gap-x-12 gap-y-12 sm:grid-cols-2 max-md:mx-6">
      <div className="p-4 rounded-md bg-gray-500/5 outline outline-1 outline-gray-500/20">
        <TextHeader text={"Top Airing"} />

        <div className="relative flex flex-col pb-6 mt-4">
          {topAiringData.slice(0, 5).map((item, index) => (
            <Link
              to={`/watch/${item.id}`}
              key={index}
              className="flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-500/10">
              <div className="w-14 aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src={item.poster}
                  alt={item.id}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex flex-col flex-1 gap-2">
                <p className="text-sm font-semibold line-clamp-2">
                  {item.name}
                </p>

                <ul className="flex gap-1">
                  <li className="flex items-center gap-1 px-1 text-xs font-semibold bg-gray-300 rounded-sm text-gray-950">
                    <BsCcSquareFill />
                    <p>{item.episodes.sub}</p>
                  </li>
                  <li className="flex items-center gap-1 px-1 text-xs font-semibold bg-gray-300 rounded-sm text-gray-950">
                    <FaMicrophone />
                    <p>{item.episodes.dub}</p>
                  </li>
                </ul>
              </div>
            </Link>
          ))}

          <div className="absolute left-0 right-0 flex items-center justify-center -bottom-11">
            <div className="rounded-full bg-gray-950 ">
              <Link onClick={() => setShowedItems((prev) => prev + 10)}>
                <div className="p-2 m-2 text-2xl transition-all rounded-full cursor-pointer hover:bg-gray-500/10 text-rose-500 active:scale-95 bg-gray-500/5 outline outline-1 outline-gray-500/20">
                  <LuChevronsDown />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-md bg-gray-500/5 outline outline-1 outline-gray-500/20">
        <TextHeader text={"Most Popular"} />

        <div className="relative flex flex-col pb-6 mt-4">
          {mostPopularData.slice(0, 5).map((item, index) => (
            <Link
              to={`/watch/${item.id}`}
              key={index}
              className="flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-500/10">
              <div className="w-14 aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src={item.poster}
                  alt={item.id}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex flex-col flex-1 gap-2">
                <p className="text-sm font-semibold line-clamp-2">
                  {item.name}
                </p>

                <ul className="flex gap-1">
                  <li className="flex items-center gap-1 px-1 text-xs font-semibold bg-gray-300 rounded-sm text-gray-950">
                    <BsCcSquareFill />
                    <p>{item.episodes.sub}</p>
                  </li>
                  <li className="flex items-center gap-1 px-1 text-xs font-semibold bg-gray-300 rounded-sm text-gray-950">
                    <FaMicrophone />
                    <p>{item.episodes.dub}</p>
                  </li>
                </ul>
              </div>
            </Link>
          ))}

          <div className="absolute left-0 right-0 flex items-center justify-center -bottom-11">
            <div className="rounded-full bg-gray-950 ">
              <Link onClick={() => setShowedItems((prev) => prev + 10)}>
                <div className="p-2 m-2 text-2xl transition-all rounded-full cursor-pointer hover:bg-gray-500/10 text-rose-500 active:scale-95 bg-gray-500/5 outline outline-1 outline-gray-500/20">
                  <LuChevronsDown />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-md bg-gray-500/5 outline outline-1 outline-gray-500/20">
        <TextHeader text={"Most Favorite"} />

        <div className="relative flex flex-col pb-6 mt-4">
          {mostFavorite.slice(0, 5).map((item, index) => (
            <Link
              to={`/watch/${item.id}`}
              key={index}
              className="flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-500/10">
              <div className="w-14 aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src={item.poster}
                  alt={item.id}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex flex-col flex-1 gap-2">
                <p className="text-sm font-semibold line-clamp-2">
                  {item.name}
                </p>

                <ul className="flex gap-1">
                  <li className="flex items-center gap-1 px-1 text-xs font-semibold bg-gray-300 rounded-sm text-gray-950">
                    <BsCcSquareFill />
                    <p>{item.episodes.sub}</p>
                  </li>
                  <li className="flex items-center gap-1 px-1 text-xs font-semibold bg-gray-300 rounded-sm text-gray-950">
                    <FaMicrophone />
                    <p>{item.episodes.dub}</p>
                  </li>
                </ul>
              </div>
            </Link>
          ))}

          <div className="absolute left-0 right-0 flex items-center justify-center -bottom-11">
            <div className="rounded-full bg-gray-950 ">
              <Link onClick={() => setShowedItems((prev) => prev + 10)}>
                <div className="p-2 m-2 text-2xl transition-all rounded-full cursor-pointer hover:bg-gray-500/10 text-rose-500 active:scale-95 bg-gray-500/5 outline outline-1 outline-gray-500/20">
                  <LuChevronsDown />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-md bg-gray-500/5 outline outline-1 outline-gray-500/20">
        <TextHeader text={"Latest Completed"} />

        <div className="relative flex flex-col pb-6 mt-4">
          {latestCompleted.slice(0, 5).map((item, index) => (
            <Link
              to={`/watch/${item.id}`}
              key={index}
              className="flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-500/10">
              <div className="w-14 aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src={item.poster}
                  alt={item.id}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex flex-col flex-1 gap-2">
                <p className="text-sm font-semibold line-clamp-2">
                  {item.name}
                </p>

                <ul className="flex gap-1">
                  <li className="flex items-center gap-1 px-1 text-xs font-semibold bg-gray-300 rounded-sm text-gray-950">
                    <BsCcSquareFill />
                    <p>{item.episodes.sub}</p>
                  </li>
                  <li className="flex items-center gap-1 px-1 text-xs font-semibold bg-gray-300 rounded-sm text-gray-950">
                    <FaMicrophone />
                    <p>{item.episodes.dub}</p>
                  </li>
                </ul>
              </div>
            </Link>
          ))}

          <div className="absolute left-0 right-0 flex items-center justify-center -bottom-11">
            <div className="rounded-full bg-gray-950 ">
              <Link onClick={() => setShowedItems((prev) => prev + 10)}>
                <div className="p-2 m-2 text-2xl transition-all rounded-full cursor-pointer hover:bg-gray-500/10 text-rose-500 active:scale-95 bg-gray-500/5 outline outline-1 outline-gray-500/20">
                  <LuChevronsDown />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FourSectionContainer;
