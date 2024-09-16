import React from "react";
import { BsCcSquareFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa6";
import { Link } from "react-router-dom";
import TextHeader from "./TextHeader";

function Top10AnimeContainer({ data }) {
  return (
    <div className="p-4 rounded-md bg-gray-500/5 outline outline-1 outline-gray-500/20">
      <TextHeader text={"Top 10 Animes"} />

      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 xl:grid-cols-1">
        {data.today.map((item, index) => (
          <Link
            to={`/watch/${item.id}`}
            key={index}
            className="flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-500/10">
            <p className="font-black">{String(item.rank).padStart(2, "0")}</p>

            <div className="w-14 aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src={item.poster}
                alt={item.id}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col flex-1 gap-2">
              <p className="text-sm font-semibold line-clamp-2">{item.name}</p>

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
      </div>
    </div>
  );
}

export default Top10AnimeContainer;
