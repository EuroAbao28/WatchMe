import React, { useRef } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import TextHeader from "./TextHeader";

const ScrollXContainer = ({ data, header }) => {
  const scrollContainerRef = useRef(null);

  // Generic scroll function
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft +=
        direction === "left"
          ? -scrollContainerRef.current.offsetWidth
          : scrollContainerRef.current.offsetWidth;
    }
  };

  return (
    <div className="px-6 rounded-md md:p-4 md:bg-gray-500/5 md:outline outline-1 outline-gray-500/20">
      <div className="flex items-center justify-between gap-4">
        <TextHeader text={header} />

        <button
          onClick={() => scroll("left")}
          className="px-4 py-1.5 text-xl ml-auto transition-all rounded text-rose-500 hover:bg-gray-500/10 bg-gray-500/5 outline outline-1 outline-gray-500/20 active:scale-95">
          <LuChevronLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="px-4 py-1.5 text-xl transition-all rounded text-rose-500 hover:bg-gray-500/10 bg-gray-500/5 outline outline-1 outline-gray-500/20 active:scale-95">
          <LuChevronRight />
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex mt-4 overflow-x-auto scroll-smooth scrollbar-hidden">
        {data.length > 0 ? (
          <>
            {data.map((item, index) => (
              <Link
                to={`/watch/${item.id}`}
                key={index}
                className="px-3 py-2 rounded-md max-w-44 group hover:bg-gray-500/10">
                <div className="w-36 aspect-[3/4] overflow-hidden rounded-md">
                  <img
                    src={item.poster}
                    alt={item.id}
                    className="object-cover w-full h-full transition-all duration-200 group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 font-semibold line-clamp-2">{item.name}</p>
              </Link>
            ))}
          </>
        ) : (
          <div className="px-4 py-2 rounded-md bg-gray-500/5 outline outline-1 outline-gray-500/20">
            No Data Available
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollXContainer;
