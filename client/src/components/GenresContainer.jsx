import React from "react";
import { Link } from "react-router-dom";
import TextHeader from "./TextHeader";
import classNames from "classnames";

function GenresContainer({ data, isForSide = true }) {
  return (
    <div className="p-4 rounded-md bg-gray-500/5 outline outline-1 outline-gray-500/20">
      <TextHeader text={"Genres"} />

      <div
        className={classNames(
          "grid grid-cols-3 mt-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
          {
            " xl:grid-cols-2": isForSide,
            " xl:grid-cols-7": !isForSide,
          }
        )}>
        {data.map((item, index) => (
          <Link
            to={`/genre/${item.toLowerCase().replace(/ /g, "-")}`}
            key={item}
            className="p-2 text-sm rounded hover:bg-gray-500/10">
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GenresContainer;
